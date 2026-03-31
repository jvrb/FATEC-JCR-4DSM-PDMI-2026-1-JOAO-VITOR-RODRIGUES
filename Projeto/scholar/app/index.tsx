import { Text, View, StyleSheet, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputText from "./src/components/form/InputText";
import InputSecurity from "./src/components/form/InputSecurity";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Index() {

  function AuthApp () {
    return router.replace("/src/screens/Dashboard")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imgLogo} >
          <FontAwesome name="graduation-cap" size={24} color="#317aff" />
        </View>
        <Text style={{fontSize: 26, fontWeight: "bold", color: "#fff"}}>Sitema Acadêmico</Text>
        <Text style={{fontSize: 14, textAlign: "center", color: "#fff"}}>Gestão Educacional</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={{textAlign: "center", fontSize: 24, fontWeight: "bold"}}>Bem-vindo</Text>
        <InputText textLabel="Email ou Login" placeholder="Digite seu email ou login"/>
        <InputSecurity textLabel="Senha" placeholder="Digite sua senha"/>
        <TouchableOpacity style={{backgroundColor: "#317aff", padding: 10, borderRadius: 5}} onPress={AuthApp}>
          <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#317aff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginContainer: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 15,
    padding: 25,
    gap: 25
  },
  header: {
    height: "15%",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 40,
    marginTop: -70
  },
  imgLogo: {
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    padding: 10,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  
})
