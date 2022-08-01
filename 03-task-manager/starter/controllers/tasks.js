const Task = require('../models/Tasks')

const getAllTasks = (req, res) => {
  res.json(req.body)
}

const getTask = (req, res) => {
  res.json({ id: req.params.id })
}

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    // console.error(error)
    res.status(500).json({ msg: error.errors.name.message })
  }
}

const updateTask = (req, res) => {
  res.json('Update a item')
}

const deleteTask = (req, res) => {
  res.json('Delete a item')
}

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask }
