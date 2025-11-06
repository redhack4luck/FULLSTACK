const express = require('express')
const fs = require('fs').promises
const path = require('path')
const router = express.Router()
const dataPath = path.join(__dirname, '..', 'data', 'resources.json')

// knkhdmo validation simple dial resource
async function validateResource(req, res, next) {
  const { title, description } = req.body
  if (!title || !description) {
    return res.status(400).json({ status: 'fail', message: 'title and description required' })
  }
  next()
}

// helper to read/write file
async function readData() {
  const raw = await fs.readFile(dataPath, 'utf-8')
  return JSON.parse(raw)
}
async function writeData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2))
}

// GET all
router.get('/', async (req, res, next) => {
  try {
    const data = await readData()
    res.json(data)
  } catch (err) { next(err) }
})

// GET by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const data = await readData()
    const item = data.find(i => i.id === id)
    if (!item) return res.status(404).json({ status: 'fail', message: 'Not found' })
    res.json(item)
  } catch (err) { next(err) }
})

// POST create
router.post('/', validateResource, async (req, res, next) => {
  try {
    const data = await readData()
    const id = data.length ? Math.max(...data.map(i => i.id)) + 1 : 1
    const newItem = { id, ...req.body }
    data.push(newItem)
    await writeData(data)
    res.status(201).json(newItem)
  } catch (err) { next(err) }
})

// PUT update
router.put('/:id', validateResource, async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const data = await readData()
    const idx = data.findIndex(i => i.id === id)
    if (idx === -1) return res.status(404).json({ status: 'fail', message: 'Not found' })
    data[idx] = { id, ...req.body }
    await writeData(data)
    res.json(data[idx])
  } catch (err) { next(err) }
})

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    let data = await readData()
    const initialLen = data.length
    data = data.filter(i => i.id !== id)
    if (data.length === initialLen) return res.status(404).json({ status: 'fail', message: 'Not found' })
    await writeData(data)
    res.status(204).send()
  } catch (err) { next(err) }
})

module.exports = router
