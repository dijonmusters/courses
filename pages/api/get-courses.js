import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = async (req, res) => {
  const courses = await prisma.course.findMany({
    include: {
      lessons: true,
    },
  })
  res.send(courses)
}
