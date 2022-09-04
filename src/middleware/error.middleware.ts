import {Request, Response, NextFunction, ErrorRequestHandler } from "express";

export class AppError extends Error {
    code: number;

    constructor(code: number, message: string){
        super();
        this.code = code;
        this.message  = message;
        this.stack = (process.env.NODE_ENV  === "production") ? "" : this.stack;
    }
}

const errorHandler: ErrorRequestHandler = (error:AppError, req: Request, res: Response, next: NextFunction) => {

    const code = error.code || 500;
    const message = error.message;
    if(!(error instanceof AppError)){
        res.status(code).send({
            message: "Something went wrong",
            success:false,
            data: null
        })
    }

    res.status(code).send({
        message,
        success:false,
        data: null
    })
}

export default errorHandler;