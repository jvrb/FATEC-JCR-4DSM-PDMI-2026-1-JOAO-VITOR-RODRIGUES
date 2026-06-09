import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import { Search } from "../../components/form/Search";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import CardCurso from "../../components/curso/CardCurso";
import Toast from "react-native-toast-message";
import { Modal } from "react-native";

async function gatAllCursos() {
	const cursos = await fetch("http://localhost:3333/curso");
	const respJson = await cursos.json();

	return respJson;
}

async function deleteCurso(id: string) {
	const deleteCurso = await fetch(`http://localhost:3333/curso/${id}`, {
		method: "DELETE",
	});

	const respDelete = await deleteCurso.json();
	return respDelete;
}

async function editCurso(id: string, nome: string, semestre: number) {
	const editCurso = await fetch(`http://localhost:3333/curso/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			nome,
			semestre,
		}),
	});

	const respEdit = await editCurso.json();
	console.log(respEdit);
	return respEdit;
}

export default function ListCursos() {
	const [cursosMap, setCursosMap] = useState<[]>([]);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [cursoSelecionado, setCursoSelecionado] = useState<any>(null);
	const [nome, setNome] = useState<string>("");
	const [semestre, setSemestre] = useState("");

	const { user } = useAuth();

	console.log("Cheguei aqui: ", user);

	async function loadCursos() {
		const listCursos = await gatAllCursos();
		setCursosMap(listCursos);
	}

	useEffect(() => {
		if (user.role === "ADMIN") {
			loadCursos();
		}
	}, []);

	async function handleSaveEdit() {
		if (!cursoSelecionado) return;

		const cursoEdited = await editCurso(cursoSelecionado.id, nome, Number(semestre));

		if (cursoEdited) {
			await loadCursos();

			Toast.show({
				type: "success",
				text1: "SUCESSO",
				text2: "Curso atualizado com sucesso",
			});

			setModalVisible(false);
		}
	}

	async function handleDelete(id: string) {
		const cursoDeleted = await deleteCurso(id);

		console.log(cursoDeleted.messageError);

		if (cursoDeleted.messageSuccess) {
			Toast.show({
				type: "success",
				text1: "SUCESSO",
				text2: `${cursoDeleted.messageSuccess}`,
			});

			setCursosMap((prev: any) => prev.filter((curso: any) => curso.id !== id));
		}
	}

	function handleOpenModal(curso: any) {
		setCursoSelecionado(curso);

		setNome(curso.nome);
		setSemestre(curso.semestre.toString());

		setModalVisible(true);
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="redColor" descriptionHeader="Pesquisar Curso" titlePage="Curso" nameScreenNow="curso" />
			<View style={global.bodyScroll}>
				<Search colorHeader="redColor" label="Pesquisar Curso" placeHolder="Desenvolvimento de Software Multiplataforma"></Search>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					{cursosMap.length > 0 &&
						cursosMap.map((curso: any) => (
							<CardCurso
								id={curso.id}
								nome={curso.nome}
								semestre={curso.semestre}
								turmas={curso.turmas}
								onDelete={() => handleDelete(curso.id)}
								onEdit={() => handleOpenModal(curso)}
							/>
						))}
				</ScrollView>
			</View>
			<Modal visible={modalVisible} transparent animationType="fade">
				<View style={styles.overlay}>
					<View style={styles.modal}>
						<Text style={styles.title}>Editar Curso</Text>

						<TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome do Curso" />

						<TextInput style={styles.input} value={semestre} onChangeText={setSemestre} placeholder="Quantidade de Semestres" keyboardType="numeric" />

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
