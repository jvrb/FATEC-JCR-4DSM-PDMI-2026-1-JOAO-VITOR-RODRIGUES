import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface CardProfessorTypes {
    id: string;
	area: string;
	disciplinas: [];
	email: string;
	tempoDocencia: number;
	titulacao: string;
	usuario: {
		nome: string;
		sobrenome: string;
	};
	onEdit: (id: string, nome: string, email: string, titulacao: string, area: string, tempoDocencia: number) => void;
	onDelete: (id: string) => void;
}

export default function CardProfessor({ id, area, disciplinas, email, tempoDocencia, titulacao, usuario, onEdit, onDelete }: CardProfessorTypes) {
	return (
		<View style={styles.cardProfessor}>
			<View>
				<Text>
					{usuario.nome} {usuario.sobrenome}
				</Text>
				<Text>Email: {email}</Text>
				<Text>Area: {area}</Text>
				<Text>Disciplinas: {disciplinas.length > 0 ? disciplinas.map((disciplina: any) => <Text>{disciplina.nome}</Text>) : "Sem disciplinas"}</Text>
				<Text>Tempo Docencia: {tempoDocencia}</Text>
				<Text>Titulação: {titulacao}</Text>
			</View>

			<View style={styles.btns}>
				<TouchableOpacity onPress={() => onEdit(id, usuario.nome, email, titulacao, area, tempoDocencia )}>
					<FontAwesome name="edit" size={40} color="#317aff" />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => onDelete(id)}>
					<FontAwesome name="trash" size={40} color="#ff4d4f" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	cardProfessor: {
		borderColor: "#00c14d",
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
	},
    btns: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 50
    }
});
