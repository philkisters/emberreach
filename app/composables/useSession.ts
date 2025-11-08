import type { UserSession } from '~~/types/session'
export const useSession = () => {
  const session = useState<UserSession | null>('session', () => null)

  // Fetch Session Data (wird beim Page Load aufgerufen)
  const fetchSession = async () => {
    try {
      const data = await $fetch('/api/auth/session') as UserSession
      if (data.username)
        session.value = data
      else
        session.value = null
    } catch {
      session.value = null
    }
  }

  return { session, fetchSession }
}
