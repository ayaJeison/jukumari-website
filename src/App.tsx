import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Inicio from './paginas/inicio'
import Cotizar from './paginas/cotizar'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Inicio />} />
          <Route path='*' element={<Inicio />} />
          <Route path='cotizacion' element={<Cotizar />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  )
}

export default App
