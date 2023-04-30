import React, { forwardRef, ForwardedRef } from "react";
import PropTypes from "prop-types";


type VuiBoxProps = {
  variant?: "contained" | "gradient";
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string;
  shadow?: string;
};

const VuiBox = forwardRef(
  (
    {
      variant = "contained",
      bgColor = "transparent",
      color = "dark",
      opacity = 1,
      borderRadius = "none",
      shadow = "none",
      ...rest
    }: VuiBoxProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const ownerState = { variant, bgColor, color, opacity, borderRadius, shadow };
    const rootProps = { ...rest };
    return <VuiBoxRoot {...rootProps} ref={ref} ownerState={ownerState} />;

  }
);

VuiBox.defaultProps = {
  variant: "contained",
  bgColor: "transparent",
  color: "dark",
  opacity: 1,
  borderRadius: "none",
  shadow: "none",
};

VuiBox.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
};

export default VuiBox;
