import { Router } from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { JsonRpcProvider, Wallet, Contract, ethers } from "ethers"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env') })

const upload = multer({ storage: multer.memoryStorage() })
const router = Router()

const provider = new JsonRpcProvider("http://127.0.0.1:8545")
const wallet = new Wallet(process.env.PRIVATE_KEY, provider)
const abiPath = path.join(__dirname, '../../artifacts/contracts/FileLedger.sol/FileLedger.json')
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

    const fileBuffer = file.buffer
    const fileName = file.originalname
    const fileSize = file.size
    const fileHash = sha256(fileBuffer)

    const isAlreadyUploaded = await contract.isFileRegistered(fileHash)
    if (isAlreadyUploaded) {
      return res.status(409).json({
        message: "File already exists on the blockchain",
        fileHash
      })
    }

    const signature = await wallet.signMessage(ethers.getBytes(fileHash))
    const previousHash = await getPreviousHash(wallet.address)

    const tx = await contract.uploadFile(fileHash, signature, previousHash, fileName, fileSize)
    await tx.wait()

    res.json({
      message: "File upload success",
      success: true,
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

export default router
