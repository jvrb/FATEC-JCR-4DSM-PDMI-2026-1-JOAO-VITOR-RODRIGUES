import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { global } from "../../styles/global";

interface IHeader {
	titlePage: string;
	descriptionHeader: string;
	userName: string;
}

function backFromHome() {
	return router.replace("/");
}

export default function Header({ titlePage, descriptionHeader, userName }: IHeader) {
	return (
		<View style={styles.body}>
			<View style={styles.header}>
				<View style={styles.userAction}>
					<View style={styles.headerBtn}>
						<FontAwesome name="graduation-cap" size={20} color="white" />
					</View>
					<View style={styles.userContainer}>
						<Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>Sistema Acadêmico</Text>
						<Text style={{ fontWeight: 300, fontSize: 14, color: "#fff" }}>{userName}</Text>
					</View>
					<TouchableOpacity style={styles.headerBtn} onPress={backFromHome}>
						<FontAwesome name="sign-out" size={20} color="white" />
					</TouchableOpacity>
				</View>
				<View>
					<Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>{titlePage}</Text>
					<Text style={{ fontSize: 14, fontWeight: 300, color: "#fff" }}>{descriptionHeader}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	userContainer: {
		flex: 1,
	},
	userAction: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
	},
	headerBtn: {
		backgroundColor: "rgba(255,255,255, 0.15)",
		display: "flex",
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	header: {
		width: "90%",
		height: 150,
		display: "flex",
		justifyContent: "space-evenly",
	},
	body: {
		width: "100%",
		alignItems: "center",
		backgroundColor: "#317aff",
	}
});
