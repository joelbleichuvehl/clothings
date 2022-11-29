import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Home() {

    return (
        <HomeContainer className='container pt-5'>
            <div className="row">
                <div className='col-sm col-md-4'>
                    <Card >
                        <Link to="/pedidos" className='text-center'>
                            <img src="/icons/pedidos.png" alt="" />

                            PEDIDOS
                        </Link>
                    </Card>
                </div>
                
                <div className='col-sm col-md-4'>
                    <Card >
                        <Link to="/pessoas" className='text-center'>
                            <img src="/icons/pessoa.png" alt="" />

                            PESSOAS
                        </Link>
                    </Card>
                </div>
                
                <div className='col-sm col-md-4'>
                    <Card >
                        <Link to="/produtos" className='text-center'>
                            <img src="/icons/produtos.png" alt="" />

                            PRODUTOS
                        </Link>
                    </Card>
                </div>
            </div>
        </HomeContainer>
    )
}

export default Home

export const HomeContainer = styled.div`

`

export const Card = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    background: #eeee;
    padding: 50px;

    font-size: 28px;
    font-weight: bold ;
    
    img {
        max-width: 200px;
        margin-bottom: 30px;
    }
    
    a {
        color: #5C5C5C;
        text-decoration: none;
    }

    :hover {
        background: #FF720C;

        a {
            color: #fff;
        }
    }
`