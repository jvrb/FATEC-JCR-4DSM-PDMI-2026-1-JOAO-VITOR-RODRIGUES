import { Request, Response } from "express";
import * as disciplinaService from "../service/disciplinaService"

export const getDisciplinas = async (req: Request, res: Response) => {
    try {  
        const listaDisciplinas = await disciplinaService.getDisciplinas()
        if(listaDisciplinas.length < 1) {
            return res.send("Não existe disciplina cadastrada")
        }
        return res.json(listaDisciplinas)
        
    } catch (error: any) {
        return res.status(500).send(`Erro ao buscar disciplinas ${error.message}`)
    }
}

export const createDisciplina = async ( req: Request, res: Response) => {
    try {

        const { nome, professorId } = req.body
        
        const newDisciplina = await disciplinaService.createDisciplina(nome, professorId)

        return res.send(newDisciplina)
        
    } catch (error: any) {
        return res.status(500).send({messageError: `Erro ao cadastrar disciplina ${error.message}`})
    }
}

export const getDisciplinaId = async (req: Request, res: Response) => {
    const { idDisciplina } = req.params
    console.log(idDisciplina)

    if(!idDisciplina) {
        return res.send({message: "Informe o id da disciplina"})
    }

    const disciplina = await disciplinaService.disciplinaById(idDisciplina.toString())

    if(!disciplina) {
        return res.send({messageError: "Essa disciplina não está vinculada a nenhuma turma"})
    }
    return res.send(disciplina)
}

export const getDisciplinaByProfessor = async (req: Request, res: Response) => {
    const { professorId } = req.params
    console.log(professorId)

    if(!professorId) {
        return res.send({message: "Informe o id do Professor"})
    }

    const disciplina = await disciplinaService.disciplinaByProfessorId(professorId.toString())

    if(!disciplina) {
        return res.send({messageError: "Essa disciplina não está vinculada a nenhuma turma"})
    }
    return res.send(disciplina)
}

export const getDisciplinaName = async (req: Request, res: Response) => {
    const { nome } = req.params
    console.log(nome)

    if(!nome) {
        return res.send({message: "Informe o nome da disciplina"})
    }

    const disciplina = await disciplinaService.existDisciplina(nome.toString())

    if(!disciplina) {
        return res.send({message: "Disciplina não existe"})
    }
    return res.send(disciplina)
}

export const updateDisciplinaById = async(req: Request, res: Response) => {
    try {
        const { id } = req.params 
        const { professorId} = req.body

        if(!id) {
            return res.status(401).send({message: "Id da disciplina inválido!"})
        }

        if(!professorId) {
            return res.status(401).send({message: "Id do professor inválido!"})
        }

        const updateData = await disciplinaService.updateDisciplina(id.toString(), professorId)

        console.log(updateData)

        return res.status(201).send({messageSuccess: "Disciplina atualizada com sucesso!"})

    } catch (error: any) {
        return res.status(400).send({message: error.message})
    }
}