const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: [true, 'Please provide file name'],
  },
  password: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: [true, 'Please add original file name'],
  },
  path: {
    type: String,
    required: [true, 'Please provide path name'],
  },
  downloadLink: {
    type: String,
    required: [true, 'Please provide download link'],
  },
  extension: {
    type: String,
    required: [true, 'Please provide file extension'],
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
})

const File = mongoose.model('File', FileSchema)
module.exports = File
