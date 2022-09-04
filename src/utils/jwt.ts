import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



export const assignToken = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY as string);
}

export const verifyToken = (token: any) => {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY as string);
}