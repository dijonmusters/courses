import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = async (req, res) => {
  // await prisma.course.create({
  //   data: {
  //     title: 'Learning to code!',
  //     lessons: {
  //       create: { title: 'Learn the terminal' },
  //     },
  //   },
  // })
  // const courses = await prisma.course.findMany({
  //   include: {
  //     lessons: true,
  //   },
  // })
  // res.send(courses)
  res.send('failed')
}
