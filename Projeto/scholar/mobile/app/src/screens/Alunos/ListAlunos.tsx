import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import { Search } from "../../components/form/Search";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import CardAluno from "../../components/aluno/CardAluno";

async function gatAllAlunos() {
	const alunos = await fetch("http://localhost:3333/aluno")
	const respJson = await alunos.json()

	return respJson
}

export default function ListAlunos() {

	const [alunosMap, setAlunosMap] = useState<[]>([])

	const { user } = useAuth() 

	console.log("Cheguei aqui: ",user)

	useEffect(() => {
		if(user.role === "ADMIN"){
			async function loadAlunos() {
				const listAlunos = await gatAllAlunos()

				console.log(listAlunos)
				setAlunosMap(listAlunos)
			}

			loadAlunos()
		}
	}, [])

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="blueColor" descriptionHeader="Pesquisar Aluno" titlePage="Aluno" nameScreenNow="aluno" />
			<View style={global.bodyScroll}>
				<Search colorHeader="blueColor" label="Pesquisar Aluno" placeHolder="Andre"></Search>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>

				{alunosMap.length > 0 && (alunosMap.map((aluno: any) => (
					<CardAluno 
						email={aluno.email}
						matricula={aluno.matricula}
						turma={aluno.turma}
						usuario={aluno.usuario}
					/>
				)))}	

				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
