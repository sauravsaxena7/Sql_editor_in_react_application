import {lazy} from 'react'
import {BrowserRouter , Routes,Route} from "react-router-dom"
import "./assets/style.css"

const SqlEditor=lazy(()=>import("./components/SqlEditor"))

const App = () => {
  return (
   <BrowserRouter>
     <Routes>
      <Route path='/' element={<SqlEditor/>}/>
     </Routes>
   </BrowserRouter>
  )  
}

export default App