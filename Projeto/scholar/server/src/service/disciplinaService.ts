import { prisma } from "../lib/prisma";

export const getDisciplinas = async () => {
	return prisma.disciplina.findMany();
};

export const existDisciplina = async (nome: string) => {
	return prisma.disciplina.findFirst({
		where: {
			nome,
		},
	});
};

export const createDisciplina = async (nome: string, professorId: string | null) => {

	const exist = await existDisciplina(nome);
	if (exist) {
		throw new Error("Já existe uma disciplina com esse nome!")
	}

    console.log(nome, professorId)
	return prisma.disciplina.create({
		data: {
			nome,
            professorId
		},
	});
};

export const updateDisciplina = async(idDisciplina: string, professorId: string) => {
    return prisma.disciplina.update({
        where: {
            id: idDisciplina
        },
        data: {
            professorId
        }
    })
}

export const disciplinaById = async(disciplinaId: string) => {
    return await prisma.disciplina.findFirst({
        where: { 
            id: disciplinaId
        }
    })
}

export const disciplinaByProfessorId = async(professorId: string) => {
    return await prisma.disciplina.findFirst({
        where: { 
            professorId: professorId
        }
    })
}
export const turmaDisciplinaById = async(disciplinaId: string) => {
    return await prisma.turmaDisciplina.findFirst({
        where: { 
            disciplinaId
        },
        include: {
            turma: true
        }
    })
}