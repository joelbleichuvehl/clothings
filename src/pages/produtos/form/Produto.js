import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useCallback, useState, useRef } from "react"
import api from "../../../services/api"
import styled from "styled-components"
import * as Yup from 'yup'
import { Form } from "@unform/web"
import InputLabel from '../../../componentes/unform/input-label'
import SelectLabel from '../../../componentes/unform/select-label'
import InputCurrencyLabel from '../../../componentes/unform/input-currency-label'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'

const Produto = () => {

  const params = useParams()

  const navigate = useNavigate()

  const formRef = useRef(null)

  const [produto, setProduto] = useState({})

  const [tipoSelesionado, setTipoSelecionado] = useState({})

  const options = [
      {label: 'Vestuário', value: 'Vestuario'},
      {label: 'Acessório', value: 'Acessorio'}
  ]

  const getProduto = useCallback(async id => {
      await api.get(`/produtos/${id}`)
        .then(response => {
          setProduto(response.data)

          const tipo = options.filter(item => item.value === response.data.tipo)
console.log(tipo);
          setTipoSelecionado(tipo[0])
        })
  }, [])

  const salvarProduto = useCallback(async data => {
    await api.post('/produtos', data)
      .then(response => {
          toast.success("Produto salvo com sucesso!");

          navigate(`/produtos/${response.data.id}`)
      })
  }, [])

  const atualizarProduto = useCallback(async data => {
    await api.put(`/produtos/${produto.id}`, data)
      .then(response => {
        toast.success("Produto Atualizado com sucesso!");
      }).catch(erro => console.log(erro))
  }, [produto])


  const submit = useCallback(async data => {
    try {
      formRef.current.setErrors({})

      data.tipo = tipoSelesionado.value

      const schema = Yup.object().shape({
          marca: Yup.string().required("Marca é obrigatório"),
          descricao: Yup.string().required("Descrição é obrigatório"),
          tipo: Yup.string().required("Tipo é obrigatório"),
          quantidade: Yup.string().required("Quantidade é obrigatório"),
          valor: Yup.string().required("Valor é obrigatório")
      })

      console.log(data);

      await schema.validate(data, { abortEarly: false })

      if (produto.id) {
          atualizarProduto(data)
      } else {
          salvarProduto(data)
      }

    } catch (error) {
      const errorMessages = {}

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
            errorMessages[err.path] = err.message
        })

        formRef.current.setErrors(errorMessages)
      }
    }
  }, [atualizarProduto, produto.id, salvarProduto, tipoSelesionado])

  useEffect(() => {
    const { id } = params

    if (id) getProduto(id)
  }, [getProduto, params])

  return (
    <div className="container">

      <Formulario>
        <h1 className="text-center mt-5 mb-5">
          {produto.id ? 'EDITAR ' : 'NOVO'} PRODUTO
        </h1>
        
        <div className="row justify-content-center">
          <div className="col-sm col-md-6">
            <Form ref={formRef} initialData={produto} onSubmit={submit}>
              <div>
                <InputLabel label="Marca" name="marca" />
              </div>
              
              <div className='mt-3'>
                <InputLabel label="Descrição" name="descricao" />
              </div>

              <div className="row mt-3">
                <div className="col-md-6">
                  <SelectLabel 
                    label="Valor" 
                    name="valor" 
                    options={options} 
                    value={tipoSelesionado} 
                    onChange={e => setTipoSelecionado(e)}/>
                </div>
                
                <div className="col ">
                  <InputLabel label="Quantidade" name="quantidade" />
                </div>
                
                <div className="col ">
                  <InputCurrencyLabel label="Valor" name="valor" />
                </div>
              </div>

              <div className="row justify-content-center mt-4">
                <div className="col-sm col-md-4 d-grid">
                  <Link className="btn btn-secondary" to="/produtos">CANCELAR</Link>
                </div>

                <div className="col-sm col-md-4 d-grid">
                <button
                  className="btn btn-primary"
                  type="submit"
                >{produto.id ? 'ATUALIZAR' : 'SALVAR'}</button>
              </div>
              </div>
            </Form>
          </div>
        </div>
      </Formulario>
    </div>
  )
}

export default Produto

export const Formulario = styled.div`

  h1 {
    color: #5C5C5C;
  }

  .btn-primary {
    background: #FF720C !important;
    border: none;
    border-radius: 0;

    svg {
        margin-right: 10px;
        margin-top: -5px;
    }

    :hover {
        background: #5C5C5C !important;
    }
  }
  
  .btn-secondary {
    color: #5C5C5C !important;
    background: none;
    border-radius: 0;
    
    svg {
      margin-right: 10px;
      margin-top: -5px;
    }
    
    :hover {
      background: #5C5C5C !important;
      color: #fff !important;
    }
  }
`