import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/login",
        element: <Login />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
];

export default routes;
