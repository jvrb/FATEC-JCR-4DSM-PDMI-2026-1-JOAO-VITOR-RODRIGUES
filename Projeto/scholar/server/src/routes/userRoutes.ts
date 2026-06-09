import {Router} from "express"
import {createAdmin, getUsers, validateUsuario } from "../controllers/userController"

const userRoutes = Router()

userRoutes.get("/", getUsers)
userRoutes.post("/", createAdmin)
userRoutes.post("/validate", validateUsuario)

export default userRoutes