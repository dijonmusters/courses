import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getCourses = () =>
  prisma.course.findMany({
    include: {
      lessons: true,
    },
  })

const createUser = (email) =>
  prisma.user.create({
    data: { email },
  })

export { getCourses, createUser }
