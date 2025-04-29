export const useSession = () => {
  const session = useState('session', () => null)

  // Fetch Session Data (wird beim Page Load aufgerufen)
  const fetchSession = async () => {
    try {
      const data = await $fetch('/api/auth/session')
      session.value = data.user
    } catch {
      session.value = null
    }
  }

  return { session, fetchSession }
}
