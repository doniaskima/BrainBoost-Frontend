import React from "react";

const Home = () => {
    const logout = () => {
        window.open("http://localhost:3900/auth/logout", "_self");
      };
  return <div>
<button className="listItem" onClick={logout}>
  Logout
</button></div>;
};

export default Home;
