import { useContext } from 'react'
import { USER_POST } from '../../api'
import Error from '../../Helper/Error'
import Head from '../../Helper/Head'
import useFetch from '../../Hooks/useFetch'
import useForm from '../../Hooks/useForm'
import { UserContext } from '../../UserContext'
import Button from '../Forms/Button'
import Input from '../Forms/Input'

const LoginCreate = () => {
  const username = useForm()
  const email = useForm('email')
  const password = useForm()

  const { userLogin } = useContext(UserContext)
  const { loading, error, request } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value
    })
    const { res } = await request(url, options)
    if (res.ok) userLogin(username.value, password.value)
  }

  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  )
}

export default LoginCreate
