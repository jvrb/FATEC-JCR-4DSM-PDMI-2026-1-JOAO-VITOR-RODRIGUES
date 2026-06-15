import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { TouchableOpacity, View } from "react-native";
import CardMenu from "../../components/dashboard/CardMenu";
import { global } from "../../../../styles/global";
import { useAuth } from "../../hooks/useAuth";

export default function Index() {
	const { user } = useAuth();
	const role = user?.role || user?.usuario?.role;
	function goToFormNewBoletim() {
		return router.replace("/src/screens/Boletim/NewBoletim/Index");
	}

	function goToBoletim() {
		return router.replace("/src/screens/Boletim/ListBoletim/Index");
	}

	return (
		<SafeAreaView style={{flex: 1}}>
			<Header titlePage="Boletim" descriptionHeader="Selecione uma opção" color="orangeColor" nameScreenNow="" />
			<View style={{
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<View style={global.btnMenu}>
					{role === "PROFESSOR" && (
						<TouchableOpacity onPress={goToFormNewBoletim}>
							<CardMenu iconName="documentText" color="#ff6200" titleCard="Adicionar Boletim" descriptionCard="Adicione um boletim ao sistema" />
						</TouchableOpacity>
					)}
					<TouchableOpacity onPress={goToBoletim}>
						<CardMenu iconName="fileMultiple" color="#ff6200" titleCard="Listar Notas" descriptionCard="Verifique as notas cadastradas" />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}
