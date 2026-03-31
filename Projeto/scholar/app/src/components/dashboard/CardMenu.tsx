import { View, StyleSheet, Text } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

interface ICardMenu {
    iconName: string,
    titleCard: string,
    descriptionCard: string
}

export default function CardMenu({iconName, titleCard, descriptionCard}: ICardMenu) {

    const icon:any = {
        userAdd: <AntDesign name="user-add" size={24} color="white" style={[styles.iconMenuItem, { backgroundColor: "#2577ff" }]} />,
        users: <Feather name="users" size={24} color="white" style={[styles.iconMenuItem, { backgroundColor: "#00c14d" }]} />,
        bookOpen: <Feather name="book-open" size={24} color="white" style={[styles.iconMenuItem, { backgroundColor: "#a232ff" }]} />,
        documentText: <Ionicons name="document-text-outline" size={24} color="white" style={[styles.iconMenuItem, { backgroundColor: "#ff6200" }]} />
    }
    console.log(icon[iconName].icon)

	return (
		<View style={styles.cardBtn}>
			{icon[iconName]}
			<View style={{ flex: 1 }}>
				<Text style={{fontWeight: "bold"}}>{titleCard}</Text>
				<Text>{descriptionCard}</Text>
			</View>
			<AntDesign name="right" size={24} color="black" />
		</View>
	);
}


const styles = StyleSheet.create({
    cardBtn: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
		boxShadow: "1px 2px 5px #d3d3d3",
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
	},
    iconMenuItem: {
        padding: 15,
        borderRadius: 10,
        boxShadow: "1px 2px 5px #b3b3b3",
    }
})