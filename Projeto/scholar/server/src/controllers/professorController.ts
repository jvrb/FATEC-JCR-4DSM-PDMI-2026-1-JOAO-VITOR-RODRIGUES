import { Request, Response } from "express";
import * as professorService from "../service/professorService";
import { hashPwd } from "../utils/gerarHashPwd";

export const getProfessores = async (req: Request, res: Response) => {
	const professor = await professorService.getProfessores();
	res.json(professor);
};

export const getProfessor = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		console.log(id);
		const professor = await professorService.getProfessorById(id?.toString());

        console.log(professor)

		return res.json(professor);
	} catch (error: any) {
        return res.json({message: error.message})
    }
};

export const createProfessor = async (req: Request, res: Response) => {
	try {
		const { nome, sobrenome, email, titulacao, area, tempoDocencia } = req.body;

		if (!nome || !titulacao || !area || !tempoDocencia || !email || !sobrenome) {
			return res.send({messageError: "Preencha todos os dados"});
		}

		const senhaPadrao = "senhaAppShcolar"
		const hashSenha = await hashPwd(senhaPadrao);

		await professorService.createUserProfessor(nome, sobrenome, email, hashSenha, titulacao, area, tempoDocencia);

		return res.send({messageSuccess: "Professor cadastrado com sucesso."});
	} catch (error) {
		return res.send({messageError: `Não foi possivel criar um novo professor. ${error}`});
	}
};

export const updateProfessor = async(req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { nome, email, titulacao, area, tempoDocencia } = req.body;

		if(!id){
			return res.send({messageError: "Erro interno, tente novamente!"})
		}

		if(!nome || !email || !titulacao || !area || !tempoDocencia){
			return res.send({messageError: "Preencha todos os campos!"})
		}

		await professorService.updateProfessor(id.toString(), nome, email, titulacao, area, tempoDocencia)


	} catch (error: any) {
		return res.status(500).send({messageError: `Não foi possivel atualizar ${error.message}`})
	}
}
