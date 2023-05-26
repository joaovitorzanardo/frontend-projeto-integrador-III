import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import { Clientes } from "../pages/Clientes"
import { Produtos } from "../pages/Produtos"
import { Tarefas } from "../pages/Tarefas"
import { Usuarios } from "../pages/Usuarios"
import { Equipes } from "../pages/Equipes"
import { Relatorios } from "../pages/Relatorios"
import { CustomSideMenu } from "../shared/components/CustomSideMenu"

export const AppRoutes = () => {
    return (
        <>
            <CustomSideMenu />
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="clientes" element={<Clientes />}/>
                <Route path="produtos" element={<Produtos />}/>
                <Route path="tarefas" element={<Tarefas />}/>
                <Route path="usuarios" element={<Usuarios />}/>
                <Route path="equipes" element={<Equipes />}/>
                <Route path="relatorios" element={<Relatorios />}/>
            </Routes>
        </>
        
    )
}