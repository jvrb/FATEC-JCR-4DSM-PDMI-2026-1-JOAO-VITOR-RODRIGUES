import { prisma } from "../lib/prisma";

export const getTurmas = async () => {
	return await prisma.turma.findMany({
		include: {
			curso: true
		}
	});
};

export const turmasByCurso = async (idCurso: string) => {
	return await prisma.curso.findFirst({
		where: {
			id: idCurso,
		},
		include: {
			turmas: true,
		},
	});
};

export const createTurma = async (nome: string, cursoId: string) => {
	const existTurma = await prisma.turma.findFirst({
		where: {
			nome: nome,
		},
	});

	if (!existTurma) {
		return prisma.turma.create({
			data: {
				nome,
				cursoId,
			},
		});
	}

    return
};

export const gerarTurmas = async (nome: string, semestre: number) => {
	let sigla: string = "";
	let turmas: string[] = [];
	const excludeKey = ["DE", "E", "DA" , "PARA"];
	const nomeArray: string[] = nome.toUpperCase().split(" ");

	console.log(nomeArray)

	if (nomeArray.length > 1) {
		nomeArray.map((nome) => {
			if (!excludeKey.includes(nome.toUpperCase())) {
				sigla += nome[0];
			}
		});
	} else {
		sigla += nomeArray[0]?.slice(0, 3).toUpperCase();
	}

	for (let cont = 1; cont <= semestre; cont++) {
		turmas.push(`${cont}${sigla}`);
	}

	return turmas;
};

export const turmaById = async (turmaId: string) => {
	return await prisma.turmaDisciplina.findFirst({
		where: {
			turmaId,
		},
		include: {
			disciplina: true,
		},
	});
};

export const quantidadeAlunos = async (turmaId: string) => {
	const listAlunos = await prisma.turma.findMany({
		where: {
			id: turmaId,
		},
	});
	return listAlunos.length;
};

interface TurmaDisciplinaTypes {
	turmaId: string;
	disciplinaId: string;
}

export const createTurmaDisciplina = async ({turmaId, disciplinaId}: TurmaDisciplinaTypes) => {
	

	console.log(turmaId, disciplinaId)

	const turma = await prisma.turma.findUnique({
		where:{
			id: turmaId
		}
	})

	console.log("Turma: ", turma)

	const disciplina = await prisma.disciplina.findUnique({
		where: {
			id: disciplinaId
		}
	})

	console.log("Disciplina: ", disciplina)

	return await prisma.turmaDisciplina.create({
		data: {
			turmaId,
			disciplinaId,
		},
	});
};
