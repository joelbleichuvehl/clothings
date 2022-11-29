import { useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import Input from '../../componentes/unform/input'
import { useAuth } from '../../contexto/AuthContext'
import styled from 'styled-components'
import Image from './login.png'


const Login = () => {
  const { Login } = useAuth()

  const formRef = useRef(null)

  const navigate = useNavigate()

  const fazerLogin = async (user) => {
    await Login(user)
  }

  const submit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          username: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail é obrigatório'),
          password: Yup.string().required('Senha é obrigatório'),
        })

        await schema.validate(data, { abortEarly: false })

        fazerLogin(data)
      } catch (erro) {
        if (erro instanceof Yup.ValidationError) {
          const errorMessages = {}

          erro.inner.forEach((err) => {
            if (err.path) errorMessages[err.path] = err.message
          })

          formRef.current?.setErrors(errorMessages)
        }
      }
    },
    [navigate],
  )

  return (
    <LoginContainer>
      <div className="row justify-content-center">
        <div className="col-sm col-md-3 card">
          <div className="text-center">
            <img src="/img/logo.png" alt="Logo" />
          </div>

          <Form ref={formRef} onSubmit={submit} noValidate>
            <div className="mt-5">
              <Input name="username" label="E-mail" />
            </div>

            <div className="mt-3">
              <Input name="password" label="Senha" type="password" />
            </div>

            <button
              className="btn btn-secondary btn-block col-12 mt-5"
              type="submit"
            >
              Entrar
            </button>
          </Form>
        </div>
      </div>
    </LoginContainer>
  )
}

export default Login

export const LoginContainer = styled.div`
  background-image: url(${Image});
  background-repeat: no-repeat;
  width: 100%;
  height: 900px;
  background-size: contain;
  background-position: center;
  background-color: #111111;

  img {
    max-width: 200px;
  }

  .card {
    background: #5C5C5C;
    padding: 30px;

    margin-top: 10%;


    button {
      background: #FF720C;
      height: 50px;
      text-transform: uppercase;
      border-radius: 0;
      background-color: ${(props) => props.theme['green-700']};

      :hover {
        background-color: ${(props) => props.theme['green-500']};
      }
    }
  }


  
`
