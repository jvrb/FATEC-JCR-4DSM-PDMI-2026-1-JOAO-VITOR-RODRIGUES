import { API_URL } from "./api";

export async function getTurmas() {
	const turmas = await fetch(`${API_URL}/turmas`);
	const turmasJson = await turmas.json();
	const turmasOrder = turmasJson.sort((a: any, b: any) => {
	const cursoCompare = a.curso.nome.localeCompare(b.curso.nome);

		if (cursoCompare !== 0) {
			return cursoCompare;
		}

		return a.nome.localeCompare(b.nome);
	});

	return turmasOrder;
}

export async function vincularTurmaDisciplina(turmaId: string, disciplinaId: string){

	console.log(disciplinaId, turmaId)
	
	const newVinculo = await fetch(`${API_URL}/turmas`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			turmaId,
			disciplinaId
		})
	})

	const resp = await newVinculo.json()
	return resp
}