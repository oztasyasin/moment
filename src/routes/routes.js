import AddUser from "../pages/AddUser";
import Friends from "../pages/Friends";
import Home from "../pages/Home";
import Launch from "../pages/Launch";
import Login from "../pages/Login";
import MainPage from "../pages/Main";
import PostDetails from "../pages/PostDetails";
import Register from "../pages/Register";
import Settings from "../pages/Settings";
import User from "../pages/User";

export const routes = [
    {
        path: '/launch',
        component: Launch,
        permission: "anyallow"
    },
    {
        path: '/register',
        component: Register,
        permission: "anyallow"
    },
    {
        path: '/login',
        component: Login,
        permission: "anyallow"
    },
    {
        path: '/main',
        component: MainPage,
        permission: "anyallow"
    },
    {
        path: '/postDetails',
        component: PostDetails,
        permission: "anyallow"
    },
    {
        path: '/settings',
        component: Settings,
        permission: "anyallow"
    },
    {
        path: '/user',
        component: User,
        permission: "anyallow"
    },
    {
        path: '/addUser',
        component: AddUser,
        permission: "anyallow"
    },
    {
        path: '/friends',
        component: Friends,
        permission: "anyallow"
    },
]