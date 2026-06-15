import { API_URL } from "./api";

interface IDadosAlunoTypes {
	nomeAluno: string;
	sobrenome: string
	curso: string;
	email: string;
	telefone: string;
	cep: string;
	endereco: string;
	cidade: string;
	numeroCasa: string;
	estado: string;
}

export async function createAluno({ nomeAluno, sobrenome,curso, email, telefone, cep, endereco, numeroCasa, estado }: IDadosAlunoTypes) {

	const passwordDefaul = "senhaUsuarioPadrao";

	const newAluno = await fetch(`${API_URL}/alunos`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			nome: nomeAluno,
			sobrenome:sobrenome,
			email: email,
			password: passwordDefaul,
			cursoId: curso
		})
	})

}
