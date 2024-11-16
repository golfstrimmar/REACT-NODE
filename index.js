import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import checkAuth from './utils/checkAuth.js'
import * as UserController from './Controllers/UserController.js'
import * as PostController from './Controllers/PostController.js'
import handelValidationsErrors from "./utils/handelValidationsErrors.js";

mongoose.connect('mongodb+srv://yushinbox:golfstrimmar1966@golfstrimmar.lfcsq.mongodb.net/blog').then(() => {
  console.log('db connected')
}).catch((err) => {
  console.log('db error', err)
})
const app = express();
// ======================
// Настройка CORS (для разрешения запросов с фронтенда на localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',  // Фронтенд на порту 3000
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],  // Разрешаем нужные методы
  allowedHeaders: ['Content-Type', 'Authorization'],  // Разрешаем нужные заголовки
}));
// ======================
// ======================
app.use(express.json());
// ----------------------------------------
app.post('/auth/login', loginValidation, handelValidationsErrors, UserController.login);
// ----------------------------------------
app.post('/auth/register', registerValidation, handelValidationsErrors, UserController.register);
// ----------------------------------------
app.get('/auth/me', checkAuth, UserController.getMe)
// ----------------------------------------
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handelValidationsErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handelValidationsErrors, PostController.update);
// ----------------------------------------
app.listen(5000, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  } else {
    console.log('Server is running on port: 5000');
  }
});
// backend finish 9.11


