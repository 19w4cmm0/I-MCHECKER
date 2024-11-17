import ExtractKeywordsEntities from "../component/ExtractKeywordsEntities";
import LayoutDefault from "../layout/layoutDefault";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Home from "../pages/grammar/Home";
import Summarize from "../pages/summarize";
import Translate from "../pages/translate";




export const routes = [
    {
        element: <LayoutDefault/>,
        children: [
            {
                path: "/ExtractKeywordsEntities",
                element: <ExtractKeywordsEntities/>
            },
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "summarize",
                element: <Summarize/>
            },
            {
                path: "translate",
                element: <Translate/>
            },
            
        ]
    },
    {
        path: "login",
        element: <Login/>
    },
    {
        path: "register",
        element: <Register/>
    }
   
]