export const useAuth = () => {
  const register = (data: { email: string, username: string, password: string }) => 
    $fetch('/api/auth/register', { method: 'POST', body: data })

  const login = (data: { identifier: string, password: string }) => 
    $fetch('/api/auth/login', { method: 'POST', body: data })

  return { register, login }
}
