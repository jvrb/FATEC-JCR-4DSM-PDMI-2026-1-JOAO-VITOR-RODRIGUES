import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Switch } from "react-native";
import logo from "../assets/images/fatec_jacarei.png";

export default function Index() {
	return (
		<View style={styles.body}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Image style={styles.headerImage} source={logo} resizeMode="contain" />
				</View>
				<View style={styles.main}>
					<Text style={{textAlign: "center", fontWeight: "bold", fontSize: 22}}>HOME</Text>
					<View style={styles.sectionBtns}>
						<View style={styles.left}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Um</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Três</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Cinco</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Sete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Nove</Text>
              </TouchableOpacity>
            </View>
						<View style={styles.right}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Dois</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Quatro</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Seis</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Oito</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Dez</Text>
              </TouchableOpacity>
            </View>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#dcdcdc",
	},
	container: {
		width: 350,
		gap: 10,
		borderWidth: 1,
		borderColor: "#515151",
		borderRadius: 8,
		padding: 20,
	},
	headerImage: {
		width: 140,
    height: 140
	},
	main: {
    width: "100%",
    justifyContent: "center",
    gap: 10
  },
	header: {
		justifyContent: "center",
		alignItems: "center",
	},
  sectionBtns:{
    flexDirection: "row",
  },
  left: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 10
  },
  right: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 10
  },
  btn: {
    width: '90%',
    padding: 10,
    backgroundColor: "#f7b20f",
    borderRadius: 5
  },
  textBtn: {
    textAlign: "center",
    fontWeight: "bold"
  }
});
