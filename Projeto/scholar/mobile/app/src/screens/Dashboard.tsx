import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardMenu from "./../components/dashboard/CardMenu";
import Header from "./../components/layout/Header";
import { global } from "../../../styles/global";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function Dashboard() {
	const { user } = useAuth();
	const role = user?.role || user?.usuario?.role;

	useEffect(() => {
		if(!user) {
			backFromHome()
		}
	}, [])

	function backFromHome() {
		return router.replace("/");
	}

	function goToAlunos() {
		return router.replace("/src/screens/Alunos/Index");
	}

	function goToProfessores() {
		return router.replace("/src/screens/Professores/Index");
	}

	function goToDisciplinas() {
		return router.replace("/src/screens/Disciplina/Index");
	}

	function goToBoletim() {
		return router.replace("/src/screens/Boletim/Index");
	}
	function goToCurso() {
		return router.replace("/src/screens/Cursos/Index");
	}
	function goToConfigAluno(){
		return router.replace("/src/screens/Usuario/EditUsario");
	}

	return (
		<SafeAreaView style={global.home}>
			<Header titlePage="Bem-Vindo!" descriptionHeader="Seja Bem-Vindo" color="blueColor" nameScreenNow="home" />
			<View style={global.body}>
				<View style={global.btnMenu}>
					{(role === "ADMIN") && (<TouchableOpacity onPress={goToAlunos}>
						<CardMenu iconName="userAdd" titleCard="Alunos" descriptionCard="Gerenciar informações de alunos" color="#2577ff" />
					</TouchableOpacity>)}
					{(role === "ALUNO") && (<TouchableOpacity onPress={goToConfigAluno}>
						<CardMenu iconName="userAdd" titleCard="Aluno" descriptionCard="Gerenciar informações de alunos" color="#2577ff" />
					</TouchableOpacity>)}
					{(role === "ADMIN") && (
						<TouchableOpacity onPress={goToProfessores}>
							<CardMenu iconName="users" titleCard="Professores" descriptionCard="Gerenciar informações de Professores" color="#00c14d" />
						</TouchableOpacity>
					)}
					<TouchableOpacity onPress={goToDisciplinas}>
						<CardMenu iconName="bookOpen" titleCard="Disciplinas" descriptionCard="Gerenciar disciplinas" color="#a232ff" />
					</TouchableOpacity>
					<TouchableOpacity onPress={goToBoletim}>
						<CardMenu iconName="documentText" titleCard="Boletim" descriptionCard="Visualizar notas e situação" color="#ff6200" />
					</TouchableOpacity>
					{(role === "ADMIN") && (
					<TouchableOpacity onPress={goToCurso}>
						<CardMenu iconName="graduationCap" titleCard="Cursos" descriptionCard="Visualizar Cursos" color="#ff0000" />
					</TouchableOpacity>)}
				</View>
			</View>
		</SafeAreaView>
	);
}
