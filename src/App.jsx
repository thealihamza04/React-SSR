import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import GetStarted from './pages/GetStarted.jsx'
import Header from './components/Header.jsx'

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </div>
  )
}

export default App
