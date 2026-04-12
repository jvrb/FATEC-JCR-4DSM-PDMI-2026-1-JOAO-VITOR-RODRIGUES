import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IHeader {
	titlePage: string;
	descriptionHeader: string;
	userName: string;
	color: string;
	nameScreenNow: string
}

export default function Header({ titlePage, descriptionHeader, userName, color, nameScreenNow }: IHeader) {

	function backFrom() {
		if(nameScreenNow == "aluno") {
			return router.replace("/src/screens/Alunos/Index")
		}else if(nameScreenNow == "professor"){
			return router.replace("/src/screens/Professores/Index")
		}else if(nameScreenNow == "disciplina"){
			return router.replace("/src/screens/Disciplina/Index")
		}else if(nameScreenNow == "boletim"){
			return router.replace("/src/screens/Boletim/Index")
		}else if(nameScreenNow == "home"){
			return router.replace("/")
		}

		return router.replace("/src/screens/Dashboard");
	}

	const colors: any = {
		blueColor: "#2577ff",
		greenColor: "#00c14d",
		purpleColor: "#a232ff",
		orangeColor: "#ff6200",
	};

	return (
		<View style={[styles.body, { backgroundColor: colors[color] }]}>
			<View style={styles.header}>
				<View style={styles.userAction}>
					<View style={styles.headerBtn}>
						<FontAwesome name="graduation-cap" size={20} color="white" />
					</View>
					<View style={styles.userContainer}>
						<Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>Sistema Acadêmico</Text>
						<Text style={{ fontWeight: 300, fontSize: 14, color: "#fff" }}>{userName}</Text>
					</View>
					<TouchableOpacity style={styles.headerBtn} onPress={backFrom}>
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
	},
});
