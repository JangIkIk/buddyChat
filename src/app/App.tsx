import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BaseLayout } from './layout/BaseLayout';
import { Home } from "@/pages/home";
import { Random } from '@/pages/random';
import { Group } from '@/pages/group';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/random" element={<Random/>}/>
        <Route path="/group" element={<Group/>}/>
        <Route path="/info" element={<div>정보</div>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
