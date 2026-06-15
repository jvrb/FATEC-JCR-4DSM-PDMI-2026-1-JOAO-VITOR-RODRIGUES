import { Text, View, StyleSheet } from "react-native";

interface CardAlunoTypes {
    email: string;
    matricula: {
        numero: string;
        curso: {
            nome: string
        }
    }
    turma: string;
    usuario: {
        nome: string;
        sobrenome: string
    }
}

export default function CardAluno({email, matricula, turma, usuario}: CardAlunoTypes){
    return (
        <View style={styles.cardAluno}>
            <Text>{usuario.nome} {usuario.sobrenome}</Text>
            <Text>Email: {email}</Text>
            <Text>Matricula: {matricula.numero}</Text>
            <Text>Curso: {matricula.curso.nome}</Text>
            <Text>Turma: {turma}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cardAluno: {
        width: "100%",
        borderColor: "#2577ff",
        borderWidth: 1,
        borderRadius: 4,
        padding: 15,
        marginBottom: 10
    }
})