import { Routes, Route } from 'react-router-dom'
import './App.css'
import EnvioForm from './pages/Envios/EnvioForm/EnvioForm'
import EnvioList from './pages/Envios/EnviosList/EnviosList'
import CadastroProdutoForm from './pages/CadastroProduto/CadastroProdutoForm'
import ListagemProdutos from './pages/ListagemProdutos/ListagemProdutos'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" Component={EnvioList}/>
        <Route path="/envios/novo" Component={EnvioForm}/>
        <Route path="/envios/editar/:id" Component={EnvioForm}/>
        <Route path='cadastroProduto' Component={CadastroProdutoForm}/>
        <Route path='produtos' Component={ListagemProdutos}/>
      </Routes>
    </>
  )
}

export default App
