import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import checkAuth from './utils/checkAuth.js'
import * as UserController from './Controllers/UserController.js'
import * as PostController from './Controllers/PostController.js'
import handelValidationsErrors from "./utils/handelValidationsErrors.js";

mongoose.connect('mongodb+srv://yushinbox:golfstrimmar1966@golfstrimmar.lfcsq.mongodb.net/blog').then(()=>{
  console.log('db connected')
}).catch((err)=>{console.log('db error',err)})
const app = express();
// ======================
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
  cb(null, file.originalname);
  }
});
const upload = multer({ storage });
app.use('/uploads',express.static('uploads'));
// ======================
app.use(express.json());
// ----------------------------------------
app.post('/auth/login',loginValidation,handelValidationsErrors ,UserController.login);
// ----------------------------------------
app.post('/auth/register',registerValidation,handelValidationsErrors, UserController.register);
// ----------------------------------------
app.get('/auth/me', checkAuth, UserController.getMe)
// ----------------------------------------
app.get('/posts',PostController.getAll);
app.get('/posts/:id',PostController.getOne);
app.post('/posts',checkAuth,postCreateValidation,handelValidationsErrors, PostController.create);
app.delete('/posts/:id',checkAuth,PostController.remove);
app.patch('/posts/:id',checkAuth,postCreateValidation,handelValidationsErrors,PostController.update);
// ----------------------------------------
app.post('/upload',checkAuth,upload.single('image'),(req,res)=>{
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
});
// ----------------------------------------

app.listen(3000, (err) => {
  if(err) {
    return console.log('something bad happened', err);
  }else {
    console.log('Server is running on port: 3000');
  }
});


