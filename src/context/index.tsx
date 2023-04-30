import { createContext, useContext, useReducer, ReactNode } from "react";

type ControllerState = {
  miniSidenav: boolean;
  transparentSidenav: boolean;
  sidenavColor: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
  direction: "ltr" | "rtl";
  layout: "dashboard" | "custom";
};

type ControllerAction =
  | { type: "MINI_SIDENAV"; value: boolean }
  | { type: "TRANSPARENT_SIDENAV"; value: boolean }
  | { type: "SIDENAV_COLOR"; value: string }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean }
  | { type: "DIRECTION"; value: "ltr" | "rtl" }
  | { type: "LAYOUT"; value: "dashboard" | "custom" };

type ControllerDispatch = (action: ControllerAction) => void;

type VisionUIContextType = [ControllerState, ControllerDispatch];

// The Vision UI Dashboard Material main context
const VisionUI = createContext<VisionUIContextType | undefined>(undefined);

// Setting custom name for the context which is visible on React dev tools
VisionUI.displayName = "VisionUIContext";

// Vision UI Dashboard React reducer
function reducer(state: ControllerState, action: ControllerAction): ControllerState {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Vision UI Dashboard React context provider
function VisionUIControllerProvider({ children }: { children: ReactNode }) {
  const initialState: ControllerState = {
    miniSidenav: false,
    transparentSidenav: true,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  return <VisionUI.Provider value={[controller, dispatch]}>{children}</VisionUI.Provider>;
}

// Vision UI Dashboard React custom hook for using context
function useVisionUIController(): VisionUIContextType {
  const context = useContext(VisionUI);

  if (!context) {
    throw new Error("useVisionUIController should be used inside the VisionUIControllerProvider.");
  }

  return context;
}

// Context module functions

const setMiniSidenav = (dispatch: Dispatch<Action>, value: boolean) =>
  dispatch({ type: "MINI_SIDENAV", value });

const setTransparentSidenav = (dispatch: Dispatch<Action>, value: boolean) =>
  dispatch({ type: "TRANSPARENT_SIDENAV", value });

const setSidenavColor = (dispatch: Dispatch<Action>, value: string) =>
  dispatch({ type: "SIDENAV_COLOR", value });

const setTransparentNavbar = (dispatch: Dispatch<Action>, value: boolean) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });

const setFixedNavbar = (dispatch: Dispatch<Action>, value: boolean) =>
  dispatch({ type: "FIXED_NAVBAR", value });

const setOpenConfigurator = (dispatch: Dispatch<Action>, value: boolean) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });

const setDirection = (dispatch: Dispatch<Action>, value: string) =>
  dispatch({ type: "DIRECTION", value });

const setLayout = (dispatch: Dispatch<Action>, value: string) =>
  dispatch({ type: "LAYOUT", value });


  export {
    VisionUIControllerProvider,
    useVisionUIController,
    setMiniSidenav,
    setTransparentSidenav,
    setSidenavColor,
    setTransparentNavbar,
    setFixedNavbar,
    setOpenConfigurator,
    setDirection,
    setLayout,
  };