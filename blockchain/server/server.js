const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const nosqlSanitizer = require('express-mongo-sanitize')
const fileUpload = require('express-fileupload')
const xss = require('xss-clean')
const blockchainRoutes = require('./routes/blockchain')
const fileRoutes = require('./routes/fileroutes')

const __dirname = path.resolve()

dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(xss())
app.set("trust proxy", true)
app.use(nosqlSanitizer())
app.use(limiter)
app.use(cors())
app.use(fileUpload())
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log("🚀 Server running on port", port))
  } catch (error) {
    console.error("❌ Startup error:", error.message)
  }
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
  handler: (req, res) => {
    console.warn(`🚫 Too many requests from ${req.ip}`);
    res.status(429).json({ msg: "Too many requests — slow down." });
  },
})
app.use("/",fileRoutes);
app.use('/blockchain', blockchainRoutes)

app.listen(port, () => {
  start()
  console.log(`✅ Server running at http://localhost:${port}`)
})
