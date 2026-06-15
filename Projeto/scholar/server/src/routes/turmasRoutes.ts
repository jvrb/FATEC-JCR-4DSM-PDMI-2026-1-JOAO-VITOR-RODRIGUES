import { Router } from "express";
import { createTurmaDisciplina, getTurmaById, getTurmas } from "../controllers/turmaController";

const turmasRoutes = Router()


turmasRoutes.get("/", getTurmas)
turmasRoutes.get("/:idTurma", getTurmaById)
turmasRoutes.post("/", createTurmaDisciplina)

export default turmasRoutes