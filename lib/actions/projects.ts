import { prisma } from "../prisma";

export async function getProjects() {
    try {
        const projects = await prisma.project.findMany();
        return projects
    } catch (error) {
        console.log(error);
    }

}