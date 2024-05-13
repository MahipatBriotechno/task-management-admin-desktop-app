import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import {IndexPage} from './pages/index'
import { LoginPage } from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import HeaderAdmin from "./components/admin/HeaderAdmin";
export const Router: FC = () => {
  return (
    <HashRouter>
       <HeaderAdmin />
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </HashRouter>
  );
};
