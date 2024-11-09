import { body} from 'express-validator';
export const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email '),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
]

export const registerValidation = [
  body('email').isEmail().withMessage('Please enter a valid email '),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
  body('fullName').isLength({min: 3}).withMessage('Full name must be at least 3 characters'),
  body('avatar').optional().isURL().withMessage('Please enter a valid avatar')
]
export const postCreateValidation = [
  body('title','Enter post title.').isLength({min:3}).isString(),
  body('text','Enter post text.').isLength({min:10}).isString(),
  body('tags','Invalid tag format.').optional().isArray(),
  body('imageUrl','The link to the image is incorrect.').optional().isString(),
]