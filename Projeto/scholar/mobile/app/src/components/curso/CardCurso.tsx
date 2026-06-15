import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface CardCursoTypes {
    id: string;
	nome: string;
	semestre: number;
	area: string,
	coordenador: string,
	turmas: [];
    onEdit: (id: string, nome: string, semestre: number) => void;
    onDelete: (id: string) => void;
}

export default function CardCurso({ id, nome, semestre, turmas,area, coordenador, onEdit, onDelete }: CardCursoTypes) {
	return (
		<View style={styles.cardCurso}>
			<View>
				<Text>{nome}</Text>
				<Text>Semestres: {semestre}</Text>
				<Text>Area: {area}</Text>
				<Text>Coordenador: {coordenador}</Text>
				<Text>
					Turmas:{" "}
					<Text style={styles.listTurmas}>
						{turmas.length > 0 ? turmas
                        .sort((a: any, b: any) => a.nome.localeCompare(b.nome))
                        .map((turma: any) => (
                            <View key={turma.id} >
                                <Text style={styles.turmas}>{turma.nome}</Text>
                            </View>
                        )) : "Sem turmas cadastradas"}
					</Text>
				</Text>
			</View>

			<View style={styles.btns}>
				<TouchableOpacity onPress={() => onEdit(id, nome, semestre)}>
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
	cardCurso: {
		borderColor: "#ff0000",
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	turmas: {
		justifyContent: "center",
		width: 50,
		padding: 2,
		backgroundColor: "grey",
		borderRadius: 5,
	},
	listTurmas: {
		display: "flex",
		gap: 5,
	},
    btns: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 50
    }
});
