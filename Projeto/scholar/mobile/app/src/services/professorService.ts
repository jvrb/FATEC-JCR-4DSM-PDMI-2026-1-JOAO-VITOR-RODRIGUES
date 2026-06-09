import { API_URL } from "./api";

export async function createProfessor(nome: string,sobrenome: string, titulacao: string, areaAtuacao: string, tempoDocencia: string, email: string){
    // { nome, sobrenome, email, password, titulacao, area, tempoDecencia }
    const docenciaConvert = Number(tempoDocencia)
    const newProfessor = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            sobrenome,
            email,
            titulacao,
            area: areaAtuacao,
            tempoDocencia: docenciaConvert
        })
    })

    const resp = await newProfessor.json()
    return resp
}

export async function getAllProfessores() {
	const professores = await fetch(`${API_URL}/professor`);
	const respJson = await professores.json();

	console.log(respJson);

	return respJson;
}