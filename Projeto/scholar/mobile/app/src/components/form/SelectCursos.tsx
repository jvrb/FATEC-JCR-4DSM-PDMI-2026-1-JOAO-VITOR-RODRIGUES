import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { getAllCursos } from "../../services/CursoService";

interface ISelecCursos {
    value: string;
    onChange: (value: string) => void;
}

export default function SelectCursos({ value, onChange }: ISelecCursos) {
    const [cursos, setCursos] = useState<[]>([])
	const [cursoSelecionado, setCursoSelecionado] = useState("");

	useEffect(() => {
		async function loadCursos() {
			const cursos = await getAllCursos();
			setCursos(cursos);
		}
		loadCursos();
	}, []);

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.textLabel}>Cursos</Text>
			<Picker 
                selectedValue={value} 
                style={styles.inputText} 
                onValueChange={(itemValue) => {
                    setCursoSelecionado(itemValue)
					onChange(itemValue);
				}}>

				<Picker.Item label="Cursos" value=""/>

				{cursos.map((data: any) => (
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
