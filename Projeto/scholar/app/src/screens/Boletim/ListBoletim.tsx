import { Text } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../../components/form/InputText";
import Header from "../../components/layout/Header";
import { global } from "../../styles/global";
import { Search } from "../../components/form/Search";


export default function ListBoletim() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header color="orangeColor" descriptionHeader="Pesquisar Boletim" titlePage="Boletim" userName="USER_NAME" nameScreenNow="boletim"/>
			<View style={global.bodyScroll}>
				<Search colorHeader="orangeColor" label="Pesquisar Boletim" placeHolder=""></Search>
				<ScrollView style={global.container} contentContainerStyle={global.scrollContent} showsVerticalScrollIndicator={false}>
					
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
