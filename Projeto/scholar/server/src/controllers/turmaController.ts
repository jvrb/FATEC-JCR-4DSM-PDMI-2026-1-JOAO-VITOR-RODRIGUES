import { Request, Response } from "express";
import * as tumasService from "../service/turmaService"

export const getTurmas = async ( req: Request, res: Response) => {
    try {
        const turmas = await tumasService.getTurmas()
        if(turmas.length < 1) {
            return res.json("Não existe turmas cadastradas")
        }
        return res.json(turmas)
    } catch (error: any) {
        return res.json(`Erro ao buscas as turmas ${error.message}`)
    }
}

export const getTurmaById = async (req: Request, res: Response) => {
    const { idTurma } = req.params
    console.log(idTurma)

    if(!idTurma) {
        return res.send("Informe o id da turma")
    }

    const turma = await tumasService.turmaById(idTurma.toString())

    if(!turma) {
        return res.send("Essa turma ainda não possui disciplina cadastrada")
    }
    return res.send(turma)
}

export const createTurmaDisciplina = async (req: Request, res: Response) => {
    try {
        const { turmaId , disciplinaId} = req.body

        console.log({ turmaId , disciplinaId})

        if(!turmaId) {
            return res.status(400).send({messageError: "O id da turma é obrigatório"})
        }
        if(!disciplinaId) {
            return res.status(400).send({messageError: "O id da disciplina é obrigatório"})
        }
        await tumasService.createTurmaDisciplina({turmaId, disciplinaId})
        return res.send({messageSuccess: "Disciplina vinculada com sucesso"})
    } catch (error: any) {
        console.error(error)
        throw error
        // return res.send({messageError: `Erro ao vincular turma a uma disciplina${error.message}`})
    }
}