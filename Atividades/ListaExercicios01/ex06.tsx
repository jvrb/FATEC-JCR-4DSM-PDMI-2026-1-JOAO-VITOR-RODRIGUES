import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { useState } from 'react'
import { StatusBar } from "expo-status-bar";

export default function Index() {

  const [name, setName] = useState("")
  const [idade, setIdade] = useState("")
  const [saveMsg, setSaveMsg] = useState<string>()

  function saveInfo(){
    setSaveMsg(`${name} - ${Number(idade)} anos`)
  }

	return (
		<View style={styles.main}>
			<StatusBar hidden={true} />
      <View style={styles.inputWraper}>
        <Text style={{color: 'white'}}>Nome</Text>
        <TextInput 
          style={styles.inputText} 
          placeholder="Digite seu nome..."
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputWraper}>
        <Text style={{color: 'white'}}>Idade</Text>
        <TextInput 
          style={styles.inputText} 
          placeholder="Digite sua idade..."
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.btnSave} onPress={saveInfo}>
        <Text style={{color: '#fff', fontWeight: 'bold', textTransform: 'uppercase'}}>Salvar</Text>
      </TouchableOpacity>
      <Text style={{color: '#fff'}}>{saveMsg}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#161616',
    gap: 10
  },
  inputWraper: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  inputText: {
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 4,
    height: 40
  },
  btnSave: {
    width: '90%',
    height: 40,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  }
});
