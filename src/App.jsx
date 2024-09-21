import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/register'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={<Login/>}>
        <Route path='register' element={<Register/>}></Route>
      </Route>
    </Routes>

    </BrowserRouter>
  )    
}

export default App
