import { prisma } from "../lib/prisma";

export const getCursos = async() => {
    return prisma.curso.findMany({
        include: {
            turmas: true
        }
    })
}

export const createCurso = async(nome: string, semestre: number) => {
    return prisma.curso.create({
        data: {
            nome,
            semestre
        }
    })
}

export const getCursoById = async(id: string) => {
    return prisma.curso.findUnique({
        where: {
            id
        },
        include: {
            turmas: true
        }
    })
}

export const updateCurso = async(id: string, nome: string, semestre: number) => {

    await prisma.turma.deleteMany({
        where: {
            cursoId: id
        }
    })

    return prisma.curso.update({
        where: { id },
        data: {
            nome,
            semestre
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

