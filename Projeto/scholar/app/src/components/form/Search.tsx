import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { global } from "../../styles/global";
import InputText from "./InputText";

type PropsInputSearch = {
	colorHeader: string;
	placeHolder: string;
	label: string;
};

export function Search({ colorHeader, placeHolder, label }: PropsInputSearch) {

	const colors: any = {
		blueColor: "#2577ff",
		greenColor: "#00c14d",
		purpleColor: "#a232ff",
		orangeColor: "#ff6200",
	};

	return (
		<View style={global.container}>
			<View style={styles.searchContainer}>
				<View style={styles.searchInput}>
					<InputText borderColor={colorHeader} placeholder={placeHolder} textLabel={label} />
				</View>
				<View style={[styles.searchButton, {borderColor: colors[colorHeader]}]}>
					<FontAwesome name="search" size={30} color={colors[colorHeader]} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	searchContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 5,
	},
	searchInput: {
		flex: 1,
	},
	searchButton: {
		paddingBlock: 4,
		paddingInline: 6,
		borderWidth: 1,
		borderRadius: 4,
	},
});
