import express from  'express'
import postRouter from './route/posts.js'
import authRouter from './route/auth.js'
import usersRouter from './route/users.js'
import personalProfileRouter from './route/personalProfile.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv';

dotenv.config();

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials : true
}));
app.use(cookieParser());
app.use(express.json());

app.get('/test', (req, res) => {
  res.cookie("praveen" , "suthar");
  res.json("cooo")
}); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/your blog/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage }) 

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file
  res.status(200).json(file.filename)
  })

app.use('/api/posts' , postRouter)
app.use('/api/auth' , authRouter)
app.use('/api/users' , usersRouter)
app.use('/api/pesonalprofile' , personalProfileRouter)




app.listen(8888 , ()=>{
    console.log("connected ")
})

