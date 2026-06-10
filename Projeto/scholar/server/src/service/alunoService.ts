import { prisma } from "../lib/prisma";
import { gerarMatriculaUnica } from "../utils/gerarMatricula";
import { Role } from "../../generated/prisma";
import * as enderecoService from "../service/enderecoService";

export const getAlunos = async () => {
	return prisma.aluno.findMany({
		include: {
			matricula: {
				include: {
					curso: true,
				},
			},
			usuario: true,
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
					curso: true,
				},
			},
			endereco: true,
			nota: true,
			usuario: true,
			turma: {
				include: {
					disciplinas: {
						include: {
							disciplina: true,
						},
					},
				},
			},
		},
	});
};

export const createUserAluno = async (
	nome: string,
	sobrenome: string,
	email: string,
	password: string,
	cursoId: string,
	cep: string,
	endereco: string,
	cidade: string,
	estado: string,
) => {
	try {
		const emailExiste = await prisma.usuario.findUnique({
			where: {
				email: email,
			},
		});
		let newUser;

		if (emailExiste) {
			newUser = emailExiste;
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

		// Gerar matricula
		const matricula = await gerarMatriculaUnica(newAluno.id, cursoId);

		const enderecAluno = await enderecoService.updateEndereco(newAluno.id, cep, endereco, cidade, estado);

		return newUser;
	} catch (error) {
		return `Erro ao cadastrar o aluno. ${error}`;
	}
};

export const updateAluno = async (
	alunoId: string,
	nome: string,
	sobrenome: string,
	email: string,
	cep: string,
	endereco: string,
	cidade: string,
	estado: string,
) => {
	try {
		const usuario = await prisma.usuario.update({
			where: {
				id: alunoId,
			},
			data: {
				nome,
				sobrenome,
				email,
			},
		});

		const aluno = await prisma.aluno.update({
			where: {
				usuarioId: usuario.id,
			},
			data: {
				nome,
				email,
			},
		});

		await prisma.endereco.update({
			where: {
				alunoId: aluno.id,
			},
			data: {
				cep,
				endereco,
				cidade,
				estado,
			},
		});

		return "Aluno Atualizado com sucesso!";
	} catch (error: any) {
		return `Não foi possivel atualizar o aluno ${error.message}`;
	}
};

export const updateAlunoTurma = async (alunoId: string, idTurma: string) => {
	return await prisma.aluno.update({
		where: {
			id: alunoId,
		},
		data: {
			turmaId: idTurma,
		},
	});
};

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

export async function vincularAlunoTurma(alunoId: string, turmaId: string) {
	const aluno = await prisma.aluno.update({
		where: {
			id: alunoId,
		},
		data: {
			turmaId,
		},
		include: {
			turma: true,
		},
	});

	return aluno;
}
