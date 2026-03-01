import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function Index() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [saveMsg, setSaveMsg] = useState<string>();

	function saveInfo() {
		setSaveMsg(`${email} - ${password} - ${confirmPassword}`);
	}

	return (
		<View style={styles.container}>
			<View style={styles.main}>
        <Text style={{color: '#abb251', fontWeight: "bold"}}>CADASTRO</Text>
				<StatusBar hidden={true} />
				<View style={styles.inputWraper}>
					<Text style={{ color: "white" }}>Email</Text>
					<TextInput
						style={styles.inputText}
						placeholder="Digite seu nome..."
						autoCapitalize="none"
						autoComplete="email"
						autoCorrect={false}
						keyboardType="email-address"
						value={email}
						onChangeText={setEmail}
					/>
				</View>
				<View style={styles.inputWraper}>
					<Text style={{ color: "white" }}>Senha</Text>
					<TextInput
						style={styles.inputText}
						placeholder="Digite sua Senha..."
						value={password}
						onChangeText={setPassword}
						secureTextEntry={true}
						maxLength={8}
					/>
				</View>
				<View style={styles.inputWraper}>
					<Text style={{ color: "white" }}>Confirmação da Senha</Text>
					<TextInput
						style={styles.inputText}
						placeholder="Confirme sua Senha..."
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry={true}
						maxLength={8}
					/>
				</View>
				<View style={styles.containerBtn}>
					<TouchableOpacity style={styles.btnSave} onPress={saveInfo}>
						<Text style={{ color: "#000", fontWeight: "bold"}}>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btnCadastro} onPress={saveInfo}>
						<Text style={{ color: "#000", fontWeight: "bold"}}>Cadastre-se</Text>
					</TouchableOpacity>
				</View>
				<Text style={{ color: "#fff" }}>{saveMsg}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
		justifyContent: "center",
    backgroundColor: "#161616",
  },
	main: {
		maxWidth: 320,
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		borderWidth: 1,
		borderColor: "#515151",
    borderRadius: 8,
    padding: 20
	},
	inputWraper: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		gap: 4,
	},
	inputText: {
		backgroundColor: "#fff",
		padding: 4,
		borderRadius: 4,
		height: 40,
	},
	btnSave: {
		height: 40,
		backgroundColor: "#f7b20f",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		padding: 20,
	},
	btnCadastro: {
		height: 40,
		backgroundColor: "#f7b20f",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		padding: 20,
	},
	containerBtn: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
	},
});
