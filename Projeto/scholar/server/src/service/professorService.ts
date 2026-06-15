import { Role } from "../../generated/prisma";
import { prisma } from "../lib/prisma";

export const getProfessores = async() => {
    return prisma.professor.findMany({
        include: {
            usuario: true,
            disciplinas: {
                include: {
                    turmas: {
                        include: {
                            turma: {
                                include: {
                                    curso: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export const getProfessorById = async(userId: any) => {
    return prisma.professor.findUnique({
        where: {
            usuarioId: userId
        },
        include: {
            usuario: true,
            disciplinas: true
        }
    })
}

export const createUserProfessor = async (
	nome: string,
	sobrenome: string,
	email: string,
	password: string,
	titulacao: string,
	area: string,
	tempoDocencia: number,
) => {
	try {
		const emailExiste = await professorExists(email)

		if (emailExiste) {
			throw new Error("Esse email já existe");
		}
		const newUser = await prisma.usuario.create({
			data: {
				nome,
				sobrenome,
				email,
				password,
				role: Role.PROFESSOR,
				mustChangePassword: true,
			},
		});

		const newProfessor = await prisma.professor.create({
			data: {
				nome,
				titulacao,
				area,
				tempoDocencia,
				email,
				usuarioId: newUser.id,
			},
		});

		return newProfessor;
	} catch (error) {
		throw error;
	}
};

export const professorExists = async (email: string) => {
    return prisma.professor.findUnique({
        where: {
            email
        }
    })
}

export const updateProfessor = async (id: string, nome: string, email: string, titulacao: string,area: string, tempoDocencia: number) => {
	// nome, titulacao,area,tempoDocencia,email,

	return prisma.professor.update({
		where: {
			id
		},
		data:{
			nome,
			titulacao,
			area,
			tempoDocencia,
			email
		}
	})
}