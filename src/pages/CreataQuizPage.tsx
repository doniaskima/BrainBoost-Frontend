import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
 
} from "../layout/index";
import routes from "../routes";
import { useMaterialTailwindController } from "../context/index";
import { useState } from "react";
import CreateQuiz from "../components/quiz/CreateQuiz";
 

export function CreataQuizPage() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [openConfigurator,setOpenConfigurator]=useState(false)

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/BrainBoost.png" : "/img/BrainBoost.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <CreateQuiz/>
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(!openConfigurator)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({  pages }) =>
              pages.map(({ path, element }) => (
                <Route  path={path} element={element} />
              ))
          )}
        </Routes>
    
      </div>
    </div>
  );
}

 
export default CreataQuizPage;
