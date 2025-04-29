export default defineNuxtRouteMiddleware(async (to, from) => {
    const { session, fetchSession } = useSession()
  
    // Wenn Session noch nicht geladen ist
    if (session.value === null) {
      await fetchSession()
    }
  
    // Falls keine Session und Route braucht Auth
    if (!session.value && to.path.startsWith('/character')) {
      return navigateTo('/')
    }
  })
  