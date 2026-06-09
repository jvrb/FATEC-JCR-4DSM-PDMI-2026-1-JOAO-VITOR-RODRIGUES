import { Request, Response } from "express";
import * as alunoService from "../service/alunoService";
import * as enderecoService from "../service/enderecoService";
import { hashPwd } from "../utils/gerarHashPwd";

export const getAlunos = async (req: Request, res: Response) => {
	const users = await alunoService.getAlunos();
	return res.json(users);
};

export const getAlunoById = async (req: Request, res: Response) => {
	const { id } = req.params;
	console.log(id);
	const users = await alunoService.getAlunoById(id?.toString());
	if (users === null) {
		return res.send("Usuario não encontrado");
	}
	res.json(users);
};

export const createAluno = async (req: Request, res: Response) => {
	const { nome, sobrenome, email, password, cursoId } = req.body;
	try {
		if(!nome){
			return res.send({messageError: "Preencha o nome"});
		}
		if(!sobrenome){
			return res.send({messageError: "Preencha o sobrenome"});
		}
		if(!email){
			return res.send({messageError: "Preencha o email"});
		}
		if(!password){
			return res.send({messageError: "Preencha a senha"});
		}

		const hashSenha = await hashPwd(password);

		const newAluno = await alunoService.createUserAluno(nome, sobrenome, email, hashSenha, cursoId);

		return res.send({messageSuccess: "Aluno Criado com sucesso!", aluno: newAluno});
	} catch (error) {
		console.log(`Não foi possivel criar o usuario. ${error}`);
	}
};

export const updateAluno = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { nome, email, cep, endereco, cidade, estado } = req.body;

	try {
		if (!id) {
			return res.send("Erro interno ao buscar id do aluno");
		}
		if (!nome || !email) {
			return res.send("Preencha Todos os campos.");
		}

		const updateAluno = await alunoService.updateAluno(id.toString(), nome, email);

		const updateEndereco = await enderecoService.updateEndereco(id.toString(), cep, endereco, cidade, estado);

		if (updateAluno && updateEndereco) {
			return res.send("Aluno atualizado com sucesso.");
		} else {
			throw Error;
		}
	} catch (error: any) {
		if (error.code === "P2025") {
			return res.send("Informe um usuario valido");
		}
		return res.send(`Não foi possivel atualizar esse aluno. ${error}`);
	}
};

export const deleteAluno = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.send("Informe o id do aluno");
		}

		await alunoService.deleteAluno(id.toString());

		return res.send("Aluno exlcuido com sucesso.");
	} catch (error) {
		return res.send(`Não foi possivel deletar esse aluno. ${error}`);
	}
};


