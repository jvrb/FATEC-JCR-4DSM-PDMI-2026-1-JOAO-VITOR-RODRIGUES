import { StyleSheet, Text, TextInput, View } from "react-native";

interface IInputText {
	textLabel: string;
	placeholder: string;
}

export default function InputText(props: IInputText) {
	return (
		<View style={styles.inputContainer}>
			<Text style={styles.textLabel}>{props.textLabel}</Text>
			<TextInput placeholder={props.placeholder} style={styles.inputText} />
		</View>
	);
}

const styles = StyleSheet.create({
    inputContainer: {
        gap: 5
    },
    textLabel: {
        fontWeight: "bold"
    },
	inputText: {
		backgroundColor: "#f3f3f5",
		borderRadius: 5,
		padding: 10,
	},
});
