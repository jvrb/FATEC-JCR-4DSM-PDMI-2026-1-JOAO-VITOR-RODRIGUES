import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import CardDisciplina from "../../components/disciplina/CardDisciplina";
import { useAuth } from "../../hooks/useAuth";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

async function getTurmasByDisciplina(id:string){ 
	const data = await fetch(`http://localhost:3333/disciplina/${id}`)
	const dataJson = await data.json()

	return dataJson
}

export default function ListDisciplinas() {
	const { user } = useAuth();
	const {disciplinaId, nameDisciplina} = useLocalSearchParams()

	const [turmas, setTurmas] = useState<any[]>([])
	const [messageError, setMessageError] = useState<string>("")

	useEffect(() => {
		async function loadTurmas() {
			const data = await getTurmasByDisciplina(disciplinaId.toString())

			console.log(!!data.message)
			if(!!data.message) {
				setMessageError(data.message)
			}else{
				setTurmas(data)
			}
		}

		loadTurmas()
	}, [])
	console.log(messageError)
	// console.log(turmas)


	function handleDisciplina(id: string) {
		console.log("Cliquei na disciplina: ", id);
		router.push({
			pathname: "/src/screens/Disciplina/DisciplinaDetails",
			params: {
				disciplinaId: id,
			},
		});
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="purpleColor" descriptionHeader={nameDisciplina.toString()} titlePage="Turmas da Disciplina" nameScreenNow="disciplina" />
			<View style={global.bodyScroll}>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					{messageError && <Text>{messageError}</Text>}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
