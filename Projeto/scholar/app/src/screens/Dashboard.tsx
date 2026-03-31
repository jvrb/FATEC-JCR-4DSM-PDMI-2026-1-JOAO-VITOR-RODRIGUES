import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardMenu from "./../components/dashboard/CardMenu";
import Header from "./../components/layout/Header";
import { global } from "../styles/global";

export default function Dashboard() {
	function backFromHome() {
		return router.replace("/");
	}

	function goToAlunos() {
		return router.replace("/src/screens/Alunos/Index");
	}

	function goToProfessores() {
		return router.replace("/src/screens/Professores/Index");
	}

	return (
		<SafeAreaView style={global.container}>
			<Header titlePage="Bem-Vindo!" descriptionHeader="Seja Bem-Vindo" userName="USER_NAME" />
			<View style={styles.body}>
				<View style={styles.btnMenu}>
					<TouchableOpacity onPress={goToAlunos}>
						<CardMenu iconName="userAdd" titleCard="Alunos" descriptionCard="Gerenciar informações de alunos" />
					</TouchableOpacity>
					<TouchableOpacity onPress={goToProfessores}>
						<CardMenu iconName="users" titleCard="Professores" descriptionCard="Gerenciar informações de Professores" />
					</TouchableOpacity>
					<CardMenu iconName="bookOpen" titleCard="Disciplinas" descriptionCard="Gerenciar disciplinas" />
					<CardMenu iconName="documentText" titleCard="Boletim" descriptionCard="Visualizar notas e situação" />
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	body: {
		height: "100%",
		width: "100%",
		backgroundColor: "#fff",
		alignItems: "center",
	},
	btnMenu: {
		width: "90%",
		marginTop: -10,
		gap: 10,
	},
});
