import { Text } from "@react-navigation/elements";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import SelectProfessor from "../../components/form/SelectProfessor";

async function handleSubmit(nomeCurso: string, semestre: string, area: string, coordenador: string) {
	const semestreNumber = Number(semestre);
	if (semestreNumber <= 0) {
		return Toast.show({
			type: "error",
			text1: "Erro",
			text2: "Número de semestres inválido",
		});
	}

	if (isNaN(semestreNumber))
		return Toast.show({
			type: "error",
			text1: "Erro",
			text2: "Erro ao converter os semestres",
		});

	console.log(nomeCurso, semestreNumber);
	try {
		const createNewCurso = await fetch("http://localhost:3333/curso", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nome: nomeCurso,
				semestre: semestreNumber,
				area: area,
				coordenadorId: coordenador,
			}),
		});

		const respJson = await createNewCurso.json();
		console.log(respJson);

		return respJson;
	} catch (error) {
		Toast.show({
			type: "error",
			text1: "Erro",
			text2: "Não foi possível conectar ao servidor",
		});
	}
}

export default function FormNewCurso() {
	const [nomeCurso, setNomeCurso] = useState("");
	const [semestreCurso, setSemestreCurso] = useState("");
	const [areaCurso, setAreaCurso] = useState("");
	const [msgVerify, setMsgVerify] = useState("");
	const [coordenador, setCoordenador] = useState("");

	async function createCurso() {
		if (!nomeCurso || !semestreCurso) {
			setMsgVerify("Inserira todos os dados");
			return;
		}
		if (areaCurso === "") {
			setMsgVerify("Selecione a area do curso");
			return;
		}
		const newCurso = await handleSubmit(nomeCurso, semestreCurso, areaCurso, coordenador);

		if (newCurso.messageError) {
			Toast.show({
				type: "error",
				text1: "ERRO",
				text2: `Não foi possivel cadastrar o curso!`,
			});
		}
		if (newCurso.messageSuccess) {
			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Curso cadastrado com sucesso!",
			});

			setNomeCurso("");
			setSemestreCurso("");
			setAreaCurso("");
			setCoordenador("");
		}

		setMsgVerify("");
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="redColor" descriptionHeader="Cadastro de Curso" titlePage="Cadastro" nameScreenNow="curso" />
			<View
				style={{
					flex: 1,
					width: "100%",
					alignItems: "center",
				}}
			>
				<ScrollView style={{ width: "95%" }} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					<Text>{msgVerify}</Text>
					<InputText placeholder="Nome" textLabel="Nome do Curso" borderColor="redColor" value={nomeCurso} onChangeText={setNomeCurso} />
					<InputText placeholder="Semestres" textLabel="Semestre" borderColor="redColor" value={semestreCurso} onChangeText={setSemestreCurso} />
					<View style={styles.selectArea}>
						<Text style={{ fontWeight: "bold", marginBottom: 5 }}>Area:</Text>
						<Picker
							selectedValue={areaCurso}
							style={styles.inputText}
							onValueChange={(itemValue) => {
								setAreaCurso(itemValue);
							}}
						>
							<Picker.Item label="SELECIONE A AREA" value="" />
							<Picker.Item label="TECNOLOGIA" value="TECNOLOGIA" />
							<Picker.Item label="SAÚDE" value="SAÚDE" />
							<Picker.Item label="ENGENHARIA" value="ENGENHARIA" />
							<Picker.Item label="GESTÃO" value="GESTÃO" />
							<Picker.Item label="HUMANAS" value="HUMANAS" />
							<Picker.Item label="HUMANAS" value="HUMANAS" />
						</Picker>
					</View>
					<SelectProfessor value={coordenador} onChange={setCoordenador} label="Coordenador"/>
					<TouchableOpacity style={{ backgroundColor: "#ff0000", padding: 10, borderRadius: 5, marginTop: 10 }} onPress={createCurso}>
						<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Cadastrar Curso</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		gap: 5,
		marginTop: 10,
	},
	textLabel: {
		fontWeight: "bold",
	},
	inputText: {
		backgroundColor: "#f3f3f5",
		borderColor: "red",
		borderRadius: 5,
		padding: 10,
	},
	selectArea: {
		width: "100%",
		textAlign: "left",
		fontWeight: "bold",
		marginTop: 8,
	},
});
