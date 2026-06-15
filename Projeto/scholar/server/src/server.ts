import "dotenv/config"
import express from "express";
import userRoutes from "./routes/userRoutes";
import alunoRoutes from "./routes/alunoRoutes"
import professorRoutes from "./routes/professorRoutes"
import cursosRouter from "./routes/cursoRoutes";
import turmasRoutes from "./routes/turmasRoutes";
import disciplinaRoutes from "./routes/disciplinaRoutes";
import cors from "cors";
import authToken from "./routes/authToken";
import boletimRoutes from "./routes/boletimRoutes";

const app = express();
const PORT = 3333;

app.use(express.json())
app.use(cors());

app.use("/user", userRoutes);
app.use("/aluno", alunoRoutes)
app.use("/professor", professorRoutes)
app.use("/curso", cursosRouter)
app.use("/turmas", turmasRoutes)
app.use("/disciplina", disciplinaRoutes)
app.use("/boletim", boletimRoutes)
app.use("/auth", authToken)

app.listen(3333, () => {
  console.log(`SERVIDOR RODANDO EM http://localhost:${PORT}`);
});