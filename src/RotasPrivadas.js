import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Pessoas from './pages/pessoas'
import Produtos from './pages/produtos'
import Produto from './pages/produtos/form/Produto'
import NotFound from './pages/not-found/NotFound'

export function RotasPrivadas() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>

      <Route path='/pessoas' element={<Pessoas />}/>

      <Route path='/produtos' element={<Produtos />}/>

      <Route path='/produtos/novo' element={<Produto />}/>

      <Route path='/produtos/:id' element={<Produto />}/>

      <Route path='/*' element={<NotFound />}/>
    </Routes>
  )
}
