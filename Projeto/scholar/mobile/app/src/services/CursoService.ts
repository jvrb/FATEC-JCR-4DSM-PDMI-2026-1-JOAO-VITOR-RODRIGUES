import { API_URL } from "./api";

export async function getAllCursos() {
    const cursos = await fetch(`${API_URL}/curso`)
    const resp = await cursos.json()

    return resp
}