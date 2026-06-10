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

	const role = user?.usuario?.role || user?.role;

	useEffect(() => {
		if (role === "ALUNO") {
			setDisciplinas(user?.turma?.disciplinas || []);
		} else if (role === "PROFESSOR") {
			setDisciplinas(user?.disciplinas || []);
		} else {
			async function loadDisciplinas() {
				const listDisciplinas = await getDisciplinas();
				setDisciplinas(listDisciplinas);
			}

			loadDisciplinas();
		}
	}, [role]);

	function handleDisciplina(id: string, nome: string) {
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
			<Header
				color="purpleColor"
				descriptionHeader="Pesquisar Disciplina"
				titlePage="Disciplina"
				nameScreenNow="disciplina"
			/>

			<View
				style={[
					global.bodyScroll,
					{
						alignItems: "center",
					},
				]}
			>
				{(role === "PROFESSOR" || role === "ADMIN") && (
					<Search
						colorHeader="purpleColor"
						label="Pesquisar Disciplina"
						placeHolder="Desenvolvimento Mobile"
						value={search}
						onChangeText={setSearch}
					/>
				)}

				<ScrollView
					style={global.container}
					contentContainerStyle={global.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					{disciplinas.length > 0 ? (
						disciplinas.map((disciplina: any) => {
							const id =
								role === "ALUNO"
									? disciplina.disciplina.id
									: disciplina.id;

							const nome =
								role === "ALUNO"
									? disciplina.disciplina.nome
									: disciplina.nome;

							return (
								<TouchableOpacity
									key={id}
									style={{ width: "100%" }}
									onPress={() =>
										handleDisciplina(id, nome)
									}
								>
									<CardDisciplina
										nameDisciplina={nome}
									/>
								</TouchableOpacity>
							);
						})
					) : (
						<Text>
							Você não possui disciplinas cadastradas.
						</Text>
					)}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}