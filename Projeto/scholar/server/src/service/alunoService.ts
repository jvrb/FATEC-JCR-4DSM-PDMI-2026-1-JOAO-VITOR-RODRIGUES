import { prisma } from "../lib/prisma";
import { gerarMatriculaUnica } from "../utils/gerarMatricula";
import { Role } from "../../generated/prisma";


export const getAlunos = async () => {
	return prisma.aluno.findMany({
		include: {
			matricula: {
				include: {
					curso: true,
				},
			},
			usuario: true
		},
	});
};

export const getAlunoById = async (userId: any) => {
	return prisma.aluno.findUnique({
		where: {
			usuarioId: userId,
		},
		include: {
			matricula: {
				include: {
					curso: true
				},
			},
			endereco: true,
			nota: true,
			usuario: true,
			turma: {
				include: {
					disciplinas: {
						include: {
							disciplina: true
						}
					}
				}
			}
		},
	});
};

export const createUserAluno = async (nome: string, sobrenome: string, email: string, password: string, cursoId: string) => {
	try {
		const emailExiste = await prisma.usuario.findUnique({
			where: {
				email: email,
			},
		});
		let newUser;

		if (emailExiste) {
			newUser = emailExiste
		} else {
			newUser = await prisma.usuario.create({
				data: {
					nome,
					sobrenome,
					email,
					password,
					role: Role.ALUNO,
				},
			});
		}

		const newAluno = await prisma.aluno.create({
			data: {
				nome,
				email,
				usuarioId: newUser.id,
			},
		});

		console.log(newAluno)

		// Gerar matricula
		const matricula = await gerarMatriculaUnica(newAluno.id, cursoId);
		console.log(matricula)
        return
	} catch (error) {
		return `Erro ao cadastrar o aluno. ${error}`;
	}
};

export const updateAluno = async (alunoId: string, name: string, email: string) => {
	return await prisma.aluno.update({
		where: {
			id: alunoId,
		},
		data: {
			name,
			email,
		},
	});
};

export const updateAlunoTurma = async (alunoId: string, idTurma: string) => {
	return await prisma.aluno.update({
		where: {
			id: alunoId
		},
		data: {
			turmaId: idTurma
		}
	})
}

export const deleteAluno = async (alunoId: string) => {
	try {
		await prisma.endereco.delete({
			where: {
				alunoId,
			},
		});

		await prisma.matricula.delete({
			where: {
				alunoId,
			},
		});

		await prisma.aluno.delete({
			where: {
				id: alunoId,
			},
		});

		return "Aluno deletado com sucesso.";
	} catch (error) {
		return `Não foi possivel deletar esse aluno. ${error}`;
	}
};
