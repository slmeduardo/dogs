import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PASSWORD_RESET } from '../../api'
import Error from '../../Helper/Error'
import Head from '../../Helper/Head'
import useFetch from '../../Hooks/useFetch'
import useForm from '../../Hooks/useForm'
import Button from '../Forms/Button'
import Input from '../Forms/Input'

const LoginPasswordReset = () => {
  const [login, setLogin] = useState('')
  const [key, setKey] = useState('')
  const password = useForm()
  const { loading, error, request } = useFetch()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const login = params.get('login')
    const key = params.get('key')
    if (login) setLogin(login)
    if (key) setKey(key)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value
      })
      const { res } = await request(url, options)
      if (res.ok) navigate('/login')
    }
  }

  return (
    <div>
      <Head title="Resete a senha" />
      <h1 className="title">Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </div>
  )
}

export default LoginPasswordReset
