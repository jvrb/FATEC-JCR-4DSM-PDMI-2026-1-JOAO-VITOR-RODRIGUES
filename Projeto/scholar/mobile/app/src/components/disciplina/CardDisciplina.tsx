import { Text, View, StyleSheet } from "react-native";

interface CardDisciplinaTypes {
    nameDisciplina: string;
}

export default function CardDisciplina({nameDisciplina}: CardDisciplinaTypes){
    return (
        <View style={styles.cardDisiciplina}>
            <Text>{nameDisciplina}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cardDisiciplina: {
        width: "100%",
        borderColor: "#a232ff",
        borderWidth: 1,
        borderRadius: 4,
        padding: 10
    }
})