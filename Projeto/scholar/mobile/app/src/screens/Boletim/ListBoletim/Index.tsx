import { Text } from "@react-navigation/elements";
import { ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/layout/Header";
import { global } from "../../../../../styles/global";
import { Search } from "../../../components/form/Search";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

export default function ListBoletim() {
  const [boletins, setBoletins] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const { user } = useAuth();

  // =========================
  // CARREGAR BOLETINS
  // =========================
  async function loadBoletins() {
    try {
      const response = await fetch("http://localhost:3333/boletim");
      const data = await response.json();
      setBoletins(data);
    } catch (error) {
      console.log("Erro ao buscar boletins:", error);
    }
  }

  useEffect(() => {
    loadBoletins();
  }, []);

  // =========================
  // FILTRO POR USUÁRIO (ALUNO)
  // =========================
  const boletinsDoUsuario = boletins.filter((item) => {
    if (user?.usuario?.role === "ALUNO") {
      return item.aluno?.usuarioId === user.usuario.id;
    }

    return true; // professor/admin vê tudo
  });

  // =========================
  // FILTRO DE BUSCA
  // =========================
  const finalBoletins = boletinsDoUsuario.filter((item) => {
    const aluno = item.aluno?.nome?.toLowerCase() || "";
    const disciplina = item.disciplina?.nome?.toLowerCase() || "";

    return (
      aluno.includes(search.toLowerCase()) ||
      disciplina.includes(search.toLowerCase())
    );
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        color="orangeColor"
        descriptionHeader="Pesquisar Boletim"
        titlePage="Boletim"
        nameScreenNow="boletim"
      />

      <View style={global.bodyScroll}>

        {/* ========================= */}
        {/* SEARCH */}
        {/* ========================= */}
        {user?.usuario?.role === "PROFESSOR" && (
          <Search
            colorHeader="orangeColor"
            label="Pesquisar Boletim"
            placeHolder="Aluno ou disciplina"
            value={search}
            onChangeText={setSearch}
          />
        )}

        {/* ========================= */}
        {/* LISTA */}
        {/* ========================= */}
        <ScrollView
          style={global.container}
          contentContainerStyle={global.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {finalBoletins.length > 0 ? (
            finalBoletins.map((item) => {
              const media = (item.nota1 + item.nota2) / 2;

              return (
                <View key={item.id} style={styles.card}>
                  <Text style={styles.title}>
                    {item.aluno?.nome} - {item.disciplina?.nome}
                  </Text>

                  <Text style={styles.text}>Nota 1: {item.nota1}</Text>
                  <Text style={styles.text}>Nota 2: {item.nota2}</Text>

                  <Text style={styles.media}>
                    Média: {media.toFixed(1)}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Nenhum boletim encontrado para este usuário.
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// =========================
// STYLES
// =========================
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
  media: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#ff6200",
  },
});