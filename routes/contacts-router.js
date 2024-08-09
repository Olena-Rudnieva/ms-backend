import express from 'express';
import { isEmptyBody } from '../middlewares/index.js';
import contactsController from '../controllers/contacts-controller.js';
import { validateBody } from '../decorators/index.js';
import contactAddSchema from '../schemas/contact-schemas.js';

const contactAddValidate = validateBody(contactAddSchema);

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', contactsController.getById);

contactsRouter.post(
  '/',
  isEmptyBody,
  contactAddValidate,
  contactsController.add
);

contactsRouter.put(
  '/:id',
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

contactsRouter.delete('/:id', contactsController.deleteByID);

export default contactsRouter;
