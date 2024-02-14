
import AddExpenses from './pages/AddExpenses'
import Home from './pages/Home'
import './App.css'
import {Routes, Route} from 'react-router-dom'
function App() {

  return (
    <div className='container'>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addexpenses' element={<AddExpenses />} />
    </Routes>
    </div>
  )
}

export default App
