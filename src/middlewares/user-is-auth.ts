import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpError  from '../classes/error'

module.exports = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'nailedit');
        } catch (err: any) {
            err.statusCode = 401;
            return next(err);
        }
        if (!decodedToken) {
            const err = new HttpError({ statusCode: 401, message: 'UnAuthorized', name: 'UnAuthorized' });
            throw err;
        }
    }
    next();
}