import { body} from 'express-validator';
export const registerValidation = [
  body('email').isEmail().withMessage('Please enter a valid email '),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
  body('fullName').isLength({min: 3}).withMessage('Full name must be at least 3 characters'),
  body('avatar').optional().isURL().withMessage('Please enter a valid avatar')
]