import { forwardRef, ForwardRefRenderFunction } from "react";
import PropTypes from "prop-types";

// Custom styles for VuiTypography
import VuiTypographyRoot from "./VuiTypographyRoot";

interface VuiTypographyProps {
  color?: "inherit" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark" | "text" | "white" | "logo";
  fontWeight?: false | "light" | "regular" | "medium" | "bold";
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  verticalAlign?: "unset" | "baseline" | "sub" | "super" | "text-top" | "text-bottom" | "middle" | "top" | "bottom";
  textGradient?: boolean;
  opacity?: number;
  children: React.ReactNode;
}

const VuiTypography: ForwardRefRenderFunction<HTMLDivElement, VuiTypographyProps> = (
  {
    color = "dark",
    fontWeight = false,
    fontSize = "16px",
    textTransform = "none",
    verticalAlign = "unset",
    textGradient = false,
    opacity = 1,
    children,
    ...rest
  },
  ref
) => (
  <VuiTypographyRoot
    {...rest}
    ref={ref}
    ownerState={{
      color,
      textTransform,
      verticalAlign,
      fontSize,
      fontWeight,
      opacity,
      textGradient,
    }}
  >
    {children}
  </VuiTypographyRoot>
);

// Typechecking props for the VuiTypography
VuiTypography.propTypes = {
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
    "logo",
  ]),
  fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
};

export default forwardRef(VuiTypography);
