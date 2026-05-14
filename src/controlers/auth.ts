import { Request, Response } from 'express';
import jwt from "jsonwebtoken";


export const logIn = (req: Request, res: Response)=>{

    const expireTime = 2 //in hours

    const expiresIn: `${number}h` = `${expireTime}h`;

try{
     const jwtKey = process.env.JWT_KEY;
    const pass=process.env.APP_PASS;
    const un=process.env.APP_USERNAME;


    const { username, password } = req.body;

    if(un===username && pass==password){
        const token = jwt.sign({ user: username }, jwtKey as string, { expiresIn: expiresIn })
        res.cookie('auth', token, {
            httpOnly: true,  
            secure: true,     
            sameSite: 'none',
            maxAge: expireTime * 60*60*1000  
        })
     res.sendStatus(201);
    }else{
        res.sendStatus(401);
    }

}catch(error){
    console.error(error);
    res.sendStatus(500);
}
   
    
}

const accessDenied = (res:Response)=>{
     res.clearCookie('auth');
     res.sendStatus(401)
}

export const verifyAccess = (req: Request, res: Response, callback: (req: Request, res: Response)=>void) => {
    const token = req.cookies.auth;
    if(!token){
        accessDenied(res);
    }else{
        try {
        const decoded = jwt.verify(token, process.env.JWT_KEY as string);
        callback(req, res);
        } catch (err) {
           accessDenied(res);
        }
    }
}

export const  checkIfLoggedIn = (req: Request, res: Response) =>{
    verifyAccess (req, res, ()=>{
        res.sendStatus(200);
    })
}