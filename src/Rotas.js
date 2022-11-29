
import { RotasPrivadas } from './RotasPrivadas'
import { RotasPublicas } from './RotasPublicas'
import {useAuth} from './contexto/AuthContext'

function Rotas(){
    const { user } = useAuth()

    return user ? <RotasPrivadas /> : <RotasPublicas />
}

export default Rotas
