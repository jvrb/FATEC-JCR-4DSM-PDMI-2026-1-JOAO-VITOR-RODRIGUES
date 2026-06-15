import { Text } from "@react-navigation/elements";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Toast from "react-native-toast-message";

import Header from "../../components/layout/Header";
import SelectAlunos from "../../components/form/SelectAlunos";
import SelectTurmas from "../../components/form/SelectTurmas";

import { global } from "../../../../styles/global";
import { API_URL } from "../../services/api";

export default function VincularAlunoTurma() {
	const [alunoSelecionado, setAlunoSelecionado] = useState("");
	const [turmaSelecionada, setTurmaSelecionada] = useState("");

	async function handleSubmit() {
		try {
			if (!alunoSelecionado) {
				Toast.show({
					type: "error",
					text1: "Erro",
					text2: "Selecione um aluno",
				});
				return;
			}

			if (!turmaSelecionada) {
				Toast.show({
					type: "error",
					text1: "Erro",
					text2: "Selecione uma turma",
				});
				return;
			}

			const response = await fetch(`${API_URL}/aluno/vincular-turma/${alunoSelecionado}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					alunoId: alunoSelecionado,
					turmaId: turmaSelecionada,
				}),
			});

			const data = await response.json();

			if (data.messageSuccess) {
				Toast.show({
					type: "success",
					text1: "Sucesso",
					text2: data.messageSuccess,
				});

				setAlunoSelecionado("");
				setTurmaSelecionada("");
			}

			if (data.messageError) {
				Toast.show({
					type: "error",
					text1: "Erro",
					text2: data.messageError,
				});
			}
		} catch (error) {
			console.log(error);

			Toast.show({
				type: "error",
				text1: "Erro",
				text2: "Erro ao conectar com o servidor",
			});
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="blueColor" descriptionHeader="Vincular Aluno à Turma" titlePage="Turmas" nameScreenNow="aluno" />

			<View
				style={{
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<View
					style={{
						width: "90%",
					}}
				>
					<SelectAlunos value={alunoSelecionado} onChange={setAlunoSelecionado} />

					<SelectTurmas value={turmaSelecionada} onChange={setTurmaSelecionada} />

					<TouchableOpacity style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Vincular Aluno</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#2577ff",
		padding: 12,
		borderRadius: 5,
		marginTop: 20,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
	},
});
