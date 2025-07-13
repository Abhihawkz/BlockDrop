const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { JsonRpcProvider, Wallet, Contract, ethers } = require('ethers')
const dotenv = require('dotenv')
const path = require("path")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
const sha256 = require("crypto-js/sha256")
const ethers = require("ethers")


const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router()

const __dirname = path.resolve()
dotenv.config({ path: path.join(__dirname, '.env') })

const provider = new JsonRpcProvider("http://127.0.0.1:8545")
const wallet = new Wallet(process.env.PRIVATE_KEY, provider)
const abiPath = path.join(__dirname, 'artifacts/contracts/FileLedger.sol/FileLedger.json')
const abiJson = JSON.parse(fs.readFileSync(abiPath))
const abi = abiJson.abi
const contract = new Contract(process.env.CONTRACT_ADDRESS, abi, wallet)

function sha256(buffer) {
  return '0x' + crypto.createHash('sha256').update(buffer).digest('hex')
}

async function getPreviousHash(address) {
  const filter = contract.filters.FileUploaded(address)
  const events = await contract.queryFilter(filter)
  return events.length > 0 ? events[events.length - 1].args.fileHash : ethers.ZeroHash
}

router.post('/uploadFile', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ error: 'File is required' })

    const { originalName, receiverEmail, password, expiryMinutes } = req.body
    const userId = req.headers["user-id"]

    const fileBuffer = file.buffer
    const fileName = file.originalname
    const fileSize = file.size
    const fileHash = sha256(fileBuffer).toString()

    const isAlreadyUploaded = await contract.isFileRegistered(fileHash)
    if (isAlreadyUploaded) {
      return res.status(409).json({
        message: "File already exists on the blockchain",
        fileHash
      })
    }

    const uniqueFileName = Date.now() + "_" + fileName
    const uploadDir = path.join(__dirname, "/uploads")
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

    const uploadPath = path.join(uploadDir, uniqueFileName)
    fs.writeFileSync(uploadPath, fileBuffer)

    const signature = await wallet.signMessage(ethers.getBytes(fileHash))
    const previousHash = await getPreviousHash(wallet.address)

    const tx = await contract.uploadFile(fileHash, signature, previousHash, fileName, fileSize)
    await tx.wait()

    const extension = path.extname(originalName)
    const fileId = uuidv4()
    const downloadLink = `${req.protocol}://${req.get("host")}/download/${fileId}`
    const expiresAt = expiryMinutes
      ? new Date(Date.now() + parseInt(expiryMinutes) * 60000)
      : null

    const newFile = new File({
      fileName: uniqueFileName,
      originalName,
      path: uploadPath,
      downloadLink,
      extension,
      password,
      userId,
      expiresAt
    })

    await newFile.save()

    if (receiverEmail) {
      await sendEmailMailjet(receiverEmail, fileId)
    }

    res.status(200).json({
      message: "File uploaded successfully",
      link: downloadLink,
      txHash: tx.hash,
      fileHash,
      signature,
      fileName,
      fileSize,
      previousHash
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
router.post('/verifyFile', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ error: 'File is required' })

    const fileBuffer = file.buffer
    const rawHash = sha256(fileBuffer).toLowerCase()
    const fileHash = rawHash.startsWith('0x') ? rawHash : `0x${rawHash}`

    const isRegistered = await contract.isFileRegistered(fileHash)

    res.json({
      fileHash,
      status: isRegistered ? '✅ Verified (authentic)' : '❌ Tampered file or not found',
      valid: isRegistered
    })
  } catch (err) {
    console.error('Verification Error:', err)
    res.status(500).json({ error: err.message })
  }
})

router.get('/getAllFiles', async (req, res) => {
  try {
    const filter = contract.filters.FileUploaded()
    const events = await contract.queryFilter(filter)
    const files = events.map(e => ({
      uploader: e.args.user,
      fileHash: e.args.fileHash,
      fileName: e.args.fileName,
      fileSize: Number(e.args.fileSize),
      timestamp: Number(e.args.timestamp)
    }))
    res.json(files)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/checkExistence', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ error: 'File is required' })

    const fileHash = sha256(file.buffer)
    const exists = await contract.isFileRegistered(fileHash)
    res.json({ exists, fileHash })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
