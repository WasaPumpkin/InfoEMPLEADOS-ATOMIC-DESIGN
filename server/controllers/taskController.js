// controllers/taskController.js
// controllers/taskController.js
import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';

// @desc    Admin creates a task and assigns it to an employee
// @route   POST /api/tasks
// @access  Private/Admin
export const createTask = asyncHandler(async (req, res) => {
  const { text, assignedTo } = req.body;
  if (!text || !assignedTo) {
    res.status(400);
    throw new Error(
      'Please provide a valid task text and an employee to assign it to.'
    );
  }
  const task = await Task.create({
    text: text.trim(),
    createdBy: req.user.id, // Admin's ID
    assignedTo, // Employee's ID
  });
  res.status(201).json(task);
});

// @desc    Admin deletes a task (only tasks created by admin)
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  if (task.createdBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to delete this task');
  }
  await task.deleteOne();

  res.json({ message: 'Task removed' });
});

// @desc    Employee marks a task as complete and adds a completion message
// @route   PUT /api/tasks/:id/complete
// @access  Private
export const completeTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Only allow the assigned employee to mark the task as complete
  if (task.assignedTo.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to complete this task');
  }

  task.status = 'completed';
  task.completedAt = Date.now();
  task.completionMessage = req.body.completionMessage; // Save the message from the request

  const updatedTask = await task.save();
  res.json(updatedTask);
});
// @desc    Get tasks for the logged in user
//          For admin: tasks they created
//          For employee: tasks assigned to them
// @route   GET /api/tasks
// @access  Private
export const getTasks = asyncHandler(async (req, res) => {
  let tasks;
  if (req.user.role === 'admin') {
    tasks = await Task.find({ createdBy: req.user.id });
  } else {
    tasks = await Task.find({ assignedTo: req.user.id });
  }
  res.json(tasks);
});




// import asyncHandler from 'express-async-handler';
// import mongoose from 'mongoose';
// import Task from '../models/taskModel.js';
// import logger from '../utils/logger.js';

// // @desc    Admin creates a task and assigns it to an employee
// // @route   POST /api/tasks
// // @access  Private/Admin
// export const createTask = asyncHandler(async (req, res) => {
//   const { text, assignedTo } = req.body;

//   if (!text || !assignedTo) {
//     res.status(400);
//     throw new Error(
//       'Please provide a valid task text and an employee to assign it to.'
//     );
//   }

//   if (typeof text !== 'string' || text.trim().length === 0) {
//     res.status(400);
//     throw new Error('Task text must be a non-empty string.');
//   }

//   if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
//     res.status(400);
//     throw new Error('Invalid employee ID.');
//   }

//   const task = await Task.create({
//     text: text.trim(),
//     createdBy: req.user.id,
//     assignedTo,
//   });

//   logger.info(`Task ${task._id} created by user ${req.user.id}`);
//   res.status(201).json(task);
// });

// // @desc    Admin deletes a task (only tasks created by admin)
// // @route   DELETE /api/tasks/:id
// // @access  Private/Admin
// export const deleteTask = asyncHandler(async (req, res) => {
//   const task = await Task.findById(req.params.id);
//   if (!task) {
//     res.status(404);
//     throw new Error('Task not found');
//   }

//   if (task.createdBy.toString() !== req.user.id) {
//     res.status(403);
//     throw new Error('Not authorized to delete this task');
//   }

//   await task.deleteOne();
//   logger.info(`Task ${task._id} deleted by user ${req.user.id}`);

//   res.json({ message: 'Task removed' });
// });

// // @desc    Employee marks a task as complete and adds a completion message
// // @route   PUT /api/tasks/:id/complete
// // @access  Private
// export const completeTask = asyncHandler(async (req, res) => {
//   const task = await Task.findById(req.params.id);
//   if (!task) {
//     res.status(404);
//     throw new Error('Task not found');
//   }

//   if (task.assignedTo.toString() !== req.user.id) {
//     res.status(403);
//     throw new Error('Not authorized to complete this task');
//   }

//   task.status = 'completed';
//   task.completedAt = Date.now();
//   task.completionMessage = req.body.completionMessage;

//   const updatedTask = await task.save();
//   logger.info(`Task ${task._id} marked as completed by user ${req.user.id}`);

//   res.json(updatedTask);
// });

// // @desc    Get tasks for the logged in user
// // @route   GET /api/tasks
// // @access  Private
// export const getTasks = asyncHandler(async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   let tasks;
//   if (req.user.role === 'admin') {
//     tasks = await Task.find({ createdBy: req.user.id }).skip(skip).limit(limit);
//   } else {
//     tasks = await Task.find({ assignedTo: req.user.id })
//       .skip(skip)
//       .limit(limit);
//   }

//   res.json({
//     page,
//     limit,
//     total: tasks.length,
//     tasks,
//   });
// });