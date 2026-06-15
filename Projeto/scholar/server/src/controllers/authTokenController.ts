import { Request, Response } from "express"
import { getUsuarioById } from "../service/userService"
import { getAlunoById } from "../service/alunoService"
import { getProfessorById } from "../service/professorService"

export const authTokenController = async(req: Request, res: Response) => {
    try {

        if(req.user?.role == "ADMIN"){
            
            const admin = await getUsuarioById(req.user?.id)

            return res.status(200).send(admin)
        }
        if(req.user?.role == "ALUNO"){
            
            const aluno = await getAlunoById(req.user?.id)

            return res.status(200).send(aluno)
        }
        if(req.user?.role == "PROFESSOR"){
            const professor = await getProfessorById(req.user?.id)

            return res.status(200).send(professor)
        }
    } catch (error) {
        return res.status(401).send({message: "Não foi possivel validar o token"})
    }
}