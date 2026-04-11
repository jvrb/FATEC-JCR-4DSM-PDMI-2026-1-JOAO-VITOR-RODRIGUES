import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/Header";
import { TouchableOpacity, View } from "react-native";
import CardMenu from "../../components/dashboard/CardMenu";
import { global } from "../../styles/global";

export default function Index() {

    function goToFormNewBoletim(){
        return router.replace("/src/screens/Boletim/FormNewBoletim")
    }

    return (
        <SafeAreaView>
            <Header titlePage="Boletim" descriptionHeader="Selecione uma opção" userName="USER_NAME" color="orangeColor" nameScreenNow=""/>
            <View style={global.body}>
                <View style={global.btnMenu}>
                    <TouchableOpacity onPress={goToFormNewBoletim}>
                        <CardMenu iconName="documentText" color="#ff6200" titleCard="Adicionar Boletim" descriptionCard="Adicione um boletim ao sistema"/>
                    </TouchableOpacity>
                    <CardMenu iconName="fileMultiple" color="#ff6200" titleCard="Listar Notas" descriptionCard="Verifique as notas cadastradas"/>
                </View>
            </View>
        </SafeAreaView>
    );
}