import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../styles/global";

export default function FormNewAluno() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="blueColor" descriptionHeader="Cadastro de Aluno" titlePage="Cadastro" userName="USER_NAME" nameScreenNow="aluno"/>
			<View style={global.bodyScroll}>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					<InputText placeholder="Nome" textLabel="Nome do Aluno" borderColor="blueColor" />
					<InputText placeholder="Matrícula" textLabel="Matrícula" borderColor="blueColor" />
					<InputText placeholder="Desenvolvimento de Software" textLabel="Curso" borderColor="blueColor" />
					<InputText placeholder="email@email.com" textLabel="Email" borderColor="blueColor" />
					<InputText placeholder="(12)00000-0000" textLabel="Telefone" borderColor="blueColor" />
					<InputText placeholder="12000-000" textLabel="CEP" borderColor="blueColor" />
					<InputText placeholder="Rua José" textLabel="Endereço" borderColor="blueColor" />
					<InputText placeholder="Jacareí" textLabel="Cidade" borderColor="blueColor" />
					<InputText placeholder="SP" textLabel="Estado" borderColor="blueColor" />
					<TouchableOpacity style={{ backgroundColor: "#317aff", padding: 10, borderRadius: 5, marginTop: 10 }} >
						<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Cadastrar Aluno</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
