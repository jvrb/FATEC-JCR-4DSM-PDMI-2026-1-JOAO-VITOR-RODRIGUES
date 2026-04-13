import { StyleSheet } from "react-native";

export const global = StyleSheet.create({
    home: {
		height: "100%",
		width: "100%",
		backgroundColor: "#317aff",
		alignItems: "center",
	},
    body: {
		height: "100%",
		width: "100%",
		backgroundColor: "#fff",
		alignItems: "center",
	},
	btnMenu: {
		width: "90%",
		marginTop: -10,
		gap: 10,
	},
	container: {
		width: "90%",
		height: "30%",
	},
	bodyScroll: {
		flex: 1,
		width: "100%",
		backgroundColor: "#fff",
		alignItems: "center",
	},
	scrollContent: {
		flexGrow: 1,
		paddingBottom: 20,
	},
})