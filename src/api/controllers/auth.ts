import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

import User from "../../models/collections/user";


export default class UserController {
 
    static async register (req: Request, res: Response, next: NextFunction){
     
      try {

        const userFromBody = req.body

        if (userFromBody && userFromBody.password.length < 8) {
          return res.status(400).json("Your password must be at least 8 characters.")
        }
        if (userFromBody && userFromBody.username.length < 3) {
          return res.status(400).json("You must specify a name of at least 3 characters.")
        }

        bcrypt.hash(req.body.password, 12, async (err, hashedPassword) => {

          const user = new User();

          user.username = req.body.username;

          user.password = hashedPassword;

          await user.save() 

          return res.status(201).json(`id: ${user._id}, username: ${user.username} `) })
                          
        } catch (e) {

          console.log(`api, ${e}`);
          
          res.status(500).json("faild");
    } 
    
  }

    static async login (req: Request, res: Response, next: NextFunction){

      try {

        const username = req.body.username;
        
        const password = req.body.password;
            
        if (!username || typeof username !== "string") {
          res.status(400).json({ error: "Bad email format, expected string." })
          return
        }
        if (!password || typeof password !== "string") {
          res.status(400).json({ error: "Bad password format, expected string." })
          return
        }

        let userData = await User.findOne({ username: username })
        .select({ _id: 0 });

        if (!userData) {
          res.status(401).json({ error: "Make sure your username is correct." })
          return
        }
        
        bcrypt
        
        .compare(password, userData.password)
        
        .then((isEqual) => {
        
          if (!isEqual) {        
            return res.status(422).json({ message: "wrong password", password });        
          }
                
          const token = jwt.sign( 
            { username: userData?.username },
            "nailedit",
            { expiresIn: "1h" }
            );
        
            Object.assign(userData, { jwtToken: token });
        
            return res.status(200).json({
              success: true,
              token: `JWT ${token}`,
              username: username,
             });
        
          })        
          .catch((err) => { return res.status(500).json({ message: "Failed", error: err.message }) }        
          )
      
        }
       catch (e) {
        
        console.log(`api, ${e}`);
              
        res.status(500).json("faild");
      }
    }
 }
      
