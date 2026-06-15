import { Router } from "express";
import { getProfessor,  getProfessores} from "../controllers/professorController";
import { createProfessor } from "../controllers/professorController";

const professorRoutes = Router()

professorRoutes.get("/", getProfessores)
professorRoutes.get("/:id", getProfessor)
professorRoutes.post("/", createProfessor)

export default professorRoutes