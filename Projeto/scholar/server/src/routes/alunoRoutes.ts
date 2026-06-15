import { Router } from "express";
import { getAlunos, getAlunoById, updateAluno, deleteAluno, createAluno, vincularAlunoTurmaController } from "../controllers/alunoController";

const alunoRoutes = Router();

alunoRoutes.get("/", getAlunos);
alunoRoutes.get("/:id", getAlunoById);
alunoRoutes.post("/", createAluno);
alunoRoutes.put("/:id", updateAluno);
alunoRoutes.delete("/:id", deleteAluno);
alunoRoutes.put("/vincular-turma/:id", vincularAlunoTurmaController);

export default alunoRoutes;
