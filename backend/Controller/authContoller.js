import bcrypt from 'bcrypt';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as mail from '../utils/mailer.js';
dotenv.config();

const STATIC_ADMIN_EMAIL = 'admin123@gmail.com';
const STATIC_ADMIN_PASSWORD = '12345';

//user register
const registerUser = async (req, res) =>{
    //Request user data and check missing field
    try{
        const {name, email, password, role} = req.body;
        if (!name || !email || !password){
            return res.status(500).json({message: "Please, Fill all the credentials!"})
        }

        const normalizedRole = String(role || 'user').toLowerCase() === 'admin' ? 'admin' : 'user';

        //check for the user in DB
        db.query("SELECT * FROM users WHERE email = ?", [email], async(err, result) =>{
            if(err){
                return res.status(500).json({message: "Failed to locate existing user", error: err})
            } 

            if (result.length > 0){
                return res.status(400).json({message:"Email already exists!"});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, normalizedRole], 
                async(err, result) => {
                    if(err){
                        return res.status(500).json({message: "Registration Failed!", error: err})
                    } else{
                        // Send welcome email
                        const emailResult = await mail.SendEmail(
                            email,
                            "Welcome to Quickkart!",
                            `Hello ${name},\n\nThank you for registering at Quickkart! We're excited to have you.\n\nHappy shopping!\n\nBest,\nQuickkart Team`
                        );
                        
                        if(emailResult.success){
                            console.log('✓ Welcome email sent to:', email);
                        } else {
                            console.warn('⚠️ Email failed for user:', email);
                        }
                        
                        return res.status(201).json({success: true, message: "User registered successfully", emailSent: emailResult.success})
                    }
                })

            })
            
    } catch(err){
        return res.status(500).json({message: "Database Error", error: err})
    }
}

//user login
const loginUser = async(req, res) =>{
    //check user data and missing fields
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Please, Fill both credentials!"})
        }

        // Static admin credentials for direct admin dashboard access
        if (email === STATIC_ADMIN_EMAIL && password === STATIC_ADMIN_PASSWORD) {
            const token = jwt.sign(
                {id: 0, email: STATIC_ADMIN_EMAIL, role: 'admin'},
                process.env.JWT_SECRET,
                {expiresIn : '24h'}
            );

            return res.json({
                success: true,
                message: "Login Successfull",
                token: token,
                user: {
                    id: 0,
                    name: 'Admin',
                    email: STATIC_ADMIN_EMAIL,
                    role: 'admin'
                }
            });
        }

        //check for the user in the database
        db.query("SELECT * FROM users WHERE email = ?", [email], async(err, result) => {
            if(err){
                return res.status(500).json({message: "Failed to match the user email", error: err})
            }
            if(result.length === 0){
                return res.status(500).json({message: "User not found", error: err});
            }

            const user = result[0]
            const validPassword = await bcrypt.compare(password, user.password)

            if(!validPassword){
                return res.status(401).json({message: "Invalid Password"});
            }

            //create jwt token upon correct password
            const token = jwt.sign(
                {id: user.id, email: user.email},
                process.env.JWT_SECRET,
                {expiresIn : '24h'}
            );

            return res.json({
                success: true,
                message: "Login Successfull",
                token: token,
                user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || 'user'
            }
            })
        })
    } catch(err){
        return res.status(500).json({message: "Database Error", error: err})
    }
};


export { registerUser, loginUser };