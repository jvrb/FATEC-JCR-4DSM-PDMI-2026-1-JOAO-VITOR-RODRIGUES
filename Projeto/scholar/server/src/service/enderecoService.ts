import { prisma } from "../lib/prisma"

export const updateEndereco = async(alunoId: string, cep: string, endereco: string, cidade: string, estado: string) => {
    // Se não existir endereco, cadastra
    const existeEndereco = await prisma.endereco.findFirst({
        where: {
            alunoId
        }
    })
    console.log(alunoId)
    if(!existeEndereco) {
        return await prisma.endereco.create({
            data: {
                cep,
                endereco,
                cidade,
                estado,
                alunoId
            }
        })
    }else{
        return await prisma.endereco.update({
            where: {
                alunoId
            },
            data: {
                cep,
                endereco,
                cidade,
                estado
            }
        })
    }
}