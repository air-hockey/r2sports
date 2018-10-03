import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export default function assetsMiddleware(req, res) {
  const readStream = fs
    .createReadStream(path.join(__dirname, 'assets', req.path))
    .on('error', err => res.status(err.code === 'ENOENT' ? 404 : 500).end())

  const width = req.query.width && parseInt(req.query.width)
  const height = req.query.height && parseInt(req.query.height)

  const transformer = sharp().resize(width, height)

  res.set('Content-Type', 'image/jpeg')

  readStream.pipe(transformer).pipe(res)
}
