const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const crypto = require('crypto')
const { JsonRpcProvider, Wallet, Contract, ethers } = require('ethers')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()
const port = 8080

const upload = multer({ storage: multer.memoryStorage() })

const provider = new JsonRpcProvider('http://127.0.0.1:8545')
const wallet = new Wallet(process.env.PRIVATE_KEY, provider)

const abiPath = path.join(__dirname, '../artifacts/contracts/FileLedger.sol/FileLedger.json')
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

app.post('/uploadFile', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ error: 'File is required' })

    const fileBuffer = file.buffer
    const fileName = file.originalname
    const fileSize = file.size
    const fileHash = sha256(fileBuffer)
    const signature = await wallet.signMessage(ethers.getBytes(fileHash))
    const previousHash = await getPreviousHash(wallet.address)

    console.log('📤 Uploading:', {
      fileName,
      fileHash,
      fileSize,
      previousHash
    })

    const tx = await contract.uploadFile(fileHash, signature, previousHash, fileName, fileSize)
    await tx.wait()

    res.json({
      success: true,
      txHash: tx.hash,
      fileHash,
      signature,
      fileName,
      fileSize,
      previousHash
    })
  } catch (err) {
    console.error('Upload Error:', err)
    res.status(500).json({ error: err.message })
  }
})

app.post('/verifyFile', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ error: 'File is required' })

    const fileBuffer = file.buffer
    const fileHash = sha256(fileBuffer)

    console.log('🔍 Verifying file:', file.originalname)
    console.log('Computed hash:', fileHash)

    const isValid = await contract.isFileRegistered(fileHash)
    console.log(isValid ? '✅ Exists on chain' : '❌ Not found on chain')

    res.json({
      fileHash,
      status: isValid ? '✅ Verified (authentic)' : '❌ Tampered or Not Found',
      valid: isValid
    })
  } catch (err) {
    console.error('Verification Error:', err)
    res.status(500).json({ error: err.message })
  }
})


app.get('/getAllFiles', async (req, res) => {
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
    console.error('GetAllFiles Error:', err)
    res.status(500).json({ error: err.message })
  }
})
app.post('/checkExistence', upload.single('file'), async (req, res) => {
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

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`)
})
