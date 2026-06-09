import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import { Search } from "../../components/form/Search";
import CardDisciplina from "../../components/disciplina/CardDisciplina";
import { useAuth } from "../../hooks/useAuth";
import { router } from "expo-router";
import { use, useEffect, useState } from "react";

async function getDisciplinas() {
	const discilinas = await fetch("http://localhost:3333/disciplina/");
	const disciplinasJson = await discilinas.json();

	return disciplinasJson;
}

export default function ListDisciplinas() {
	const [disciplinas, setDisciplinas] = useState<[]>([]);
	const { user } = useAuth();
	console.log(user)

	useEffect(() => {
		if (user?.disciplinas) {
			setDisciplinas(user.disciplinas);
		} else {
			async function loadDisciplinas() {
				const listDisciplinas = await getDisciplinas()

				setDisciplinas(listDisciplinas)

				console.log(listDisciplinas)
			}

			loadDisciplinas()
		}
	}, []);

	console.log(disciplinas)

	function handleDisciplina(id: string, nome: string) {
		console.log("Cliquei na disciplina: ", nome);
		router.push({
			pathname: "/src/screens/Disciplina/DisciplinaDetails",
			params: {
				disciplinaId: id,
				nameDisciplina: nome,
			},
		});
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="purpleColor" descriptionHeader="Pesquisar Disciplina" titlePage="Disciplina" nameScreenNow="disciplina" />
			<View style={global.bodyScroll}>
				{(user.usuario.role === "PROFESSOR") && (<Search colorHeader="purpleColor" label="Pesquisar Disciplina" placeHolder="Desenvolvimento Mobile"></Search>)}
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					{(disciplinas.length > 0 ) ? (
						disciplinas.map((disciplina: any) => (
							<TouchableOpacity onPress={() => handleDisciplina(disciplina.id, disciplina.nome)}>
								<CardDisciplina nameDisciplina={disciplina.nome} />
							</TouchableOpacity>
						))
					) : (
						<Text>Você não possui disciplinas cadastradas.</Text>
					)}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
