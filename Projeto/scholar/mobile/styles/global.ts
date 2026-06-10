import { StyleSheet } from "react-native";

export const global = StyleSheet.create({
	home: {
		flex: 1,
		width: "100%",
		backgroundColor: "#317aff",
		alignItems: "center",
	},

	body: {
		flex: 1,
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
	},

	bodyScroll: {
		flex: 1,
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 20,
		paddingBottom: 20
	},

	scrollContent: {
		paddingBottom: 20,
		width: "100%",
		padding: 20,
		alignItems: "center",
		flexGrow: 1
	},
});