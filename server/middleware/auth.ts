import { getServerSession } from '#auth'
export default eventHandler(async (event) => {
  const session:any = await getServerSession(event)
  if(session) {
    event.context.auth = session.user
  }
//   else if(!event.path.includes('/api/auth') && event.path !== '/')
//     throw createError({
//         statusCode: 401,
//         statusMessage: 'Unauthenticated',
//     })
})