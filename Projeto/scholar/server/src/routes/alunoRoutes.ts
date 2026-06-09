import {Router} from "express"
import { getAlunos, getAlunoById, updateAluno, deleteAluno, createAluno } from "../controllers/alunoController"

const alunoRoutes = Router()

alunoRoutes.get("/", getAlunos)
alunoRoutes.get("/:id", getAlunoById)
alunoRoutes.post("/", createAluno)
alunoRoutes.put("/:id", updateAluno)
alunoRoutes.delete("/:id", deleteAluno)


export default alunoRoutes