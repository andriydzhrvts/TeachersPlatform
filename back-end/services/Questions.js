/* eslint-disable no-unused-vars */
const Question = require('../models/Question');

const getQuestions = async () => await Question.find({});

const getLevels = async () => await Question.distinct('level');

const getUnitsByLevel = async (level) => await Question.find(level).distinct('unit');

const createQuestion = async (question) => await Question.create(question);

const findQuestionById = async (id) => await Question.findById(id);

const editQuestion = async (id, body) =>
  await Question.findByIdAndUpdate(id, body, { new: true, runValidators: true });

const removeQuestion = async (id) => await Question.findByIdAndDelete(id);

module.exports = {
  getQuestions,
  getLevels,
  getUnitsByLevel,
  createQuestion,
  findQuestionById,
  editQuestion,
  removeQuestion,
};
