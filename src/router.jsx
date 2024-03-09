import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Root from "./layout/Roots.jsx";
import Ingresar from './pages/Ingresar.jsx';
import { routes } from "./constants/routes";
import Registrar from "./pages/Registrar.jsx";
import Videojuegos from './pages/Videojuegos.jsx';
import Clubes from './pages/Clubes.jsx';
import Club from './pages/Club.jsx';



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: routes[0].path,
        element: <Home />,
      },
      {
        path: routes[1].path,
        element: <Ingresar />,
      },
      {
        path: routes[2].path,
        element: <Registrar />,
      },
      ,
      {
        path: routes[3].path,
        element: <Videojuegos />,
      },
      ,
      {
        path: routes[4].path,
        element: <Clubes />,
        children: [
          {
            path: routes[4]["children"][0].path,
            element: <Club />,
          },]
      },
    ],
  },
]);