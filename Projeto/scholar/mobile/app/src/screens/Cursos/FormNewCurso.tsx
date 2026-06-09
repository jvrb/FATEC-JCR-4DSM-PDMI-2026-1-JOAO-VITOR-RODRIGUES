import { Text } from "@react-navigation/elements";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import Toast from "react-native-toast-message";

async function handleSubmit(nomeCurso: string, semestre: string){
	const semestreNumber = Number(semestre)

	if(isNaN(semestreNumber)) return Toast.show({
		type: "error",
		text1: "Erro",
		text2: "Erro ao converter os semestres"
	})

	console.log(nomeCurso, semestreNumber)
	const createNewCurso = await fetch("http://localhost:3333/curso", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			nome: nomeCurso,
			semestre: semestreNumber
		})
	})

	const respJson = await createNewCurso.json()
	console.log(respJson)

	return respJson
}

export default function FormNewCurso() {
	const [nomeCurso, setNomeCurso] = useState("");
	const [semestreCurso, setSemestreCurso] = useState("")
	const [msgVerify, setMsgVerify] = useState("");


	async function createCurso(){
		if(!nomeCurso || !semestreCurso){
			setMsgVerify("Inserira todos os dados")
			return
		}
		const newCurso = await handleSubmit(nomeCurso, semestreCurso)

		if(newCurso.messageError){
			Toast.show({
				type: "error",
				text1: "ERRO",
				text2: `Não foi possivel cadastrar o curso!`
			})
		}
		if(newCurso.messageSuccess){
			Toast.show({
				type: "success",
				text1: "Sucesso",
				text2: "Curso cadastrado com sucesso!"
			})

			setNomeCurso("")
			setSemestreCurso("")
		}

		setMsgVerify("")
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="redColor" descriptionHeader="Cadastro de Curso" titlePage="Cadastro" nameScreenNow="curso" />
			<View style={global.bodyScroll}>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					<Text>{msgVerify}</Text>
					<InputText placeholder="Nome" textLabel="Nome do Curso" borderColor="redColor" value={nomeCurso} onChangeText={setNomeCurso}/>
					<InputText placeholder="Semestres" textLabel="Semestre" borderColor="redColor" value={semestreCurso} onChangeText={setSemestreCurso}/>
					<TouchableOpacity style={{ backgroundColor: "#ff0000", padding: 10, borderRadius: 5, marginTop: 10 }} onPress={createCurso}>
						<Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Cadastrar Curso</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
