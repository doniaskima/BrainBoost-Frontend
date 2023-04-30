import { Typography, styled } from "@mui/material";

interface VuiTypographyProps {
  color?: "inherit" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark" | "text" | "white" | "logo";
  fontWeight?: false | "light" | "regular" | "medium" | "bold";
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  verticalAlign?: "unset" | "baseline" | "sub" | "super" | "text-top" | "text-bottom" | "middle" | "top" | "bottom";
  textGradient?: boolean;
  opacity?: number;
  children: React.ReactNode;
}

const VuiTypography = styled(Typography)<VuiTypographyProps>(({ theme, ownerState }) => {
  const { palette, typography, functions } = theme;
  const { color = "dark", textTransform = "none", verticalAlign = "unset", fontWeight, opacity = 1, textGradient } = ownerState;

  const { gradients, transparent } = palette;
  const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold } = typography;
  const { linearGradient } = functions;

  // fontWeight styles
  const fontWeights = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  // styles for the typography with textGradient={true}
  const gradientStyles = () => ({
    backgroundImage:
      color !== "inherit" && color !== "text" && color !== "white" && gradients[color]
        ? linearGradient(gradients[color].main, gradients[color].state, gradients[color].deg)
        : linearGradient(gradients.primary.main, gradients.primary.state),
    display: "inline-block",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: transparent.main,
    position: "relative",
    zIndex: 1,
  });

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: "none",
    color: color === "inherit" || !palette[color] ? "inherit" : palette[color].main,
    fontWeight: fontWeights[fontWeight] && fontWeights[fontWeight],
    ...(textGradient && gradientStyles()),
  };
});

export default VuiTypography;
