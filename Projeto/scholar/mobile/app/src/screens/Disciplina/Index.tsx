import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { TouchableOpacity, View } from "react-native";
import CardMenu from "../../components/dashboard/CardMenu";
import { global } from "../../../../styles/global";
import { useAuth } from "../../hooks/useAuth";

export default function Index() {
	function goToFormNewDisciplina() {
		return router.replace("/src/screens/Disciplina/FormNewDisciplina");
	}

	function goToListDisciplinas() {
		return router.replace("/src/screens/Disciplina/ListDisciplinas");
	}
	function goToVincularProfessor() {
		return router.replace("/src/screens/Disciplina/VincularProfessor");
	}
	function goToVincularTurmaDisciplina() {
		return router.replace("/src/screens/Disciplina/VincularTurmaDisciplina");
	}

	const {user} = useAuth()
	const role = user?.role || user?.usuario?.role;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header titlePage="Disciplinas" descriptionHeader="Selecione uma opção" color="purpleColor" nameScreenNow="" />
			<View style={{
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<View style={global.btnMenu}>
					{(role === "ADMIN") && 
					<TouchableOpacity onPress={goToFormNewDisciplina}>
						<CardMenu iconName="bookOpen" color="#a232ff" titleCard="Adicionar Diciplina" descriptionCard="Adicione disciplinas ao sistema" />
					</TouchableOpacity>}
					<TouchableOpacity onPress={goToListDisciplinas}>
						<CardMenu iconName="documentsAdd" color="#a232ff" titleCard="Listar Disciplinas" descriptionCard="Verifique as disciplinas cadastradas" />
					</TouchableOpacity>
					{(role === "ADMIN") && 
					<TouchableOpacity onPress={goToVincularProfessor}>
						<CardMenu iconName="documentsAdd" color="#a232ff" titleCard="Vincular Professor" descriptionCard="Vincule um professor a uma disciplina" />
					</TouchableOpacity>}

					{(role === "ADMIN") &&
					<TouchableOpacity onPress={goToVincularTurmaDisciplina}>
						<CardMenu iconName="documentsAdd" color="#a232ff" titleCard="Vincular Turma" descriptionCard="Vincule uma turma a uma disciplina" />
					</TouchableOpacity>}
				</View>
			</View>
		</SafeAreaView>
	);
}
