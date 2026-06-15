import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/form/ErrorMessage";
import SelectProfessor from "../../components/form/SelectProfessor";
import Toast from "react-native-toast-message";
import SelectDisciplinas from "../../components/form/SelectDisciplinas";
import { vincularProfessorDisciplina } from "../../services/disciplinaService";

export default function VincularProfessor() {
	const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("");
	const [professorSelecionado, setProfessorSelecionado] = useState("");
	const [msgVerify, setMsgVerify] = useState("");

	async function handleSubmit(disciplinaId: string, professorId: string) {
		setMsgVerify("");

		const newDisciplina = await vincularProfessorDisciplina(disciplinaId, professorId );

		if (newDisciplina.messageSuccess) {
			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Disciplina vinculada com Sucesso",
			});
		}

		setDisciplinaSelecionada("");
		setProfessorSelecionado("");
	}

	return (
		<SafeAreaView style={[styles.center, { flex: 1 }]}>
			<Header color="purpleColor" descriptionHeader="Vincule um professor a uma disciplina" titlePage="Vincular Proferssor" nameScreenNow="disciplina" />
			<View style={[global.container, styles.formDisciplina]}>
				<SelectDisciplinas value={disciplinaSelecionada} onChange={setDisciplinaSelecionada} />

				<SelectProfessor onChange={setProfessorSelecionado} value={professorSelecionado} />

				<TouchableOpacity
					style={{ backgroundColor: "#a232ff", padding: 10, borderRadius: 5, marginTop: 20, marginBottom: 20 }}
					onPress={() => handleSubmit(disciplinaSelecionada, professorSelecionado)}
				>
					<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Vincular Professor</Text>
				</TouchableOpacity>

				{msgVerify && <ErrorMessage msg={msgVerify} />}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	formDisciplina: {
		justifyContent: "center",
	},
	center: {
		alignItems: "center",
	},
	obs: {
		fontSize: 12,
	},
	inputContainer: {
		gap: 5,
		marginTop: 10,
	},
	textLabel: {
		fontWeight: "bold",
	},
	inputText: {
		backgroundColor: "#f3f3f5",
		borderRadius: 5,
		padding: 10,
	},
});
