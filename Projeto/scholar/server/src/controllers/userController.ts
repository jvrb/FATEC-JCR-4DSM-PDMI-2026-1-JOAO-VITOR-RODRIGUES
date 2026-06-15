import { Request, Response } from "express";
import * as userService from "../service/userService";
import { hashPwd } from "../utils/gerarHashPwd";
import bycrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getUsers = async (req: Request, res: Response) => {
	const users = await userService.getAllUser();
	res.json(users);
};

export const createAdmin = async (req: Request, res: Response) => {
	try {
		const {nome, sobrenome, email, password} = req.body
		const passHash = await hashPwd(password)

		await userService.createAdmin(nome, sobrenome, email, passHash)

		return res.send("Admin Cadastrado com sucesso!")
	} catch (error: any) {
		return res.send(`Erro ao cadastrar admin ${error.message}`)
	}
}

export const validateUsuario = async (req: Request, res: Response) => {
	try {
		const {email, password} = req.body
		
		const usuario = await userService.getUsuarioByEmail(email)

		if(!usuario){
			
			return res.status(400).send({message: "Usuario não encontrado"})
		}

		const senhaBanco = usuario.password
		const validaSenha = await bycrypt.compare(password, senhaBanco)

		if(!validaSenha){
			return res.status(401).send({message: "Senha incorreta"	})
		}

		const jwtToken = jwt.sign({id: usuario.id, role: usuario.role}, process.env.JWT_SECRET as string, {expiresIn: '1h'})


		return res.send({
			token: jwtToken
		})

	} catch (error) {
		return res.send({message: "Erro ao validar usuario"})
	}
}