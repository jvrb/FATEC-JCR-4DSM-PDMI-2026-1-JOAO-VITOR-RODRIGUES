import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { TouchableOpacity, View } from "react-native";
import CardMenu from "../../components/dashboard/CardMenu";
import { global } from "../../styles/global";

export default function Index() {

	function goToFormNewProfessor(){
		return router.replace("/src/screens/Professores/FormNewProfessor")
	}

	return (
		<SafeAreaView>
			<Header titlePage="Professores" descriptionHeader="Selecione uma opção" userName="USER_NAME" color="greenColor" nameScreenNow=""/>
			<View style={global.body}>
				<View style={global.btnMenu}>
					<TouchableOpacity onPress={goToFormNewProfessor}>
						<CardMenu iconName="userAdd" color="#00c14d" titleCard="Adicionar Professor" descriptionCard="Adicione Professor ao sistema"/>
					</TouchableOpacity>
					<CardMenu iconName="users" color="#00c14d" titleCard="Listar Professores" descriptionCard="Verifique os Professores cadastrados"/>
				</View>
			</View>
		</SafeAreaView>
	);
}