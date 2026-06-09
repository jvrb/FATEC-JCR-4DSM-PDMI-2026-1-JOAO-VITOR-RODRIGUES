import { Router } from "express";
import * as disciplina from "../controllers/disciplinaController";

const disciplinaRoutes = Router()

disciplinaRoutes.get("/", disciplina.getDisciplinas)
disciplinaRoutes.get("/:idDisciplina", disciplina.getDisciplinaId)
disciplinaRoutes.get("/professor/:professorId", disciplina.getDisciplinaId)
disciplinaRoutes.post("/", disciplina.createDisciplina)
disciplinaRoutes.put("/:id", disciplina.updateDisciplinaById)

export default disciplinaRoutes