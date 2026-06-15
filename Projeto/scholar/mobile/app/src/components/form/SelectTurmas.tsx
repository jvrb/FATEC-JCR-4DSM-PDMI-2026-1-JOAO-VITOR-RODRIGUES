import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { getTurmas } from "../../services/turmaService";

interface ISelecTurma {
    value: string;
    onChange: (value: string) => void;
}

export default function SelectTurmas({ value, onChange }: ISelecTurma) {
    const [turmas, setTurmas] = useState<[]>([])
	const [turmaSelecionada, setTurmaSelecionada] = useState("");

	useEffect(() => {
		async function loadTurmas() {
			const turmas = await getTurmas();
			setTurmas(turmas);
		}

		loadTurmas();
	}, []);

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.textLabel}>Turmas</Text>
			<Picker 
                selectedValue={value} 
                style={styles.inputText} 
                onValueChange={(itemValue) => {
                    setTurmaSelecionada(itemValue)
					onChange(itemValue);
				}}>

				<Picker.Item label="Turma" value=""/>

				{turmas.map((data: any) => (
					<Picker.Item key={data.id} label={`${data.nome} - ${data.curso.nome}`} value={data.id} />
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
