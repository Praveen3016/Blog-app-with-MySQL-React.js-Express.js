import { json } from "express"
import { db } from "../db.js";
import jwt from 'jsonwebtoken'

export const getPosts = async (req , res)=>{
  const token = req.cookies;
  console.log(token); 

    // console.log(req.query.cat)
    const q = req.query.cat
    ? "SELECT p.`id`,u.`username`, p.`uid` , p.`title`, p.`desc`, p.`img` , u.`img` AS userimg, p.`cat`, p.`date` FROM users u JOIN posts p ON u.id = p.uid WHERE cat=? "
    : "SELECT p.id, u.username, p.`uid` , p.title, p.desc, p.img, u.img AS userimg, p.cat, p.date FROM users u JOIN posts p ON u.id = p.uid ORDER BY p.date DESC;";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
}

export const getPost = (req , res)=>{
    console.log()
    const q = "SELECT p.`id`,u.`username`, p.`title`, p.`desc`, p.`img` , u.`img` AS userimg, p.`cat`, p.`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

    db.query(q , [req.params.id] , (err, data) =>{
        if(err) return res.json(err);

        return res.status(200).json(data[0])
    })
} 

export const addPost = (req , res)=>{
  const token = req.cookies.access_cookie;  
    if(!token) return res.status(401).json("user not authenticated")

    jwt.verify(token , process.env.JWT_SECRET , (err , userInfo)=>{
      if(err) return res.json(err);
    const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.date,
    userInfo.id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been created.");
      })
    });}
  //   const q =
  //   "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

  // const values = [
  //   req.body.title,
  //   req.body.desc,
  //   req.body.img,
  //   req.body.cat,
  //   req.body.date,
  //   userInfo.id,
  // ];

  // db.query(q, [values], (err, data) => {
  //   if (err) return res.status(500).json(err);
  //   return res.json("Post has been created.");
  // });


export const deletePost = (req , res)=>{

    // const token  = req.cookie.access_cookie
    // console.log(token)
    // if(!token) return res.status(401).json("user not authenticated")

    // jwt.varify(token , 'jwtkey' (err , userinfo)=>{
    //   if(err) return res.json(err);
    //   const q = "DELETE FROM posts WHERE id = ? AND uid = ?"

    //   db.query(q , [req.params.id] , (err , data) =>{
    //    if(err) return res.json(err)
   
    //    return res.status(200).json("deleted")
    //   })

    // } )
   const q = "DELETE FROM posts WHERE id = ?"

   db.query(q , [req.params.id] , (err , data) =>{
    if(err) return res.json(err)

    return res.status(200).json("deleted")
   })
}


// export const updatePost = (req , res)=>{
//   const token = req.cookies.access_cookie;  
//   console.log(token)
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const postId = req.params.id;
//     const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id` = ? AND `uid` = ?";
// let values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

// if (!req.body.img) {
//     q.replace('`img`=?,', ''); 
//     values = [req.body.title, req.body.desc, req.body.cat];

//     db.query(q, [...values, postId, userInfo.id], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.json("Post has been updated.");
//     });
//   };
//   })};

export const updatePost = (req, res) => {
  const token = req.cookies.access_cookie;  
    console.log(token)
    if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};

export const getProfile = async (req , res) =>{
 
  const q = "SELECT p.`id`,u.`username`, p.`title`, p.`desc`, p.`img` , u.`img` AS userimg, p.`cat`, p.`date` FROM users u JOIN posts p ON u.id = p.uid  where `uid`=? " ;

  db.query(q , [req.params.id] , (err , data) =>{
   if(err) return res.status(500).json(err);

   console.log(data)
   return res.json(data)
  })
  
}