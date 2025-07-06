const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  smartAssign
} = require('../controllers/taskController');

router.get('/', auth, getTasks);
router.post('/', auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);
router.post('/:id/smart-assign', auth, smartAssign);

module.exports = router;
