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

	function goToDisciplinas(){
		return router.replace("/src/screens/Disciplina/Index")
	}

	function goToBoletim(){
		return router.replace("/src/screens/Boletim/Index")
	}

	return (
		<SafeAreaView style={global.home}>
			<Header titlePage="Bem-Vindo!" descriptionHeader="Seja Bem-Vindo" userName="USER_NAME" color="blueColor" nameScreenNow="home"/>
			<View style={global.body}>
				<View style={global.btnMenu}>
					<TouchableOpacity onPress={goToAlunos}>
						<CardMenu iconName="userAdd" titleCard="Alunos" descriptionCard="Gerenciar informações de alunos" color="#2577ff" />
					</TouchableOpacity>
					<TouchableOpacity onPress={goToProfessores}>
						<CardMenu iconName="users" titleCard="Professores" descriptionCard="Gerenciar informações de Professores" color="#00c14d"/>
					</TouchableOpacity>
					<TouchableOpacity onPress={goToDisciplinas}>
						<CardMenu iconName="bookOpen" titleCard="Disciplinas" descriptionCard="Gerenciar disciplinas" color="#a232ff" />
					</TouchableOpacity>
					<TouchableOpacity onPress={goToBoletim}>
						<CardMenu iconName="documentText" titleCard="Boletim" descriptionCard="Visualizar notas e situação"  color="#ff6200"/>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

