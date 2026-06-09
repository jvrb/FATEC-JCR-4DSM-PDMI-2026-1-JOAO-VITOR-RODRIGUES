import { Text, View, StyleSheet, Image, TextInput, Button, TouchableOpacity } from "react-native";
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
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setconfirmPassword] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [curso, setCurso] = useState<string>("");
	const [listCursos, setListCursos] = useState<[]>([]);

	const { setUser, setToken } = useAuth();

	const handleNome = (text: string) => {
		setNome(text);
		setErrorMsg("");
	};
	const handleSobrenome = (text: string) => {
		setSobrenome(text);
		setErrorMsg("");
	};
	const handleEmail = (text: string) => {
		setEmail(text);
		setErrorMsg("");
	};
	const handlePassword = (text: string) => {
		setPassword(text);
		setErrorMsg("");
	};
	const handleConfirmPassword = (text: string) => {
		setconfirmPassword(text);
		setErrorMsg("");
	};

	function goToDashboard() {
		return router.replace("../../../");
	}

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
				}),
			});

			const responseJson = await usuario.json();

			if (responseJson.messageError) {
				Toast.show({
					type: "error",
					text1: "Erro",
					text2: responseJson.messageError,
				});
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
			<View style={styles.loginContainer}>
				<Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>Cadastre-se</Text>
				<InputText textLabel="Nome" placeholder="Digite seu nome" borderColor="off" value={nome} onChangeText={handleNome} />

				<InputText textLabel="Sobrenome" placeholder="Digite seu sobrenome" borderColor="off" value={sobrenome} onChangeText={handleSobrenome} />

				<SelectCursos value={curso} onChange={setCurso}/>


				<InputText textLabel="Email ou Login" placeholder="Digite seu email ou login" borderColor="off" value={email} onChangeText={handleEmail} />

				<InputSecurity textLabel="Senha" placeholder="Digite sua senha" value={password} onChangeText={handlePassword} />

				<InputSecurity textLabel="Confime a senha" placeholder="Confime sua senha" value={confirmPassword} onChangeText={handleConfirmPassword} />

				<TouchableOpacity style={{ backgroundColor: "#317aff", padding: 10, borderRadius: 5 }} onPress={Signup}>
					<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Cadastrar</Text>
				</TouchableOpacity>

				{errorMsg && <ErrorMessage msg={errorMsg} />}
			</View>
			<View style={styles.signup}>
				<Text>
					Já possui conta?
					<TouchableOpacity onPress={() => goToDashboard()}>
						<Text style={styles.signupLink}>Login</Text>
					</TouchableOpacity>
				</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#317aff",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loginContainer: {
		backgroundColor: "#fff",
		width: "80%",
		borderRadius: 15,
		padding: 25,
		gap: 25,
	},
	header: {
		height: "15%",
		justifyContent: "space-around",
		alignItems: "center",
		marginBottom: 40,
		marginTop: -70,
	},
	imgLogo: {
		backgroundColor: "#fff",
		width: 70,
		height: 70,
		padding: 10,
		borderRadius: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	signup: {
		marginTop: 30,
	},
	signupLink: {
		color: "#fff",
		marginLeft: 5,
	},
});
