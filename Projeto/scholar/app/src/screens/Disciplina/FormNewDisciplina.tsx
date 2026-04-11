import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../styles/global";

export default function FormNewDisciplina() {
	
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="purpleColor" descriptionHeader="Cadastro de Disciplina" titlePage="Cadastro" userName="USER_NAME" nameScreenNow="disciplina"/>
			<View style={global.bodyScroll}>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					<InputText placeholder="Desenvolvimento Mobile" textLabel="Nome da Disciplina" borderColor="purpleColor" />
					<InputText placeholder="60" textLabel="Carga Horária" borderColor="purpleColor" />
					<InputText placeholder="Andre" textLabel="Professor responsável" borderColor="purpleColor" />
					<InputText placeholder="Desenvolvimento de Software" textLabel="Curso" borderColor="purpleColor" />
					<InputText placeholder="4" textLabel="Semestre" borderColor="purpleColor" />
					<TouchableOpacity style={{ backgroundColor: "#a232ff", padding: 10, borderRadius: 5, marginTop: 10 }} >
						<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Cadastrar Disciplina</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
