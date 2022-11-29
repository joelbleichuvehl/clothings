import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image from './erro.png'

function NotFound() {

    return (
        <NotFoundContainer>
            <div className="row justify-content-center">
                <div className="col-sm-6 col-md-2 d-grid">
                    <Link to='/' className='btn btn-primary'>Voltar a Página Inicial</Link>
                </div>
            </div>
        </NotFoundContainer>
    )
}

export default NotFound

export const NotFoundContainer = styled.div`
    background-image: url(${Image});
    background-repeat: no-repeat;
    width: 100%;
    height: 900px;
    background-size: contain;
    background-position: center;
    background-color: #111111;


    .btn-primary {
        margin-top: 650px;
        background: none !important;
        color: #FF720C;
        text-transform: uppercase;
        font-weight: bold;

        border: none;
        border-radius: 0;
        border-bottom: 2px solid #FF720C;

        text-shadow: 2px 2px 5px #FF720C;
    }
    
`

