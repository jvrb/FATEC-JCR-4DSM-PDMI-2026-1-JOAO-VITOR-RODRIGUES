import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import { useState } from "react";
import Toast from "react-native-toast-message";
import * as professor from "../../services/professorService"


export default function FormNewProfessor() {
	const [nomeProfessor, setNomeProfessor] = useState<string>("")
	const [sobrenomeProfessor, setSobrenomeProfessor] = useState<string>("")
	const [titulacao, setTitulacao] = useState<string>("")
	const [areaAtuacao, setAreaAtuacao] = useState<string>("")
	const [tempoDocencia, setTempoDocencia] = useState<string>("")
	const [email, setEmail] = useState<string>("")

	async function handleSubmit(){
		const submit = await professor.createProfessor(nomeProfessor, sobrenomeProfessor, titulacao, areaAtuacao, tempoDocencia, email)

		if(submit.messageSuccess){
			Toast.show({
				type: "success",
				text1: "SUCESSO",
				text2: `${submit.messageSuccess}`
			})

			setNomeProfessor("")
			setSobrenomeProfessor("")
			setTitulacao("")
			setAreaAtuacao("")
			setTempoDocencia("")
			setEmail("")
		}
		if(submit.messageError){
			Toast.show({
				type: "error",
				text1: "ERRO",
				text2: `${submit.messageError}`
			})
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="greenColor" descriptionHeader="Cadastro de Professor" titlePage="Cadastro" nameScreenNow="professor" />
			<View style={[global.bodyScroll, {alignItems: "center"}]}>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					<InputText placeholder="Nome" textLabel="Nome do Professor" borderColor="greenColor" value={nomeProfessor} onChangeText={setNomeProfessor}/>
					<InputText placeholder="Sobrenome" textLabel="Sobrenome do Professor" borderColor="greenColor" value={sobrenomeProfessor} onChangeText={setSobrenomeProfessor}/>
					<InputText placeholder="Titulação" textLabel="Titulação" borderColor="greenColor" value={titulacao} onChangeText={setTitulacao}/>
					<InputText placeholder="Área de atuação" textLabel="Area de Atuação" borderColor="greenColor" value={areaAtuacao} onChangeText={setAreaAtuacao}/>
					<InputText placeholder="10" textLabel="Tempo de docência" borderColor="greenColor" value={tempoDocencia} onChangeText={setTempoDocencia}/>
					<InputText placeholder="Email" textLabel="email@email.com" borderColor="greenColor" value={email} onChangeText={setEmail}/>
					<TouchableOpacity style={{ backgroundColor: "#00c14d", padding: 10, borderRadius: 5, marginTop: 10 }} onPress={handleSubmit}>
						<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Cadastrar Professor</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
