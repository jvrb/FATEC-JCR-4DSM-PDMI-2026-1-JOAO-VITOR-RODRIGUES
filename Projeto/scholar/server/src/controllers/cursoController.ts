import { Request, Response } from "express";
import * as cursoService from "../service/cursoService";
import * as turmaService from "../service/turmaService"

export const getCursos = async(req: Request, res: Response) => {
    const cursos = await cursoService.getCursos()

    return res.json(cursos)
}

export const createCurso = async(req: Request, res: Response) => {

    try {
        const {nome, semestre, area, coordenadorId} = req.body
        if(!nome) {
            return res.send({message: "Preencha o nome do curso."})
        }
        if(!semestre) {
            return res.send({message: "Preencha quantos semestres tem o curso."})
        }

        const curso = await cursoService.createCurso(nome, semestre, area, coordenadorId)
        const turmas = await turmaService.gerarTurmas(curso.nome, curso.semestre)

        await Promise.all(
            turmas.map((turma: string) => 
                turmaService.createTurma(turma, curso.id)
            )
        )

        return res.send({messageSuccess: "Curso criado com sucesso."})
    } catch (error:any) {
        return res.send({messageError: `Não fó possivel cadastrar o curso: ${error.message}`})
    }

}

export const updateCurso = async(req: Request, res: Response) => {
    
    try {
        const { id } = req.params
        const { nome, semestre, area, coordenadorId } = req.body

        if(!nome || !id) {
            return res.send({messageError: "O curso não pode ficar sem nome"})
        }

        await cursoService.updateCurso(id.toString(), nome, semestre, area, coordenadorId)

        return res.send({messageSuccess: "Curso atualizado com sucesso."})
    } catch (error) {
        return res.send({messageError: `Não foi possivel atualizar esse curso. ${error}`})
    }
}


export const deleteCurso = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        if(!id){
            return res.send({messageError: "Informe o id do curso"})
        }

        const remove = await cursoService.deleteCurso(id.toString())

        if(!!!remove){
            throw Error
        }

        return res.send({messageSuccess: "Curso removido com sucesso."})
    } catch (error: any) {
        if(error.code === "P2003"){
            return res.send({messageError: "Não é possivel remover este curso, pois existe alunos matriculados."})
        }
       return res.send(error)
    }
}