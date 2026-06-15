import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { getAllProfessores } from "../../services/professorService";

interface ISelecTurma {
    value: string;
	onChange: (value: string) => void;
	label: string
}

export default function SelectProfessor({ value, onChange, label = "Professor" }: ISelecTurma) {
	const [professores, setProfessores] = useState<[]>([]);
	const [professorSelecionado, setProfessorSelecionado] = useState("");

	useEffect(() => {
		async function loadProfessor() {
			const professores = await getAllProfessores();
			setProfessores(professores);
		}

		loadProfessor();
	}, []);

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.textLabel}>{label}</Text>
			<Picker
				selectedValue={value}
				style={styles.inputText}
				onValueChange={(itemValue) => {
                    setProfessorSelecionado(itemValue)
					onChange(itemValue);
				}}
			>
				<Picker.Item label="Professor" value="" enabled={false}/>

				{professores.map((data: any) => (
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
