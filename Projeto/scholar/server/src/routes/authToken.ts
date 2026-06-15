import {Router} from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { authTokenController } from "../controllers/authTokenController"

const authToken = Router()

authToken.get("/", authMiddleware, authTokenController)

export default authToken