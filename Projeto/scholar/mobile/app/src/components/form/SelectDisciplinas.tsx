import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { getAllDisciplinas } from "../../services/disciplinaService";

interface ISelecDisciplina {
    value: string;
    onChange: (value: string) => void;
}

export default function SelectDisciplinas({ value, onChange }: ISelecDisciplina) {
    const [disciplinas, setDisciplinas] = useState<[]>([])
	const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("");

	useEffect(() => {
		async function loadDisciplinas() {
			const disciplinas = await getAllDisciplinas();
			setDisciplinas(disciplinas);
		}

		loadDisciplinas();
	}, []);

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.textLabel}>Disciplinas</Text>
			<Picker 
                selectedValue={value} 
                style={styles.inputText} 
                onValueChange={(itemValue) => {
                    setDisciplinaSelecionada(itemValue)
					onChange(itemValue);
				}}>

				<Picker.Item label="Disciplinas" value=""/>

				{disciplinas.map((data: any) => (
					<Picker.Item key={data.id} label={data.nome} value={data.id} />
				))}
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		gap: 5,
		marginTop: 10,
	},
	textLabel: {
		fontWeight: "bold",
	},
	inputText: {
		backgroundColor: "#f3f3f5",
		borderRadius: 5,
		padding: 10,
	},
});
