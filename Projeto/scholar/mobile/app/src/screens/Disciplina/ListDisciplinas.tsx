import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { global } from "../../../../styles/global";
import { Search } from "../../components/form/Search";
import CardDisciplina from "../../components/disciplina/CardDisciplina";
import { useAuth } from "../../hooks/useAuth";
import { router } from "expo-router";
import { useEffect, useState } from "react";

async function getDisciplinas() {
	const response = await fetch("http://localhost:3333/disciplina/");
	const data = await response.json();
	return data;
}

export default function ListDisciplinas() {
	const [disciplinas, setDisciplinas] = useState<any[]>([]);
	const [search, setSearch] = useState("");
	const { user } = useAuth();

	useEffect(() => {
		if (user?.disciplinas) {
			setDisciplinas(user.disciplinas);
		} else {
			async function loadDisciplinas() {
				const listDisciplinas = await getDisciplinas();
				setDisciplinas(listDisciplinas);
			}

			loadDisciplinas();
		}
	}, []);

	function handleDisciplina(id: string, nome: string) {
		router.push({
			pathname: "/src/screens/Disciplina/DisciplinaDetails",
			params: {
				disciplinaId: id,
				nameDisciplina: nome,
			},
		});
	}

	const role = user?.usuario?.role || user?.role;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="purpleColor" descriptionHeader="Pesquisar Disciplina" titlePage="Disciplina" nameScreenNow="disciplina" />

			<View style={global.bodyScroll}>
				{/* SEARCH SÓ PARA PROFESSOR E ADMIN */}
				{(role === "PROFESSOR" || role === "ADMIN") && (
					<Search colorHeader="purpleColor" label="Pesquisar Disciplina" placeHolder="Desenvolvimento Mobile" value={search} onChangeText={setSearch} />
				)}

				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					{disciplinas.length > 0 ? (
						disciplinas.map((disciplina: any) => (
							<TouchableOpacity key={disciplina.id} onPress={() => handleDisciplina(disciplina.id, disciplina.nome)}>
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
