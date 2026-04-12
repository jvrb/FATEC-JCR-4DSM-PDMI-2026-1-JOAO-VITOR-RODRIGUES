import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { TouchableOpacity, View } from "react-native";
import CardMenu from "../../components/dashboard/CardMenu";
import { global } from "../../styles/global";

export default function Index() {

	function goToFormNewAluno(){
        return router.replace("/src/screens/Alunos/FormNewAluno")
    }

	return (
		<SafeAreaView>
			<Header titlePage="Alunos" descriptionHeader="Selecione uma opção" userName="USER_NAME" color="blueColor" nameScreenNow=""/>
			<View style={global.body}>
				<View style={global.btnMenu}>
					<TouchableOpacity onPress={goToFormNewAluno}>
						<CardMenu iconName="userAdd" color="#2577ff" titleCard="Adicionar Aluno" descriptionCard="Adicione alunos ao sistema"/>
					</TouchableOpacity>
					<CardMenu iconName="users" color="#2577ff" titleCard="Listar Alunos" descriptionCard="Verifique os alunos cadastrados"/>
				</View>
			</View>
		</SafeAreaView>
	);
}
