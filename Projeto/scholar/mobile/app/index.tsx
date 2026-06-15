import { Text, View, StyleSheet, Image, TextInput, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { useAuth } from "./src/hooks/useAuth";

import InputText from "./src/components/form/InputText";
import InputSecurity from "./src/components/form/InputSecurity";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import ErrorMessage from "./src/components/form/ErrorMessage";
import Toast from "react-native-toast-message";

async function generateToken(email: string, password: string) {
	const usuario: any = await fetch("http://localhost:3333/user/validate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	const responseJson = await usuario.json();
	console.log("Funcao validate User: ", responseJson)
	return responseJson;
}

async function authorizationUser(token: string) {
	console.log("Token authorizationUser", token)
	const authorization = await fetch("http://localhost:3333/auth", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	console.log("Authorization: ", authorization)
	const dataJson = await authorization.json();
	console.log("Authorization Token", dataJson)
	return dataJson
}

export default function Index() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("")
	const [userValidate, setUserValidate] = useState<any>({});
	const [userAuthorization, setUserAuthorization] = useState<any>({})

	const { setUser, setToken } = useAuth();
	const { messageSuccess, message } = useLocalSearchParams();

	const handleEmail = (text: string) => {
		setEmail(text);
		setErrorMsg("");
	};
	const handlePassword = (text: string) => {
		setPassword(text);
		setErrorMsg("");
	};

	function goToSignup() {
		return router.replace("/src/screens/Signup/Index");
	}

	useEffect(() => {
		if (messageSuccess === "true") {
			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: `${message}`,
			});
		}
	}, [messageSuccess]);

	async function AuthApp() {
		try {

			if (!email) {
				setErrorMsg("O email é obrigatório!");
				return;
			}

			if (!password) {
				setErrorMsg("A senha é obrigatória!");
				return;
			}

			const tokenUser = await generateToken(email, password)
			
			if (tokenUser.message) {
				setErrorMsg(tokenUser.message);
				return
			}
			
			if (tokenUser.token) {
				const userAuthorization = await authorizationUser(tokenUser.token)

				if(userAuthorization.message){
					setErrorMsg(userAuthorization.message)
					return
				}

				setUser(userAuthorization);
				setToken(userValidate.token);


				return router.replace("/src/screens/Dashboard");
			}
		} catch (error: any) {
			console.log(error.message);
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
				<Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>Bem-vindo</Text>
				<InputText textLabel="Email ou Login" placeholder="Digite seu email ou login" borderColor="off" value={email} onChangeText={handleEmail} />
				<InputSecurity textLabel="Senha" placeholder="Digite sua senha" value={password} onChangeText={handlePassword} />
				<TouchableOpacity style={{ backgroundColor: "#317aff", padding: 10, borderRadius: 5 }} onPress={AuthApp}>
					<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Entrar</Text>
				</TouchableOpacity>
				{errorMsg && <ErrorMessage msg={errorMsg} />}
			</View>
			<View style={styles.signup}>
				<Text>
					Não possui conta?
					<TouchableOpacity onPress={() => goToSignup()}>
						<Text style={styles.signupLink}>Cadastre-se</Text>
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
