import React from "react";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, href, ...props }) => (
  <a href={href} {...props} className={`py-2.5 px-4 text-center rounded-lg duration-150 ${props?.className || ""}`}>
    {children}
  </a>
);

export default NavLink;
