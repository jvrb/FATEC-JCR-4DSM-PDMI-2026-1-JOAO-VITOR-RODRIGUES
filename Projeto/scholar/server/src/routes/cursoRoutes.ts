import { Router } from "express";
import { createCurso, deleteCurso, getCursos, updateCurso } from "../controllers/cursoController";

const cursosRouter = Router()

cursosRouter.get("/", getCursos)
cursosRouter.post("/", createCurso)
cursosRouter.put("/:id", updateCurso)
cursosRouter.delete("/:id", deleteCurso)

export default cursosRouter