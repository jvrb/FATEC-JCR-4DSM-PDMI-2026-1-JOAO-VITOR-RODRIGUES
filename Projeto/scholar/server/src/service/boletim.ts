import { prisma } from "../lib/prisma";

interface CreateBoletimDTO {
	alunoId: string;
	disciplinaId: string;
	nota1: number;
	nota2: number;
}

export async function createBoletim({ alunoId, disciplinaId, nota1, nota2 }: CreateBoletimDTO) {
	const n1 = Number(nota1);
	const n2 = Number(nota2);

	if (isNaN(n1) || isNaN(n2)) {
		throw new Error("Notas inválidas");
	}

	const aluno = await prisma.aluno.findUnique({
		where: { id: alunoId },
	});

	if (!aluno) {
		throw new Error("Aluno não encontrado");
	}

	const disciplina = await prisma.disciplina.findUnique({
		where: { id: disciplinaId },
	});

	if (!disciplina) {
		throw new Error("Disciplina não encontrada");
	}

	const boletim = await prisma.nota.create({
		data: {
			alunoId,
			disciplinaId,
			nota1: n1,
			nota2: n2,
		},
		include: {
			aluno: true,
			disciplina: true,
		},
	});

	return boletim;
}
