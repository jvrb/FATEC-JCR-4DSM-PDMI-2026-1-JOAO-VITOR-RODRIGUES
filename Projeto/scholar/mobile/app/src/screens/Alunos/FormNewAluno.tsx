import { Text } from "@react-navigation/elements";
import { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";

export default function FormNewAluno() {
	const [nomeAluno, setNomeAluno] = useState("");
	const [sobrenome, setSobrenome] = useState("");
	const [curso, setCurso] = useState("");
	const [email, setEmail] = useState("");
	const [telefone, setTelefone] = useState("");
	const [cep, setCep] = useState("");
	const [endereco, setEndereco] = useState("");
	const [cidade, setCidade] = useState("");
	const [numeroCasa, setNumeroCasa] = useState("");
	const [estado, setEsatdo] = useState("");
	const [msgVerify, setMsgVerify] = useState("");
	const [estadosIBGE, setEstadosIBGE] = useState<any[]>([]);

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
			setEsatdo(data.uf);
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

		loadEstados();
	}, []);

	
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="blueColor" descriptionHeader="Cadastro de Aluno" titlePage="Cadastro" nameScreenNow="aluno" />
			<View style={global.bodyScroll}>
				<ScrollView style={{width: "100%",
                maxWidth: 730, // opcional
                alignSelf: "center"}}contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					<Text>{msgVerify}</Text>
					<InputText placeholder="Nome" textLabel="Nome do Aluno" borderColor="blueColor" value={nomeAluno} onChangeText={setNomeAluno} />
					<InputText placeholder="Desenvolvimento de Software" textLabel="Curso" borderColor="blueColor" value={curso} onChangeText={setCurso} />
					<InputText placeholder="email@email.com" textLabel="Email" borderColor="blueColor" value={email} onChangeText={setEmail} />
					<InputText placeholder="(12)00000-0000" textLabel="Telefone" borderColor="blueColor" value={telefone} onChangeText={setTelefone} />
					<InputText placeholder="12000-000" textLabel="CEP" borderColor="blueColor" value={cep} onChangeText={setCep}/>
					<InputText placeholder="Rua José" textLabel="Endereço" borderColor="blueColor" value={endereco} onChangeText={setEndereco} />
					<InputText placeholder="Jacareí" textLabel="Cidade" borderColor="blueColor" value={cidade} onChangeText={setCidade} />
					<InputText placeholder="65" textLabel="Numero" borderColor="blueColor" value={numeroCasa} onChangeText={setNumeroCasa} />
					<InputText placeholder="SP" textLabel="Estado" borderColor="blueColor" value={estado} onChangeText={setEsatdo} />
					<TouchableOpacity style={{ backgroundColor: "#317aff", padding: 10, borderRadius: 5, marginTop: 10 }}>
						<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Cadastrar Aluno</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
