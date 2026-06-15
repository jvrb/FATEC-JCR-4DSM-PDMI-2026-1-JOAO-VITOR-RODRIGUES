import { Router } from "express";
import { createBoletimController } from "../controllers/boletimController";
import { getBoletins, getBoletimById, updateBoletim, deleteBoletim } from "../controllers/boletimController";

const boletimRoutes = Router();

boletimRoutes.get("/", getBoletins);
boletimRoutes.get("/:id", getBoletimById);
boletimRoutes.post("/", createBoletimController);
boletimRoutes.put("/:id", updateBoletim);
boletimRoutes.delete("/:id", deleteBoletim);

export default boletimRoutes;