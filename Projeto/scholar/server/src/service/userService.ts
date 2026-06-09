import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma";

export const getAllUser = async () => {
	return prisma.usuario.findMany();
};



export const createAdmin = async (nome: string, sobrenome: string, email: string, password: string) => {
	return prisma.usuario.create({
		data: {
			nome,
			sobrenome,
			email,
			password,
			role: Role.ADMIN,
		},
	});
};

export const updateUser = async (id: string, nome: string, sobrenome: string, email: string) => {
	return prisma.usuario.update({
		where: {
			id,
		},
		data: {
			nome,
			sobrenome,
			email,
		},
	});
};


export const getUsuarioById = async (id: string) => {
	console.log(id)
	return prisma.usuario.findUnique({
		where: {
			id
		}
	});
	
};

export const getUsuarioByEmail = async (email: string) => {
	console.log(email)
	return prisma.usuario.findUnique({
		where: {
			email
		}
	});
	
};

