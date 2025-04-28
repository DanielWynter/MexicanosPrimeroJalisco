import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FormularioEscuela } from "./screens/FormularioEscuela";
import { FormularioEscuela2 } from "./screens/FormularioEscuela2";
import { FormularioEscuela3 } from "./screens/FormularioEscuela3";
import { FormularioEscuela4 } from "./screens/FormularioEscuela4";
import { FormularioAliado } from "./screens/FormularioAliado";
import { Inicio } from "./screens/Inicio";
import { Register } from "./screens/Register";
import { IniciarSesion } from "./screens/IniciarSesion";


import { Chat } from "./screens/Chat";
import { ChatScreen } from "./screens/ChatScreen";
import { Escuela } from "./screens/Escuela";
import { EscuelaScreen } from "./screens/EscuelaScreen";
import { Escuelita } from "./screens/Escuelita";
import { EscuelitaAliada } from "./screens/EscuelitaAliada";
import { Mapado } from "./screens/Mapado";
import { MatchAliado } from "./screens/MatchAliado";
import { MatchAliadoScreen } from "./screens/MatchAliadoScreen";
import { Proyectos } from "./screens/Proyectos";
import { Usuario } from "./screens/Usuario";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/escuela",
    element: <Escuela />,
  },
  {
    path: "/escuelaScreen",
    element: <EscuelaScreen />,
  },
  {
    path: "/escuelita",
    element: <Escuelita />,
  },
  {
    path: "/escuelitaAliada",
    element: <EscuelitaAliada />,
  },
  {
    path: "/mapado",
    element: <Mapado />,
  },
  {
    path: "/matchAliado",
    element: <MatchAliado />,
  },
  {
    path: "/matchAliadoScreen",
    element: <MatchAliadoScreen />,
  },
  {
    path: "/proyectos",
    element: <Proyectos />,
  },
  {
    path: "/usuario",
    element: <Usuario />,
  },
  {
    path: "/chatScreen",
    element: <ChatScreen />,
  },

  {
    path: "/formulario-escuela-1",
    element: <FormularioEscuela />,
  },
  {
    path: "/formulario-escuela-2",
    element: <FormularioEscuela2 />,
  },
  {
    path: "/formulario-escuela-3",
    element: <FormularioEscuela3 />,
  },
  {
    path: "/formulario-escuela-4",
    element: <FormularioEscuela4 />,
  },
  {
    path: "/formulario-aliado-1",
    element: <FormularioAliado />,
  },
  {
    path: "/iniciarSesion",
    element: <IniciarSesion />,
  }, 


]);

export const App = () => {
  return <RouterProvider router={router} />;
};
