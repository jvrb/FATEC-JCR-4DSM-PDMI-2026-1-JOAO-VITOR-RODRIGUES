import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../styles/global";
import { Search } from "../../components/form/Search";


export default function ListDisciplinas() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="purpleColor" descriptionHeader="Pesquisar Disciplina" titlePage="Disciplina" userName="USER_NAME" nameScreenNow="disciplina"/>
			<View style={global.bodyScroll}>
				<Search colorHeader="purpleColor" label="Pesquisar Disciplina" placeHolder="Desenvolvimento Mobile"></Search>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
