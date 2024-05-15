import express from 'express'
import { getPosts, addPost, getPost, deletePost, updatePost , getProfile } from '../controller/posts.js';

const router = express.Router();

router.get("/" ,getPosts);
router.get("/:id" , getPost)
router.post("/" , addPost)
router.delete("/:id" , deletePost)
router.put("/:id" , updatePost)
router.get("/profile/:id" ,getProfile)

 

export default router