import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { TouchableOpacity, View } from "react-native";
import CardMenu from "../../components/dashboard/CardMenu";
import { global } from "../../../../styles/global";
import { useAuth } from "../../hooks/useAuth";

export default function Index() {
	function goToFormNewCurso() {
		return router.replace("/src/screens/Cursos/FormNewCurso");
	}

	function goToListCursos() {
		return router.replace("/src/screens/Cursos/ListCursos");
	}

	const {user} = useAuth()

	return (
		<SafeAreaView>
			<Header titlePage="Cursos" descriptionHeader="Selecione uma opção" color="redColor" nameScreenNow="" />
			<View style={global.body}>
				<View style={global.btnMenu}>
					{(user.role === "ADMIN") &&
					<TouchableOpacity onPress={goToFormNewCurso}>
						<CardMenu iconName="plus" color="#ff0000" titleCard="Adicionar Curso" descriptionCard="Adicione um novo curso ao sistema" />
					</TouchableOpacity>}
					<TouchableOpacity onPress={goToListCursos}>
						<CardMenu iconName="list" color="#ff0000" titleCard="Listar Cursos" descriptionCard="Verifique os cursos cadastrados" />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}
