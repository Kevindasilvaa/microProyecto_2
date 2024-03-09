export const routes = [
    {
        path: "/",
        name: "Ingresar",
    },
    {
        path: "/Registrar",
        name: "Registrar",
    },
    {
        path: "/Clubes",
        name: "Inicio",
        children:[
            {
                path: "/Clubes/:id",
                name: ":id",
            },]
    },
    {
        path: "/Biblioteca",
        name: "Biblioteca",
    },
    {
        path: "/Perfil",
        name: "Perfil",
    },

] as const 