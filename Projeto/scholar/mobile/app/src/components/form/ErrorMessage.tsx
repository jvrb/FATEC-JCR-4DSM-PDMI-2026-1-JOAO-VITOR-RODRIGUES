import { StyleSheet, Text,  View } from "react-native";

interface IErrorMsg {
    msg: string
}

export default function ErrorMessage({msg}: IErrorMsg) {
	return (
		<View>
			<Text style={styles.textLabel}>{msg}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
    textLabel: {
        color:'red',
		textAlign: 'center'
    }
})
