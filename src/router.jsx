import { createBrowserRouter } from 'react-router-dom';
import Inicio from './pages/Inicio.jsx';
import Root from "./layout/Roots.jsx";
import Ingresar from './pages/Ingresar.jsx';
import { routes } from "./constants/routes";
import Registrar from "./pages/Registrar.jsx";
import Perfil from './pages/Perfil.jsx';
import Busqueda from './pages/Busqueda.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: routes[0].path,
        element: <Ingresar />,
      },
      {
        path: routes[1].path,
        element: <Registrar />,
      },
      {
        path: routes[2].path,
        element: <Inicio />,
      },
      {
        path: routes[3].path,
        element: <Perfil />,
      },
      {
        path: routes[4].path,
        element: <Busqueda />,
      },
    ],
  },
]);

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root/>,
//     children: [
//       {
//         path: routes[0].path,
//         element: <Home />,
//       },
//       {
//         path: routes[1].path,
//         element: <Ingresar />,
//       },
//       {
//         path: routes[2].path,
//         element: <Registrar />,
//       },
//     ],
//   },
// ]);