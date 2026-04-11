import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { TouchableOpacity, View } from "react-native";
import CardMenu from "../../components/dashboard/CardMenu";
import { global } from "../../styles/global";

export default function Index() {

    function goToFormNewDisciplina(){
        return router.replace("/src/screens/Disciplina/FormNewDisciplina")
    }

    return (
        <SafeAreaView>
            <Header titlePage="Disciplinas" descriptionHeader="Selecione uma opção" userName="USER_NAME" color="purpleColor" nameScreenNow=""/>
            <View style={global.body}>
                <View style={global.btnMenu}>
                    <TouchableOpacity onPress={goToFormNewDisciplina}>
                        <CardMenu iconName="bookOpen" color="#a232ff" titleCard="Adicionar Diciplina" descriptionCard="Adicione disciplinas ao sistema"/>
                    </TouchableOpacity>
                    <CardMenu iconName="documentsAdd" color="#a232ff" titleCard="Listar Disciplinas" descriptionCard="Verifique as disciplinas cadastradas"/>
                </View>
            </View>
        </SafeAreaView>
    );
}