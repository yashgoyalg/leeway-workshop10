const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretkey= "secretkey"

app.get("/", (req,resp)=>{
    resp.json({
        message: "A Simple API"
    })
})


app.post("/login", (req,resp)=>{
    const user={
        username: "yash",
        passward: 'XYG123'
    }
    jwt.sign({user},secretkey, {expiresIn: '300s'},(err,token)=>{
        resp.json({
            token
        })
    })
})

app.post('profile',verifyToken,(req,resp)=>{
    jwt.verify(req.token,secretkey,(err,authData)=> {
        if(err){
            resp.send({result: "invaild token"})
        }else{
            resp.json({
                message:"profile accessed",
                authData
            })
        }
    })
})

function verifyToken(req,resp,next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token= bearer[1];
        req.token=token;
        next();
    }else{
        resp.send({
            result: 'Token is not valid'
        })
    }
}

app.listen(5000,()=>{
    console.log('app is running in 5000 port');
})