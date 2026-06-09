import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import { Search } from "../../components/form/Search";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import CardProfessor from "../../components/professor/CardProfessor";
import { Modal } from "react-native";
import Toast from "react-native-toast-message";
import * as professor from "../../services/professorService"


async function editProfessor(id: string, nome: string, email: string, titulacao: string, area: string, tempoDocencia: string) {
	const docenciaConvert = Number(tempoDocencia);
	const updateProfessor = await fetch(`http://localhost:3333/professor/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id,
			nome,
			email,
			titulacao,
			area,
			tempoDocencia: docenciaConvert,
		}),
	});

	const resp = await updateProfessor.json();
	return resp;
}

async function deleteProfessor(id: string){
	
}

export default function ListProfessores() {
	const [listProfessores, setListProfessores] = useState<any>({});
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [titulacao, setTitulacao] = useState("");
	const [area, setArea] = useState("");
	const [tempoDocencia, setTempoDocencia] = useState("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [professorSelecionado, setProfessorSelecionado] = useState<any>("");

	const { user } = useAuth();

	async function loadProfessores() {
		const buscaProfessores = await professor.getAllProfessores();
		setListProfessores(buscaProfessores);
	}

	async function handleDeleteProfessor(id: string) {}

	async function handleSaveEdit() {
		if (!professorSelecionado) return;

		// const { nome, email, titulacao, area, tempoDocencia } = req.body;
		const professorEdit = await editProfessor(professorSelecionado.id, nome, email, titulacao, area, tempoDocencia);

		if(professorEdit.messageSuccess){
			await loadProfessores()

			Toast.show({
				type: "success",
				text1: "SUCESSO",
				text2: `${professorEdit.messageSuccess}`
			})
		}
	}

	function handleOpenModal(professor: any) {
		setProfessorSelecionado(professor);
		setNome(professor.nome);
		setEmail(professor.email);
		setArea(professor.area);
		setTitulacao(professor.titulacao);
		setTempoDocencia(professor.tempoDocencia);

		setModalVisible(true);
	}

	useEffect(() => {
		if (user.role === "ADMIN") {
			loadProfessores();
		}
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="greenColor" descriptionHeader="Pesquisar Professor" titlePage="Professor" nameScreenNow="professor" />
			<View style={global.bodyScroll}>
				<Search colorHeader="greenColor" label="Pesquisar Professor" placeHolder="Andre"></Search>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					{listProfessores.length > 0 &&
						listProfessores.map((professor: any) => (
							<CardProfessor
								id={professor.id}
								area={professor.area}
								disciplinas={professor.disciplinas}
								email={professor.email}
								tempoDocencia={professor.tempoDocencia}
								titulacao={professor.titulacao}
								usuario={professor.usuario}
								onEdit={() => handleOpenModal(professor)}
								onDelete={() => handleDeleteProfessor(professor.id)}
							/>
						))}
				</ScrollView>
			</View>
			<Modal visible={modalVisible} transparent animationType="fade">
				<View style={styles.overlay}>
					<View style={styles.modal}>
						<Text style={styles.title}>Editar Curso</Text>

						<TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome do Professor" />

						<TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
						<TextInput style={styles.input} value={area} onChangeText={setArea} placeholder="Area" />
						<TextInput style={styles.input} value={titulacao} onChangeText={setTitulacao} placeholder="Titulação" />
						<TextInput style={styles.input} value={tempoDocencia} onChangeText={setTempoDocencia} placeholder="Tempo de Docencia" />

						<View style={styles.buttons}>
							<TouchableOpacity style={styles.btnSave} onPress={handleSaveEdit}>
								<Text style={styles.btnText}>Salvar</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.btnCancel} onPress={() => setModalVisible(false)}>
								<Text style={styles.btnText}>Cancelar</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},

	modal: {
		width: "85%",
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
		gap: 15,
	},

	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},

	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 5,
		padding: 10,
	},

	buttons: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	btnSave: {
		backgroundColor: "#317aff",
		padding: 10,
		borderRadius: 5,
		flex: 1,
		marginRight: 5,
	},

	btnCancel: {
		backgroundColor: "#ff4d4f",
		padding: 10,
		borderRadius: 5,
		flex: 1,
		marginLeft: 5,
	},

	btnText: {
		color: "#fff",
		textAlign: "center",
		fontWeight: "bold",
	},
});
