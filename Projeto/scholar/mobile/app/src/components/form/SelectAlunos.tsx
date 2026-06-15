import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";

interface ISelectAlunos {
  value: string;
  onChange: (value: string) => void;
}

export default function SelectAlunos({ value, onChange }: ISelectAlunos) {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState("");

  useEffect(() => {
    async function loadAlunos() {
      try {
        const response = await fetch("http://localhost:3333/aluno");
        const data = await response.json();
        setAlunos(data);
      } catch (error) {
        console.log("Erro ao buscar alunos:", error);
      }
    }

    loadAlunos();
  }, []);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.textLabel}>Alunos</Text>

      <Picker
        selectedValue={value}
        style={styles.inputText}
        onValueChange={(itemValue) => {
          setAlunoSelecionado(itemValue);
          onChange(itemValue);
        }}
      >
        <Picker.Item label="Aluno" value="" />

        {alunos.map((data: any) => (
          <Picker.Item
            key={data.id}
            label={`${data.nome}`}
            value={data.id}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 5,
    marginTop: 10,
  },
  textLabel: {
    fontWeight: "bold",
  },
  inputText: {
    backgroundColor: "#f3f3f5",
    borderRadius: 5,
    padding: 10,
  },
});