import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController } from "../context/index";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { SiCoursera } from "react-icons/si";
import { DiGoogleDrive } from "react-icons/di";
import { BiTask, BiTimer } from "react-icons/bi";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

export function Sidenav({ brandImg, brandName, routes }) {
  const navigate=useNavigate();
  const [isActive,setIsActive]=useState(false)
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-4 px-4">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
             Brainboost
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul>
        <li >
                    <Button
                    onClick={()=>{
                      setIsActive(true)
                      navigate('/chat')
                    }}
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                   <BsFillChatDotsFill {...icon} />
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                       Chat
                      </Typography>
                    </Button>
                
              
              </li>
              <li >
                <Button
                onClick={()=>{
                  setIsActive(true)
                  navigate('/courses')
                }}
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
               <SiCoursera {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                  Courses
                  </Typography>
                </Button>
            
          
          </li>
          <li>
                <Button
                onClick={()=>{
                  setIsActive(true)
                  navigate('/drive')
                }}
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
               <DiGoogleDrive {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Drive
                  </Typography>
                </Button>
            
          
          </li>
                <li >
                <Button
                onClick={()=>{
                  setIsActive(true)
                  navigate('/pomodroTimer')
                }}
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
               <BiTimer {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    PomodroTimer
                  </Typography>
                </Button>
            
          
          </li>
          <li >
                <Button
                onClick={()=>{
                  setIsActive(true)
                  navigate('/studyWithme')
                }}
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
               <AiOutlineVideoCameraAdd {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    StudyWithme
                  </Typography>
                </Button>
            
          
          </li>
          <li >
                <Button
                onClick={()=>{
                  setIsActive(true)
                  navigate('/tasks')
                }}
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
               <BiTask {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                   Tasks
                  </Typography>
                </Button>
            
          </li>
          <li >
                <Button
                onClick={()=>{
                  setIsActive(!isActive)
                  navigate('/profile')
                }}
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
               <CgProfile {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                   Profile
                  </Typography>
                </Button>
            
          
          </li>
          <li >
                <Button
                onClick={()=>{
                  setIsActive(!isActive)
                  navigate("/")
                }}
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
               <CgProfile {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                   Logout
                  </Typography>
                </Button>
            
          
          </li>
        </ul>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/layout/sidnave.jsx";

export default Sidenav;