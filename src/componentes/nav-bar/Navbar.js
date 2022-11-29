/* eslint-disable jsx-a11y/anchor-is-valid */
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {FaUser} from 'react-icons/fa'
import {CgLogOff} from 'react-icons/cg'
import {useAuth} from '../../contexto/AuthContext'

function Navbar() {

    const {user} = useAuth()

    return (
        <>
            {user && (
                <NavConatainer className='container-flex'>
                    <div className="row navbar">
                        <div className="col text-center">
                            <Link to="/"><img src="/img/logo.png" alt="Logo" /></Link>
                        </div>
        
                        <div className="perfil col text-end" >
                            <img src="/icons/usuario.png" alt="usuario" />
                        
                            <div className="lista">
                                <span className='px-2'>NOME DO USUÁRIO</span>
                                
                                <div className="item text-start mt-3">
                                    <FaUser /> Meu Perfil
                                </div>
        
                                <hr />
        
                                <div className='item text-start'>
                                    <CgLogOff size={22}/>Sair
                                </div>
                            </div>
                        </div>
        
                            
                    </div>
        
                    <div className='linha'></div>
        
        
                </NavConatainer>
            )}
        </>
    )
}

export default Navbar

export const NavConatainer = styled.div`
    .navbar {
        height: 60px;
        background: #5C5C5C;

        img {
            max-width: 150px;
        }
    }

    .perfil {
        position: absolute;
        z-index: 99;
        width: 100px;
        margin-right: 150px;
        right: 0;
        
        img {
            max-width: 90px;
            margin-right: 150px;
        }

        :hover {
            .lista {
                display: flex ;
            }
        }
    }

    .linha {
        border: 5px solid #FF720C;
        margin-top: 5px;
    }

    .lista {
        position: absolute;
        z-index: 99;
        
        background-color: #5C5C5C;
        color: #fff;
        width: 200px;
        height: 140px;
        right:0 ;
        margin-top: -4px;

        hr {
            border: 1px solid #fff;
            width: 100%;
            margin-left: -5px;
            margin-top: 0;
            margin-bottom: 10px;
        }
        
        display: none;
        flex-direction: column;
        align-items: start;

        svg {
            margin-top: -5px;
            margin-right: 10px;
        }

        .item {
            padding: 10px;
            width: 100%;

            :hover {
                background: #cecece;
                cursor: pointer;
            }
        }
    }   
`