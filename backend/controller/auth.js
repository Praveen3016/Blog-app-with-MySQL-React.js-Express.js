import { db } from "../db.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    try {
        // Check existing user
        const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
        db.query(checkQuery, [req.body.email, req.body.username], (err, data) => {
            if (err) return res.json(err)
            console.log(data)



            if (data.length) return res.json("User already exist");
            else {
                // Add user to database
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(req.body.password, salt);

                const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
                db.query(insertQuery, [req.body.username, req.body.email, hashedPassword], (err, data) => {
                    if (err) return res.json(err)
                    // console.log(data.insertId)
                    const q = "INSERT INTO profiles (username, uid) VALUES (?, ?) ";

                    db.query(q, [req.body.username, data.insertId], (err, data) => {
                        if (err) console.log(err)
                        console.log(data)

                    })
                    return res.status(201).json(data.insertId)
                });

            }

        });


    } catch (error) {
        console.error(error);
        return res.status(500).json("Database Error");
    }
}

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? ";
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err)
        console.log(data)
        if (data.length == 0) return res.status(400).json("user not found");

        const comparedpassword = bcrypt.compareSync(req.body.password, data[0].password);

        if (!comparedpassword) return res.status(400).json("incorrect password")

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        const { password, ...other } = data[0];
        res.cookie('access_cookie', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 2589200000),
        }).status(200).json(other);


        // res.cookie("access_cookie" , token ,{
        //     httpOnly: true ,
        //     secure: true 
        // })
    })
}

export const getUser = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? ";
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err)
        // console.log(data)


        return res.status(200).json(data);


    })
}


export const logout = (req, res) => {

    res.clearCookie("access_cookie", {
        sameSite: "none",
        secure: true
    }).status(200).json("user logeout")
}

export const updateUser = (req, res) => {
    console.log(req.body.username)

    const q = "UPDATE users SET img = ?, username = ? WHERE id = ?";

    db.query(q, [req.body.userimg, req.body.username, req.params.id], (err, data) => {
        if (err) return res.json(err);
        console.log(data)
        return res.status(200).json(data)
    })
} 
