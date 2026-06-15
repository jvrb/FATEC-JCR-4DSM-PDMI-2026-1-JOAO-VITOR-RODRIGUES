import { Text } from "@react-navigation/elements";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/layout/Header";
import { global } from "../../../../../styles/global";
import { useState } from "react";
import ErrorMessage from "../../../components/form/ErrorMessage";
import SelectAlunos from "../../../components/form/SelectAlunos";
import SelectDisciplinas from "../../../components/form/SelectDisciplinas";
import InputText from "../../../components/form/InputText";
import Toast from "react-native-toast-message";

export default function FormNewBoletim() {
  const [alunoSelecionado, setAlunoSelecionado] = useState("");
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("");

  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");

  const [msgVerify, setMsgVerify] = useState("");

  async function handleSubmit() {
    setMsgVerify("");

    if (!alunoSelecionado || !disciplinaSelecionada) {
      setMsgVerify("Selecione aluno e disciplina");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/boletim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alunoId: alunoSelecionado,
          disciplinaId: disciplinaSelecionada,
          nota1: Number(nota1),
          nota2: Number(nota2),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMsgVerify(data.message || "Erro ao criar boletim");
        return;
      }

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Boletim criado com sucesso",
      });

      setAlunoSelecionado("");
      setDisciplinaSelecionada("");
      setNota1("");
      setNota2("");
    } catch (error) {
      setMsgVerify("Erro na conexão com servidor");
    }
  }

  return (
    <SafeAreaView style={[styles.center, { flex: 1 }]}>
      <Header
        color="orangeColor"
        descriptionHeader="Cadastro de Boletim"
        titlePage="Cadastro de Boletim"
        nameScreenNow="boletim"
      />

      <View style={[global.container, styles.form]}>
    
        <SelectAlunos
          value={alunoSelecionado}
          onChange={setAlunoSelecionado}
        />

        <SelectDisciplinas
          value={disciplinaSelecionada}
          onChange={setDisciplinaSelecionada}
        />

        <View style={styles.inputContainer}>
          <InputText
            placeholder="Digite a nota 1"
            value={nota1}
            onChangeText={setNota1}
			borderColor="#ff6200"
			textLabel="Nota 1"
          />
        </View>

        <View style={styles.inputContainer}>
          <InputText
            placeholder="Digite a nota 2"
            value={nota2}
            onChangeText={setNota2}
			borderColor="#ff6200"
			textLabel="Nota 2"
          />
        </View>

        {/* ====================== */}
        {/* BOTÃO */}
        {/* ====================== */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
            Cadastrar Boletim
          </Text>
        </TouchableOpacity>

        {/* ====================== */}
        {/* ERRO */}
        {/* ====================== */}
        {msgVerify && <ErrorMessage msg={msgVerify} />}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
  },
  inputContainer: {
    gap: 5,
    marginTop: 10,
  },
  textLabel: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ff6200",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});