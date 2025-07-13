const express = require("express")
const fs = require("fs")
const multer = require("multer")

const File = require("../models/File")
const sendEmailMailjet = require("../utils/sendEmailMailjet")

const router = express.Router()
const upload = multer()

router.get("/download/:id", async (req, res) => {
  const downloadLink = `${req.protocol}://${req.get("host")}/download/${req.params.id}`
  const file = await File.findOne({ downloadLink })

  const password = req.headers["password"]
  if (!file || !file.path || file.password !== password) {
    return res.status(403).json({ msg: "Access denied" })
  }

  if (file.expiresAt && new Date() > file.expiresAt) {
    fs.unlink(file.path, () => {})
    file.deleted = true
    file.deletedAt = new Date()
    await file.save()
    return res.status(410).json({ msg: "File has expired and is no longer available." })
  }

  const filename = file.originalName || "downloaded_file"
  res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`)

  res.download(file.path, filename, async (err) => {
    if (!err) {
      fs.unlink(file.path, () => {})
      file.deleted = true
      file.deletedAt = new Date()
      await file.save()
    }
  })
})

router.post("/send", express.json(), async (req, res) => {
  const { receiverEmail, fileID, senderName } = req.query
  try {
    await sendEmailMailjet(receiverEmail, fileID, senderName)
    res.status(200).json({ msg: "Email sent successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/ping", (req, res) => {
  res.status(200).send("✅ Backend is alive")
})

router.get("/my-files", async (req, res) => {
  const userId = req.headers["user-id"]
  if (!userId) return res.status(401).json({ msg: "Unauthorized" })

  try {
    const files = await File.find({ userId }).sort({ createdAt: -1 })
    res.status(200).json({ files })
  } catch (err) {
    res.status(500).json({ msg: "Failed to retrieve files" })
  }
})

setInterval(async () => {
  try {
    const now = new Date()
    const expiredFiles = await File.find({
      expiresAt: { $lte: now },
      deleted: { $ne: true },
    })

    for (const file of expiredFiles) {
      fs.unlink(file.path, () => {})
      file.deleted = true
      file.deletedAt = now
      await file.save()
    }
  } catch (err) {
    console.error("❌ Cleanup error:", err.message)
  }
}, 60 * 1000)

module.exports = router
