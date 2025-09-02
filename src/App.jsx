import { Routes, Route } from 'react-router-dom'
import './App.css'
import EnvioForm from './pages/Envios/EnvioForm/EnvioForm'
import EnvioList from './pages/Envios/EnviosList/EnviosList'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" Component={EnvioForm}/>
        <Route path="/envios" Component={EnvioList}/>
      </Routes>
    </>
  )
}

export default App
