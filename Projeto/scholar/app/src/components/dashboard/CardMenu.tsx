import { View, StyleSheet, Text } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface ICardMenu {
    iconName: string,
    titleCard: string,
    descriptionCard: string,
    color: string
}

export default function CardMenu({iconName, titleCard, descriptionCard, color}: ICardMenu) {

    const icon:any = {
        userAdd: <AntDesign name="user-add" size={24} color="white" style={[styles.iconMenuItem, { backgroundColor: `${color}` }]} />,
        users: <Feather name="users" size={24} color="white" style={[styles.iconMenuItem, { backgroundColor: `${color}` }]} />,
        bookOpen: <Feather name="book-open" size={24} color="white" style={[styles.iconMenuItem, { backgroundColor: `${color}` }]} />,
        documentText: <Ionicons name="document-text-outline" size={24} color="white" style={[styles.iconMenuItem, { backgroundColor: `${color}` }]} />,
        documentsAdd: <Icon name="bookshelf" size={24} color="white" style={[styles.iconMenuItem, { backgroundColor: `${color}` }]}/>,
        fileMultiple: <Icon name="file-multiple" size={24} color="white" style={[styles.iconMenuItem, { backgroundColor: `${color}` }]} />
    }

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