import { Text, View, StyleSheet, Image, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";

import InputText from "../../components/form/InputText";
import InputSecurity from "../../components/form/InputSecurity";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import ErrorMessage from "../../components/form/ErrorMessage";
import SelectInput from "../../components/form/SelectInput";
import Toast from "react-native-toast-message";
import SelectCursos from "../../components/form/SelectCursos";

import { global } from "@/styles/global";

export async function getCursos() {
	const data = await fetch("http://localhost:3333/curso");
	const cursos = await data.json();
	console.log(cursos);
	return cursos;
}

export default function Index() {
	const [nome, setNome] = useState<string>("");
	const [sobrenome, setSobrenome] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [cep, setCep] = useState<string>("");
	const [endereco, setEndereco] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setconfirmPassword] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [curso, setCurso] = useState<string>("");
	const [cidade, setCidade] = useState<string>("");
	const [estado, setEsatdo] = useState("");
	const [msgVerify, setMsgVerify] = useState("");
	const [listCursos, setListCursos] = useState<[]>([]);
	const [estadosIBGE, setEstadosIBGE] = useState<any[]>([]);

	const { setUser, setToken } = useAuth();

	function goToDashboard() {
		return router.replace("../../../");
	}

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
		async function loadEstados() {
			const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");

			const data = await response.json();

			setEstadosIBGE(data);
		}

		loadEstados();
	}, []);

	useEffect(() => {
		const cepLimpo = cep.replace(/\D/g, "");

		if (cepLimpo.length === 8) {
			buscarCep(cepLimpo);
		}
	}, [cep]);

	useEffect(() => {
		async function loadCursos() {
			const cursos = await getCursos();
			setListCursos(cursos);
		}

		loadCursos();
	}, []);

	console.log(nome, sobrenome, curso, email, password, confirmPassword);

	async function Signup() {
		try {
			if (!email) {
				setErrorMsg("O email é obrigatório!");
				return;
			}

			if (!password) {
				setErrorMsg("A senha é obrigatória!");
				return;
			}

			if (password !== confirmPassword) {
				setErrorMsg("As senhas precisam ser iguais");
				return;
			}

			const usuario: any = await fetch("http://localhost:3333/aluno/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					nome,
					sobrenome,
					email,
					password,
					cursoId: curso,
					cep,
					endereco,
					cidade,
					estado
				}),
			});

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
				router.replace({
					pathname: "/",
					params: {
						messageSuccess: "true",
						messaage: responseJson.messageSuccess,
					},
				});
			}
		} catch (error: any) {
			console.log(error);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.imgLogo}>
					<FontAwesome name="graduation-cap" size={24} color="#317aff" />
				</View>

				<Text style={{ fontSize: 26, fontWeight: "bold", color: "#fff" }}>Sitema Acadêmico</Text>

				<Text style={{ fontSize: 14, textAlign: "center", color: "#fff" }}>Gestão Educacional</Text>
			</View>

			<ScrollView
				style={[global.bodyScroll, { width: "90%", marginBottom: 20 }]}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.loginContainer}>
					<Text
						style={{
							textAlign: "center",
							fontSize: 24,
							fontWeight: "bold",
						}}
					>
						Cadastre-se
					</Text>
					<InputText textLabel="Nome" placeholder="Digite seu nome" borderColor="off" value={nome} onChangeText={setNome} />

					<InputText textLabel="Sobrenome" placeholder="Digite seu sobrenome" borderColor="off" value={sobrenome} onChangeText={setSobrenome} />

					<SelectCursos value={curso} onChange={setCurso} />

					<InputText textLabel="Email" placeholder="Digite seu email" borderColor="off" value={email} onChangeText={setEmail} />

					<InputText textLabel="Cep" placeholder="Digite seu cep" borderColor="off" value={cep} onChangeText={setCep} />

					<InputText textLabel="Endereço" placeholder="Preenchido automaticamente" borderColor="off" value={endereco} onChangeText={setEndereco} />

					<InputText textLabel="Cidade" placeholder="Preenchido automaticamente" borderColor="off" value={cidade} onChangeText={setCidade} />

					<InputText textLabel="Estado" placeholder="Preenchido automaticamente" borderColor="off" value={estado} onChangeText={setEsatdo} />

					<InputSecurity textLabel="Senha" placeholder="Digite sua senha" value={password} onChangeText={setPassword} />

					<InputSecurity textLabel="Confirme a senha" placeholder="Confirme sua senha" value={confirmPassword} onChangeText={setconfirmPassword} />

					<Text>{msgVerify}</Text>
					<TouchableOpacity
						style={{
							backgroundColor: "#317aff",
							padding: 10,
							borderRadius: 5,
						}}
						onPress={Signup}
					>
						<Text
							style={{
								color: "#fff",
								fontWeight: "bold",
								textAlign: "center",
							}}
						>
							Cadastrar
						</Text>
					</TouchableOpacity>

					{errorMsg && <ErrorMessage msg={errorMsg} />}
				</View>

				<View style={styles.signup}>
					<Text>
						Já possui conta?
						<TouchableOpacity onPress={goToDashboard}>
							<Text style={styles.signupLink}> Login</Text>
						</TouchableOpacity>
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#317aff",
		flex: 1,
		alignItems: "center",
	},

	header: {
		height: "15%",
		justifyContent: "space-around",
		alignItems: "center",
		marginBottom: 20,
		marginTop: 20,
	},

	scrollContent: {
		alignItems: "center",
		paddingVertical: 20,
	},

	loginContainer: {
		backgroundColor: "#fff",
		width: "95%",
		borderRadius: 15,
		padding: 25,
		gap: 25,
	},

	imgLogo: {
		backgroundColor: "#fff",
		width: 70,
		height: 70,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},

	signup: {
		marginTop: 20,
		marginBottom: 20,
	},

	signupLink: {
		color: "#317aff",
		fontWeight: "bold",
	},
});
