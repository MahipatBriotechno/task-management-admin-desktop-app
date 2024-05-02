import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import {IndexPage} from './pages/index'
export const Router: FC = () => {
  return (
    <HashRouter>
      <Routes>
     
        <Route path="/" element={<IndexPage/>} />
       
       
      </Routes>
    </HashRouter>
  );
};
