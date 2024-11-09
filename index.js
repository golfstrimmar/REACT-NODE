import express from 'express';
import mongoose from 'mongoose';
import {registerValidation}  from "./validations/auth.js";
import checkAuth from './utils/checkAuth.js'
import * as UserController from './Controllers/UserController.js'

mongoose.connect('mongodb+srv://yushinbox:golfstrimmar1966@golfstrimmar.lfcsq.mongodb.net/blog').then(()=>{
  console.log('db connected')
}).catch((err)=>{console.log('db error',err)})
const app = express();
// ======================
app.use(express.json());
// ----------------------------------------
app.post('/auth/login', UserController.login);
// ----------------------------------------
app.post('/auth/register',registerValidation, UserController.register);
// ----------------------------------------
app.get('/auth/me', checkAuth, UserController.getMe)
// ----------------------------------------
app.listen(3000, (err) => {
  if(err) {
    return console.log('something bad happened', err);
  }else {
    console.log('Server is running on port: 3000');
  }
});


