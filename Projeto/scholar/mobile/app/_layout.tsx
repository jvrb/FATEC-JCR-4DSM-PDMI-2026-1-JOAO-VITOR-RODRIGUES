import { Stack } from "expo-router";
import { AuthProvider } from "./src/context/AuthProvider";
import Toast from "react-native-toast-message";



export default function RootLayout() {

	return (
		<AuthProvider>
			<Stack screenOptions={{ headerShown: false }} />
			<Toast />
		</AuthProvider>
	);
}
