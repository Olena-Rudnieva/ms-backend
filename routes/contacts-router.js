import express from 'express';
import { isEmptyBody, isValidId } from '../middlewares/index.js';
import contactsController from '../controllers/contacts-controller.js';
import { validateBody } from '../decorators/index.js';
import { contactAddSchema } from '../models/Contact.js';

const contactAddValidate = validateBody(contactAddSchema);

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', isValidId, contactsController.getById);

contactsRouter.post(
  '/',
  isEmptyBody,
  contactAddValidate,
  contactsController.add
);

contactsRouter.put(
  '/:id',
  isValidId,
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

contactsRouter.delete('/:id', isValidId, contactsController.deleteByID);

export default contactsRouter;
