import bycrypt from "bcrypt"

export const hashPwd = async(senha: string) => {
    const saltRounds = 10
    return await bycrypt.hash(senha, saltRounds)
}