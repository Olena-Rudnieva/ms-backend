import { Schema, model } from 'mongoose';
import { handleSaveError, runValidatorsAtUpdate } from './hooks/index.js';
import Joi from 'joi';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required "name" field`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `missing required "phone" field`,
  }),
  message: Joi.string(),
});

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

contactSchema.post('findOneAndUpdate', handleSaveError);

const Contact = model('contact', contactSchema);

export default Contact;
