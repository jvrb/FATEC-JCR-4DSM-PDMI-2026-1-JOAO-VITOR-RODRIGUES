import { Text } from "@react-navigation/elements";
import { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import { useAuth } from "../../hooks/useAuth";
import { API_URL } from "../../services/api";
import Toast from "react-native-toast-message";

export default function EditUsuario() {
	const [nome, setNome] = useState("");
	const [sobrenome, setSobrenome] = useState("");
	const [email, setEmail] = useState("");
	const [cep, setCep] = useState("");
	const [endereco, setEndereco] = useState("");
	const [cidade, setCidade] = useState("");
	const [estado, setEstado] = useState("");
	const [msgVerify, setMsgVerify] = useState("");
	const [titulacao, setTitulacao] = useState("");
	const [area, setArea] = useState("");
	const [tempoDocencia, setTempoDocencia] = useState("");
	const [estadosIBGE, setEstadosIBGE] = useState<any[]>([]);
	const [errorMsg, setErrorMsg] = useState<string>("");

	const { user } = useAuth();

	async function buscarCep(cep: string) {
		try {
			const cepLimpo = cep.replace(/\D/g, "");

			if (cepLimpo.length !== 8) return;

			const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

			const data = await response.json();

			if (data.erro) {
				setMsgVerify("CEP não encontrado");
				return;
			}

			setEndereco(data.logradouro);
			setCidade(data.localidade);
			setEstado(data.uf);
		} catch (error) {
			console.log(error);
			setMsgVerify("Erro ao consultar CEP");
		}
	}

	useEffect(() => {
		const cepLimpo = cep.replace(/\D/g, "");

		if (cepLimpo.length === 8) {
			buscarCep(cepLimpo);
		}
	}, [cep]);

	useEffect(() => {
		async function loadEstados() {
			const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");

			const data = await response.json();

			setEstadosIBGE(data);
		}

		async function loadInfoUser() {
			let usuario;
			let resp;
			if (user?.usuario.role === "ALUNO") {
				usuario = await fetch(`${API_URL}/aluno/${user?.usuario.id}`);
				resp = await usuario.json();
				setNome(resp.usuario.nome);
				setSobrenome(resp.usuario.sobrenome);
				setEmail(resp.usuario.email);
				setCep(resp.endereco.cep);
				setEndereco(resp.endereco.endereco);
				setCidade(resp.endereco.cidade);
				setEstado(resp.endereco.estado);
				console.log(resp);
			}
		}
		loadInfoUser();
		loadEstados();
	}, []);
    
    async function Signup() {
            try {
                if (!email) {
                    setErrorMsg("O email é obrigatório!");
                    return;
                }
    
                const usuario: any = await fetch(`${API_URL}/aluno/${user?.usuario.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome,
                        sobrenome,
                        email,
                        cep,
                        endereco,
                        cidade,
                        estado
                    }),
                });
				
				console.log({
                        nome,
                        sobrenome,
                        email,
                        cep,
                        endereco,
                        cidade,
                        estado
                    })
                const responseJson = await usuario.json();
    
                if (responseJson.messageError) {
                    Toast.show({
                        type: "error",
                        text1: "Erro",
                        text2: responseJson.messageError,
                    });
                    console.log(responseJson.messageError)
                }
    
                if (responseJson.messageSuccess) {
                    Toast.show({
						type: "success",
                        text1: "Sucess",
                        text2: "Usuario atualizado com sucesso",
					})
                }
            } catch (error: any) {
                console.log(error);
            }
		}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="blueColor" descriptionHeader="Cadastro de Aluno" titlePage="Cadastro" nameScreenNow="configAluno" />
			<View style={global.bodyScroll}>
				<ScrollView
					style={{
						width: "100%",
						maxWidth: 730, // opcional
						alignSelf: "center",
					}}
					contentContainerStyle={global.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					<Text>{msgVerify}</Text>
					<InputText placeholder="Nome" textLabel="Nome" borderColor="blueColor" value={nome} onChangeText={setNome} />
					<InputText placeholder="Sobrenome" textLabel="Sobrenome" borderColor="blueColor" value={sobrenome} onChangeText={setSobrenome} />
					<InputText placeholder="email@email.com" textLabel="Email" borderColor="blueColor" value={email} onChangeText={setEmail} />
					{user?.usuario.role === "ALUNO" && (
						<View style={{ width: "100%" }}>
							<InputText placeholder="12000-000" textLabel="CEP" borderColor="blueColor" value={cep} onChangeText={setCep} />
							<InputText placeholder="Rua José" textLabel="Endereço" borderColor="blueColor" value={endereco} onChangeText={setEndereco} />
							<InputText placeholder="Jacareí" textLabel="Cidade" borderColor="blueColor" value={cidade} onChangeText={setCidade} />
							<InputText placeholder="SP" textLabel="Estado" borderColor="blueColor" value={estado} onChangeText={setEstado} />
						</View>
					)}

					{user?.usuario.role === "PROFESSOR" && (
						<View>
							<InputText placeholder="Titulação" textLabel="Titulação" borderColor="blueColor" value={titulacao} onChangeText={setTitulacao} />
							<InputText placeholder="Area" textLabel="Area" borderColor="blueColor" value={area} onChangeText={setArea} />
							<InputText
								placeholder="Tempo Docência"
								textLabel="Tempo Docência"
								borderColor="blueColor"
								value={tempoDocencia}
								onChangeText={setTempoDocencia}
							/>
						</View>
					)}

					{user.usuario.role === "ALUNO" && (
						<TouchableOpacity style={{ backgroundColor: "#317aff", padding: 10, borderRadius: 5, marginTop: 10, width: "100%" }} onPress={Signup}>
							<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Atualizar Aluno</Text>
						</TouchableOpacity>
					)}
					{user.usuario.role === "PRFESSOR" && (
						<TouchableOpacity style={{ backgroundColor: "#317aff", padding: 10, borderRadius: 5, marginTop: 10, width: "100%" }}>
							<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Atualizar Professor</Text>
						</TouchableOpacity>
					)}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
