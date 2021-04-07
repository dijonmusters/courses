import { getLessonBySlug } from 'utils/db'

module.exports = async (req, res) => {
  const { slug } = req.query
  const lesson = await getLessonBySlug(slug)
  res.send(lesson)
}
