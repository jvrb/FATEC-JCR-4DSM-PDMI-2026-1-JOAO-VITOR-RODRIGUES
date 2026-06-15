import { prisma } from "../lib/prisma";

export const getCursos = async() => {
    return prisma.curso.findMany({
        include: {
            turmas: true,
            coordenador: true
        }
    })
}

export const createCurso = async(nome: string, semestre: number, area: string, coordenadorId: string) => {
    return prisma.curso.create({
        data: {
            nome,
            semestre,
            area,
            coordenadorId: coordenadorId|| null
        }
    })
}

export const getCursoById = async(id: string) => {
    return prisma.curso.findUnique({
        where: {
            id
        },
        include: {
            turmas: true,
            coordenador: true
        }
    })
}

export const updateCurso = async(id: string, nome: string, semestre: number, area: string, coordenadorId: string) => {

    return prisma.curso.update({
        where: { id },
        data: {
            nome,
            semestre,
            area,
            coordenadorId: coordenadorId || null
        }
    })
}

export const deleteCurso = async(id: string) => {

    return prisma.curso.delete({
        where: {
            id
        }
    })
}

