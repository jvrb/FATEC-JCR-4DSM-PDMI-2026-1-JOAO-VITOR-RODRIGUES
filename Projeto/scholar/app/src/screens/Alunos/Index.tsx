import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { global } from "../../styles/global";

export default function Index() {
	function returnIndex() {
		return router.replace("/src/screens/Dashboard");
	}

	return (
		<SafeAreaView>
			<Header titlePage="Alunos" descriptionHeader="Selecione uma opção" userName="USER_NAME" />
		</SafeAreaView>
	);
}
