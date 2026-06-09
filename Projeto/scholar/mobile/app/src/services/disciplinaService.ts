import { ActivityIndicator } from "react-native";
import { API_URL } from "./api";

interface ICreateTypes {
	nome: string;
	professorId?: string;
}

export async function createDisciplina({ nome, professorId }: ICreateTypes) {
	let newDisciplina;
    if (professorId) {
		newDisciplina = await fetch(`${API_URL}/disciplina`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nome,
                professorId
			}),
		});
	}else{
        newDisciplina = await fetch(`${API_URL}/disciplina`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nome
			}),
		});
    }

	const resp = await newDisciplina.json();
    console.log(resp)
	return resp;
}


export async function getDisciplinaById(disciplinaId: string) {
    const disciplina = await fetch(`${API_URL}/disciplina/${disciplinaId}`)
    const resp = await disciplina.json()

    console.log(resp)

    return resp
}


export async function getAllDisciplinas(){
	const disciplinas = await fetch(`${API_URL}/disciplina`)
	const resp = await disciplinas.json()

	return resp
}

export async function vincularTurmaDisciplina(disciplinaId: string, professorId: string){
	const newVinculo = await fetch(`${API_URL}/disciplina/${disciplinaId}`,{
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			disciplinaId,
			professorId
		})
	})
	const resp = await newVinculo.json()

	return resp
}

export async function vincularProfessorDisciplina(disciplinaId: string, professorId: string){

	console.log(disciplinaId, professorId)
	
	const newVinculo = await fetch(`${API_URL}/disciplina/${disciplinaId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			disciplinaId,
			professorId
		})
	})

	const resp = await newVinculo.json()
	return resp
}

