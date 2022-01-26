import { NextFunction, Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import HttpError  from '../classes/error'

module.exports = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        const err = new HttpError({ statusCode: 401, message: 'You are not logged in, please login and try again', name: 'UnAuthorized' });
        res.status(401).json(err)
        return
     }
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'nailedit');
        } catch (e: any) {
            const err = new HttpError({ statusCode: 401, message: 'UnAuthorized', name: 'UnAuthorized' });
            res.status(401).json(err)
            return
        }
        if (!decodedToken) {
            const err = new HttpError({ statusCode: 401, message: 'there was an error in the token, please login and try again', name: 'UnAuthorized' });
            res.status(401).json(err)
        }
    }
    next();
}