import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../styles/global";

export default function FormNewProfessor() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="greenColor" descriptionHeader="Cadastro de Professor" titlePage="Cadastro" userName="USER_NAME" nameScreenNow="professor"/>
			<View style={global.bodyScroll}>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					<InputText placeholder="Nome" textLabel="Nome do Professor" borderColor="greenColor" />
					<InputText placeholder="Titulação" textLabel="Titulação" borderColor="greenColor" />
					<InputText placeholder="Área de atuação" textLabel="Area de Atuação" borderColor="greenColor" />
					<InputText placeholder="10" textLabel="Tempo de docência" borderColor="greenColor" />
					<InputText placeholder="Email" textLabel="email@email.com" borderColor="greenColor" />
					<TouchableOpacity style={{ backgroundColor: "#00c14d", padding: 10, borderRadius: 5, marginTop: 10 }} >
						<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Cadastrar Professor</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
