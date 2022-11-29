import { useEffect, useCallback, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components'
import { BsFillTrashFill } from 'react-icons/bs'
import api from '../../services/api'
import { toast } from 'react-toastify'
import {FiSearch} from 'react-icons/fi'

function Produtos() {

    const navigate = useNavigate()

    const [lista, setLista] = useState([])

    const [total, setTotal] = useState(0)

    const [produtoSelecionado, setProdutoSelecionado] = useState({})


    const listarProdutos = useCallback(() => {
        axios.get('http://localhost:3333/produtos')
            .then(response => {
                setLista(response.data)

                setTotal(response.data.length)
            })
    }, [])

    const removerProduto = useCallback(async () => {
        await api.delete(`/produtos/${produtoSelecionado.id}`)
            .then(() => {
                toast.success('Produto excluido com sucesso!')
                listarProdutos()
                setProdutoSelecionado({})
            })
    }, [listarProdutos, produtoSelecionado.id])


    useEffect(() => {
        listarProdutos()
    },[])
    return (
        <ProdutosContainer className="text-center">
            <h1>PRODUTOS</h1>

            <div className="row justify-content-center mt-5 mb-3">
                <div className="col-sm-6 col-md-2 d-grid">
                    <Link className='btn btn-primary' to="/produtos/novo">NOVO PRODUTO</Link>
                </div>
                
                <div className="col-sm-6 col-md-2 d-grid">
                    <button className='btn btn-primary' > <FiSearch size={25}/>LOCALIZAR</button>
                </div>
            </div>

            <div className='row text-center'>
                <Total>
                    TOTAL DE REGISTROS - {total}
                </Total>
            </div>

            <div className='row'>
                <div className='col'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">MARCA</th>
                                <th scope="col">DESCRIÇÃO</th>
                                <th scope="col">QUANTIDADE</th>
                                <th scope="col">TIPO</th>
                                <th scope="col">VALOR</th>
                                <th scope="col">AÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map(produto => (
                                <Linha key={produto.id} onClick={(event) => {
                                    if (event.target.innerText !== undefined) {
                                        navigate(`/produtos/${produto.id}`)
                                    }
                                }}>
                                    <td>{produto.marca}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.tipo}</td>
                                    <td>{produto.quantidade}</td>
                                    <td>{produto.valor}</td>
                                    <td data-bs-toggle="modal" data-bs-target="#removeModal"
                                        onClick={() => setProdutoSelecionado(produto)}>
                                        <BsFillTrashFill size={22} color="red" />
                                    </td>
                                </Linha>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="modal fade" id="removeModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Remover Produto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja excluir o produto {produtoSelecionado.descricao}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary col-4" data-bs-dismiss="modal"
                                onClick={() => removerProduto()}>Sim</button>
                            <button type="button" className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </ProdutosContainer>
    )
}

export default Produtos


export const ProdutosContainer = styled.div`
    h1 {
       color: #5C5C5C;
       margin-top: 30px;
    }

    .btn-primary {
        background: #FF720C !important;
        border: none;
        padding: 10px;

        svg {
            margin-right: 10px;
            margin-top: -5px;
        }

        :hover {
            background: #5C5C5C !important;
        }
    }
`

export const Total = styled.div`
   margin-top: 20px;
   font-size: 14px;
`
export const Linha = styled.tr`
   :hover {
    cursor: pointer;
    background: #eee;
   }
`