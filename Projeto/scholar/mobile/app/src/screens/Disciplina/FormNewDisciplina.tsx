import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import { useEffect, useState } from "react";
import SelectInput from "../../components/form/SelectInput";
import { getTurmas, vincularTurmaDisciplina } from "../../services/turmaService";
import ErrorMessage from "../../components/form/ErrorMessage";
import { createDisciplina, getDisciplinaById } from "../../services/disciplinaService";
import { getAllProfessores } from "../../services/professorService";
import { Picker } from "@react-native-picker/picker";
import SelectTurmas from "../../components/form/SelectTurmas";
import SelectProfessor from "../../components/form/SelectProfessor";
import Toast from "react-native-toast-message";

export default function FormNewDisciplina() {
	const [nomeDisciplina, setNomeDisciplina] = useState("");
	const [professores, setProfessores] = useState<[]>([]);
	const [professorSelecionado, setProfessorSelecionado] = useState("");
	const [turmaSelecionada, setTurmaSelecionada] = useState("");
	const [msgVerify, setMsgVerify] = useState("");

	async function handleSubmit(nome: string, professorId: string, turmaId: string) {
		setMsgVerify("");
		if (!nome) {
			setMsgVerify("Preencha o nome");
			return;
		}

		const newDisciplina = await createDisciplina({ nome, professorId });

		if (newDisciplina) {
			if (turmaSelecionada) {
				const disciplinaId = await getDisciplinaById(newDisciplina.id);

				console.log(disciplinaId)
				
				const newVinculo = await vincularTurmaDisciplina(turmaId, newDisciplina.id);

				console.log(newVinculo)
				
				if (newVinculo.messageSuccess) {
					Toast.show({
						type: "success",
						text1: "Sucesso",
						text2: "Disciplina criada com Sucesso",
					});
				}

				if (newVinculo.messageError) {
					Toast.show({
						type: "error",
						text1: "Erro",
						text2: "Erro ao criar disciplina",
					});
				}
			}

			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Disciplina criada com Sucesso",
			});
		}

		setNomeDisciplina("");
		setProfessorSelecionado("");
		setTurmaSelecionada("");
	}

	return (
		<SafeAreaView style={[styles.center, { flex: 1 }]}>
			<Header color="purpleColor" descriptionHeader="Cadastro de Disciplina" titlePage="Cadastro" nameScreenNow="disciplina" />
			<View style={[global.container, styles.formDisciplina]}>
				<InputText
					placeholder="Desenvolvimento Mobile"
					textLabel="Nome da Disciplina"
					borderColor="purpleColor"
					value={nomeDisciplina}
					onChangeText={setNomeDisciplina}
				/>

				<View>
					<SelectTurmas onChange={setTurmaSelecionada} value={turmaSelecionada} />
					<Text style={styles.obs}>Item não obrigatório, você podera vincular a turma a uma disciplina depois!</Text>

					<SelectProfessor onChange={setProfessorSelecionado} value={professorSelecionado} />
					<Text style={styles.obs}>Item não obrigatório, você podera vincular a turma a uma disciplina depois!</Text>
				</View>

				<TouchableOpacity
					style={{ backgroundColor: "#a232ff", padding: 10, borderRadius: 5, marginTop: 20, marginBottom: 20 }}
					onPress={() => handleSubmit(nomeDisciplina, professorSelecionado, turmaSelecionada)}
				>
					<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Cadastrar Curso</Text>
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
