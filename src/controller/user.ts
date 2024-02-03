import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const SignIn = (req:any, res:any, next:any) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, (error, success) => {
                if (error) return res.status(500).json({ error: error.message })
                if (!success) return res.status(400).json({ error: 'Password doesnot match' })
                const payload = {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,



                    role: user.role
                }
                jwt.sign(
                    payload, process.env.SECRET,
                    { expiresIn: '1D' },
                    (error, token) => {
                        if (error) return res.status(500).json({ error: error.message })
                        res.json({ status: 'success', token: token, user: user })
                    }
                )
            })
        }).catch(next)
}

const SignUp = (req:any, res:any, next:any) => {
    const { fullName, email, password } = req.body
    User.findOne({ email: email })
        .then((user) => {
            if (user) return res.status(400).json({ error: 'Duplicate Email' })
            bcrypt.hash(password, 10, (error, hash) => {
                if (error) return res.status(500).json({ error: error.message })
                User.create({ email, password: hash, fullName })
                    .then((user) => {
                        res.status(201).json(user)
                    }).catch(next)

            })
        }).catch(next)
}




export = {
    SignIn,
    SignUp,

}