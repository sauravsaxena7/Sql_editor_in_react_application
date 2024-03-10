import {lazy} from 'react'
import {BrowserRouter , Routes,Route} from "react-router-dom"
import "./assets/style.css"

const Home=lazy(()=>import("./components/Home"))

const App = () => {
  return (
   <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
     </Routes>
   </BrowserRouter>
  )  
}

export default App