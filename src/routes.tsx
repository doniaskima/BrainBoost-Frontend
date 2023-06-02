import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {BsFillChatDotsFill} from "react-icons/bs"
import {BiTask} from "react-icons/bi"
import {CgProfile} from "react-icons/cg"
import {SiCoursera} from "react-icons/si";
import {AiOutlineVideoCameraAdd} from "react-icons/ai";
import {BiTimer} from "react-icons/bi";
import {DiGoogleDrive} from "react-icons/di";
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import Chat from "./pages/Chat";
import Courses from './pages/Courses';
import Drive from './pages/Drive';
import Notification from './pages/Notification';
import PomodroTimer from './pages/PomodroTimer';
import StudyWithme from './pages/StudyWithme';
import Tasks from './pages/Tasks';
import Profile from "./pages/Profile";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "login",
        element: <Login />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    layout: "",
    pages: [
      {
        icon: <BsFillChatDotsFill {...icon} />,
        name: "Chat",
        path: "chat",
        element: <Chat />,
      },
      {
        icon: <SiCoursera {...icon} />,
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        icon: <DiGoogleDrive {...icon} />,
        name: "Drive",
        path: "drive",
        element: <Drive />,
      },
      {
        icon: <BiTimer {...icon} />,
        name: "PomodroTimer",
        path: "pomodroTimer",
        element: <PomodroTimer />,
      },
      {
        icon: <AiOutlineVideoCameraAdd {...icon} />,
        name: "StudyWithme",
        path: "studyWithme",
        element: <StudyWithme />,
      },
      {
        icon: <BiTask {...icon} />,
        name: "Tasks",
        path: "/tasks",
        element: <Tasks />,
      },
      {
        icon: <CgProfile {...icon} />,
        name: "Profile",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
];

export default routes;
