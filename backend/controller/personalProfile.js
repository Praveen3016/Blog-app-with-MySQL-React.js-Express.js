import { db } from "../db.js";

export const getPersonalProfile = (req , res)=>{

    const q = "SELECT * FROM profiles WHERE uid = ? ";

    db.query(q , [req.params.id] , (err, data) =>{
        if(err) return res.json(err);

        return res.status(200).json(data)
    })
} 

export const updatePersonalProfile = (req , res)=>{
    console.log(req.body.username)

    const q = "UPDATE profiles SET userimg = ?, username = ?, bio = ?, links = ? WHERE uid = ?";

    db.query(q ,  [req.body.userimg , req.body.username , req.body.username.bio , req.body.links,req.params.id] , (err, data) =>{   
        if(err) return res.json(err);
console.log(data)
        return res.status(200).json(data)
    })
} 

export const setPersonalProfile = (req , res)=>{

    const q = "INSERT INTO profiles (username, uid) VALUES (?, ?) ";

    db.query(q ,  [req.body.username , req.body.uid] , (err, data) =>{   
        if(err) return res.json(err);
console.log(data)
        return res.status(200).json(data)
    })
} 

