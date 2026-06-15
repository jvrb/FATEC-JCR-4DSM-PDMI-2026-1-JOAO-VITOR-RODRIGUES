import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function createBoletimController(req: Request, res: Response) {
	try {
		const { alunoId, disciplinaId, nota1, nota2 } = req.body;

		const n1 = Number(nota1);
		const n2 = Number(nota2);

		if (!alunoId || !disciplinaId) {
			return res.status(400).json({
				message: "alunoId e disciplinaId são obrigatórios",
			});
		}

		if (isNaN(n1) || isNaN(n2)) {
			return res.status(400).json({
				message: "Notas inválidas",
			});
		}

		const aluno = await prisma.aluno.findUnique({ where: { id: alunoId } });
		if (!aluno) {
			return res.status(404).json({ message: "Aluno não encontrado" });
		}

		const disciplina = await prisma.disciplina.findUnique({
			where: { id: disciplinaId },
		});

		if (!disciplina) {
			return res.status(404).json({ message: "Disciplina não encontrada" });
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

		return res.status(201).json(boletim);
	} catch (error: any) {
		return res.status(500).json({
			message: error.message || "Erro ao criar boletim",
		});
	}
}

export async function getBoletins(req: Request, res: Response) {
	try {
		const boletins = await prisma.nota.findMany({
			include: {
				aluno: true,
				disciplina: true,
			},
		});

		return res.json(boletins);
	} catch (error) {
		return res.status(500).json({
			message: "Erro ao buscar boletins",
		});
	}
}

export async function getBoletimById(req: Request, res: Response) {
	try {
		const id = req.params.id;

		if (!id || Array.isArray(id)) {
			return res.status(400).json({ message: "ID inválido" });
		}

		const boletim = await prisma.nota.findUnique({
			where: { id },
			include: {
				aluno: true,
				disciplina: true,
			},
		});

		if (!boletim) {
			return res.status(404).json({
				message: "Boletim não encontrado",
			});
		}

		return res.json(boletim);
	} catch (error) {
		return res.status(500).json({
			message: "Erro ao buscar boletim",
		});
	}
}

export async function updateBoletim(req: Request, res: Response) {
	try {
		const id = req.params.id;

		if (!id || Array.isArray(id)) {
			return res.status(400).json({ message: "ID inválido" });
		}
		const { nota1, nota2 } = req.body;

		const n1 = Number(nota1);
		const n2 = Number(nota2);

		if (isNaN(n1) || isNaN(n2)) {
			return res.status(400).json({
				message: "Notas inválidas",
			});
		}

		const boletimExists = await prisma.nota.findUnique({
			where: { id },
		});

		if (!boletimExists) {
			return res.status(404).json({
				message: "Boletim não encontrado",
			});
		}

		const boletim = await prisma.nota.update({
			where: { id },
			data: {
				nota1: n1,
				nota2: n2,
			},
			include: {
				aluno: true,
				disciplina: true,
			},
		});

		return res.json(boletim);
	} catch (error) {
		return res.status(500).json({
			message: "Erro ao atualizar boletim",
		});
	}
}

export async function deleteBoletim(req: Request, res: Response) {
	try {
		const id = req.params.id;

		if (!id || Array.isArray(id)) {
			return res.status(400).json({ message: "ID inválido" });
		}

		const boletimExists = await prisma.nota.findUnique({
			where: { id },
		});

		if (!boletimExists) {
			return res.status(404).json({
				message: "Boletim não encontrado",
			});
		}

		await prisma.nota.delete({
			where: { id },
		});

		return res.json({
			message: "Boletim deletado com sucesso",
		});
	} catch (error) {
		return res.status(500).json({
			message: "Erro ao deletar boletim",
		});
	}
}
