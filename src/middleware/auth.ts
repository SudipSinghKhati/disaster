import jwt from 'jsonwebtoken'


const verifyUser = (req:any,res:any,next:any) =>{
    let token = req.headers.authorization
    if(!token) return res.status(401).json({error: ' auth token not present'})
    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET,
        (err:any,payload:any) => {
            if(err) return res.status(401).json({error:err.message})
            req.user = payload
            console.log(`Payload role : ${req.user.role}`)
            
            
        })
        next()
}

const verifyAdmin = (req:any,res:any,next:any) => {
    if(req.user.role !== 'admin') {
        return res.status(403).json({error: ' You are not admin'})

    }else if(req.user.role === 'admin'){
        next()
    }
}


export = {verifyUser, verifyAdmin,}