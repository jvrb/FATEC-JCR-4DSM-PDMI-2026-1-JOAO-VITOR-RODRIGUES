import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../styles/global";

export default function FormNewBoletim() {
	
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="orangeColor" descriptionHeader="Cadastro de Boletim" titlePage="Cadastro" userName="USER_NAME" nameScreenNow="boletim"/>
			<View style={global.bodyScroll}>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					<InputText placeholder="Desenvolvimento Mobile" textLabel="Disciplina" borderColor="orangeColor" />
					<InputText placeholder="10" textLabel="Nota 1" borderColor="orangeColor" />
					<InputText placeholder="10" textLabel="Nota 2" borderColor="orangeColor" />
					<InputText placeholder="10" textLabel="Média" borderColor="orangeColor" />
					<InputText placeholder="Aprovado" textLabel="Situação" borderColor="orangeColor" />
					<TouchableOpacity style={{ backgroundColor: "#ff6200", padding: 10, borderRadius: 5, marginTop: 10 }} >
						<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Cadastrar Disciplina</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
