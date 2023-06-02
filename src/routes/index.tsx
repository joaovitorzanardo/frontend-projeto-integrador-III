import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import { Clientes } from "../pages/clientes/Clientes"
import { Produtos } from "../pages/produtos/Produtos"
import { Tarefas } from "../pages/tarefas/Tarefas"
import { Usuarios } from "../pages/usuarios/Usuarios"
import { Equipes } from "../pages/equipes/Equipes"
import { Relatorios } from "../pages/Relatorios"
import { CustomSideMenu } from "../shared/components/CustomSideMenu"
import { TipoProduto } from "../pages/produtos/tipoProduto/TipoProduto"
import { TipoTarefa } from "../pages/tarefas/tipo-tarefa/TipoTarefa"

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
                <Route path="tipo-produto" element={<TipoProduto />} />
                <Route path="tipo-tarefa" element={<TipoTarefa />} />
            </Routes>
        </>
        
    )
}