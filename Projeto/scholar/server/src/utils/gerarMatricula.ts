import { prisma } from "../lib/prisma";

export const gerarMatricula = () => {
	// Gerar matricula baseado na data
	const data = new Date().getFullYear();
	const random = Math.floor(1000000 + Math.random() * 9000000);
	return `${data}${random}`;
};

export const gerarMatriculaUnica = async (alunoId: string, cursoId: string) => {
	const MAX_TENTATIVAS = 5;

	for (let i = 0; i < MAX_TENTATIVAS; i++) {
		try {
			const matricula = gerarMatricula().toString();
			console.log("matricula: ", matricula);
            console.log("Aluno ID: ",alunoId)
            console.log("Curso ID: ",cursoId)
			const createMatricula = await prisma.matricula.create({
				data: {
					numero: matricula,
					alunoId,
					cursoId,
				},
			});

			console.log(createMatricula);

			return createMatricula;
		} catch (error: any) {
			if (error.code === "P2002") {
				continue;
			} else {
				throw error;
			}
		}
	}

	throw new Error("Não foi possível gerar a matrícula. Tente novamente.");
};
