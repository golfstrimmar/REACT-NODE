import express from 'express';
import jwt from 'jsonwebtoken';
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('1333Hello World!');
});
app.post('/auth/login', (req, res) => {
  console.log(req.body);
  const  token=jwt.sign({
    id:1,
    username:'admin',
    password:'<PASSWORD>',
    email:req.body.email,
    fullName:'Jons'
  }, "secret123")
  res.json({
  success: true,
    token
  })
})
app.listen(3000, (err) => {
  if(err) {
    return console.log('something bad happened', err);
  }else {
    console.log('Server is running on port 3000');
  }
});