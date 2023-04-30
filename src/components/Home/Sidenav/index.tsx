import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import VuiBox from "../../subComponents/VuiBox/index";
import VuiTypography from "../../subComponents/VuiTypography/index";
import VuiButton from "../../subComponents/VuiButton/index";
import SidenavCollapse from "./SidenavCollapse";
import SidenavCard from "./SidenavCard";
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";

import { useVisionUIController, setMiniSidenav, setTransparentSidenav } from "../../../context/index";

// function Sidenav({ color, brand, brandName, routes, ...rest }) {
function Sidenav({ color, brandName, ...rest }) {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }
    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  useEffect(() => {
    if (window.innerWidth < 1440) {
      setTransparentSidenav(dispatch, false);
    }
  }, []);
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, route, href }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            color={color}
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink to={route} key={key}>
          <SidenavCollapse
            color={color}
            key={key}
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <VuiTypography
          key={key}
          color="white"
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </VuiTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider light key={key} />;
    }

    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <VuiBox
        pt={3.5}
        pb={0.5}
        px={4}
        textAlign="center"
        sx={{
          overflow: "unset !important",
        }}
      >
        <VuiBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <VuiTypography variant="h6" color="text">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </VuiTypography>
        </VuiBox>
        <VuiBox component={NavLink} to="/" display="flex" alignItems="center">
          <VuiBox
            sx={
              ((theme) => sidenavLogoLabel(theme, { miniSidenav }),
              {
                display: "flex",
                alignItems: "center",
                margin: "0 auto",
              })
            }
          >
            <VuiBox
              display="flex"
              sx={
                ((theme) => sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
                {
                  mr: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                })
              }
            >
             
            </VuiBox>
            <VuiTypography
              variant="button"
              textGradient={true}
              color="logo"
              fontSize={14}
              letterSpacing={2}
              fontWeight="medium"
              sx={
                ((theme) => sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
                {
                  opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                  maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
                  margin: "0 auto",
                })
              }
            >
              {brandName}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <Divider light />
      <List>{renderRoutes}</List>
      <VuiBox
        my={2}
        mx={2}
        mt="auto"
        sx={({ breakpoints }) => ({
          [breakpoints.up("xl")]: {
            pt: 2,
          },
          [breakpoints.only("xl")]: {
            pt: 1,
          },
          [breakpoints.down("xl")]: {
            pt: 2,
          },
        })}
      >
        <SidenavCard color={color} />
        <VuiBox mt={2}>
          <VuiButton
            component="a"
            href="https://creative-tim.com/product/vision-ui-dashboard-pro-react"
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            color={color}
            fullWidth
          >
            Upgrade to PRO
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  // brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  // brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
