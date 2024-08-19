import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import Contact from '../models/Contact.js';
import fetch from 'node-fetch';
import 'dotenv/config';

const { TOKEN, CHATID } = process.env;

console.log('env', process.env);

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(result);
};

const sendTelegramMessage = async (message) => {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHATID,
      text: message,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message to Telegram');
  }
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
  const message = `
    Нова заявка на консультацію:
    Ім'я: ${result.name}
    Телефон: ${result.phone}
    Повідомлення: ${result.message}
  `;
  try {
    await sendTelegramMessage(message);
  } catch (error) {
    console.error('Failed to send message to Telegram:', error);
    console.error('Failed to send message to Telegram:', error.message);
    console.error('Response status:', error.response?.status);
    console.error('Response body:', await error.response?.text());
  }
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(result);
};

const deleteByID = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json({
    message: 'Delete success',
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteByID: ctrlWrapper(deleteByID),
};
