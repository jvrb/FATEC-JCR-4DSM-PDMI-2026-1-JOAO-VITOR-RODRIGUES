import { StyleSheet, Text, TextInput, View } from "react-native";

interface IInputText {
	textLabel: string;
	placeholder: string;
	borderColor: string;
}

export default function InputText({textLabel, placeholder, borderColor}: IInputText) {


	const borderColors: any = {
		blueColor: "#2577ff",
		greenColor: "#00c14d",
		purpleColor: "#a232ff",
		orangeColor: "#ff6200",
		off: "#f3f3f5"
	}

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.textLabel}>{textLabel}</Text>
			<TextInput placeholder={placeholder} style={[styles.inputText, { borderColor: borderColors[borderColor], borderWidth: 1}]}/>
		</View>
	);
}

const styles = StyleSheet.create({
    inputContainer: {
        gap: 5,
		marginTop: 10
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
