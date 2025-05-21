import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'
import path from 'path'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, uniqueName)
  },
})

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only JPEG, PNG and JPG files are allowed'))
  }
}

const upload = multer({ storage, fileFilter })

export default upload
