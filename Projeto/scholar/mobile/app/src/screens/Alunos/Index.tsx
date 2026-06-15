import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { TouchableOpacity, View } from "react-native";
import CardMenu from "../../components/dashboard/CardMenu";
import { global } from "../../../../styles/global";
import { useAuth } from "../../hooks/useAuth";

export default function Index() {
	function goToFormNewAluno() {
		return router.replace("/src/screens/Alunos/FormNewAluno");
	}

	function goToListAlunos() {
		return router.replace("/src/screens/Alunos/ListAlunos");
	}
	function goToVincularAluno() {
		return router.replace("/src/screens/Alunos/VincularAlunoTurma");
	}

	const { user } = useAuth();
	const role = user?.role || user?.usuario?.role;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header titlePage="Alunos" descriptionHeader="Selecione uma opção" color="blueColor" nameScreenNow="" />
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<View style={global.btnMenu}>
					{role === "ADMIN" && (
						<TouchableOpacity onPress={goToFormNewAluno}>
							<CardMenu iconName="userAdd" color="#2577ff" titleCard="Adicionar Aluno" descriptionCard="Adicione alunos ao sistema" />
						</TouchableOpacity>
					)}

					{role === "ADMIN" && (
						<TouchableOpacity onPress={goToListAlunos}>
							<CardMenu iconName="users" color="#2577ff" titleCard="Listar Alunos" descriptionCard="Verifique os alunos cadastrados" />
						</TouchableOpacity>
					)}
					{role === "ADMIN" && (
						<TouchableOpacity onPress={goToVincularAluno}>
							<CardMenu iconName="users" color="#2577ff" titleCard="Vincular Aluno" descriptionCard="Vincule o aluno a uma disciplina" />
						</TouchableOpacity>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
}
