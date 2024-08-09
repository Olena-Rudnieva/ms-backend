import Joi from 'joi';

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required "name" field`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `missing required "phone" field`,
  }),
  message: Joi.string(),
});

export default contactAddSchema;
