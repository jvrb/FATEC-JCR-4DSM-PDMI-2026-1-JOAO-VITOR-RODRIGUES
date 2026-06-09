import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({children}: any) {
    const [user, setUser] = useState<any>("")
    const [token, setToken] = useState("")


    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}