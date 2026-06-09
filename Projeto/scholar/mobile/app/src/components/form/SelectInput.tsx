import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";

interface ISelectInput {
	datas: [];
	textLabel: string;
    value: string;
    onChange: (value: string) => void;
}

export default function SelectInput({ datas, textLabel, value, onChange }: ISelectInput) {
	const [cursoId, setCursoId] = useState("");

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.textLabel}>{textLabel}</Text>
			<Picker
				selectedValue={cursoId}
				style={styles.inputText}
				onValueChange={(itemValue) => {
					onChange(itemValue);
				}}
			>
				<Picker.Item label={textLabel} value={value} />

				{datas.map((data: any) => (
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
