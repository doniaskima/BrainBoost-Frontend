import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
  setOpenConfigurator
} from "../context/index";

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];

      break;
    }
  }

  return number;
}


type SidenavColors = {
  [key: string]: string;
}

function MyConfigurator() {
  return (
    <div>
      This is the configurator component.
    </div>
  );
}

const sidenavColors: SidenavColors = {
  "blue": "#4F46E5",
  "blue-gray": "#6B7280",
  "green": "#10B981",
  "orange": "#F97316",
  "red": "#EF4444",
  "pink": "#EC4899",
};

export function Configurator() {
  
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator,sidenavColor, sidenavType, fixedNavbar } = controller;
  useEffect(() => {
    // Force a re-render of the component when the state changes
    // This will update the design to reflect the new state
  }, [controller.openConfigurator]);

  const setOpenConfigurator = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", value: !controller.openConfigurator });
  };
  console.log(openConfigurator)
    const color: keyof typeof sidenavColors = "blue";


  const sidenavColors = {
    blue: "from-blue-400 to-blue-600",
    "blue-gray": "from-blue-gray-800 to-blue-gray-900",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };
  return (
<aside
  className="fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg"
  style={{ transform: openConfigurator ? "translateX(0)" : "translateX(100%)" }}
>
    <div className="flex items-start justify-between px-6 pt-8 pb-6">
      <div>
        <Typography variant="h5" color="blue-gray">
          Dashboard Configurator
        </Typography>
        <Typography className="font-normal text-blue-gray-600">
          See our dashboard options.
        </Typography>
      </div>
      <IconButton
  variant="text"
  color="blue-gray"
  onClick={setOpenConfigurator}
>
  <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
</IconButton>

    </div>
    <div className="py-4 px-6">
      <div className="mb-12">
        <Typography variant="h6" color="blue-gray">
          Sidenav Colors
        </Typography>
        <div className="mt-3 flex items-center gap-2">
          {Object.keys(sidenavColors).map((color) => (
            <span
              key={color}
              className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                sidenavColors[color]
              } ${
                sidenavColor === color ? "border-black" : "border-transparent"
              }`}
              onClick={() => setSidenavColor(dispatch, color)}
            />
          ))}
        </div>
      </div>
      <div className="mb-12">
        <Typography variant="h6" color="blue-gray">
          Sidenav Types
        </Typography>
        <Typography variant="small" color="gray">
          Choose between 3 different sidenav types.
        </Typography>
        <div className="mt-3 flex items-center gap-2">
          <Button
            variant={sidenavType === "dark" ? "gradient" : "outlined"}
            onClick={() => setSidenavType(dispatch, "dark")}
          >
            Dark
          </Button>
          <Button
            variant={sidenavType === "transparent" ? "gradient" : "outlined"}
            onClick={() => setSidenavType(dispatch, "transparent")}
          >
            Transparent
          </Button>
          <Button
            variant={sidenavType === "white" ? "gradient" : "outlined"}
            onClick={() => setSidenavType(dispatch, "white")}
          >
            White
          </Button>
        </div>
      </div>
      <div className="mb-12">
        <hr />
        <div className="flex items-center justify-between py-5">
          <Typography variant="h6" color="blue-gray">
            Navbar Fixed
          </Typography>
          <Switch
            id="navbar-fixed"
            value={fixedNavbar}
            onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
          />
        </div>
      </div>
     
    </div>
  </aside>
  );
}

Configurator.displayName = "/src/layout/configurator.tsx";

export default Configurator;
