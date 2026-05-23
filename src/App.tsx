import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Vincular from './pages/Vincular'
import Integrar from './pages/Integrar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vincular" element={<Vincular />} />
        <Route path="/integrar" element={<Integrar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
