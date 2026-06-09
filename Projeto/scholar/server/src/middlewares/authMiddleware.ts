import { Request, Response } from "express";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) return res.status(401).send({message: "Token necessario para validação"});

        const token = authHeader.split(" ")[1]

        if (!token) return res.status(401).send({message: "Token Invalido!"})

		const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET as string);

        (req as any).user  = decoded
		next()
	} catch (error) {
        return res.status(401).send({
            message: "Token inválido"
        });
    }
};
