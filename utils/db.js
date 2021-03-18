import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getCourses = () =>
  prisma.course.findMany({
    include: {
      lessons: true,
    },
  })

export { getCourses }
