import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  useEffect(() => {
    localStorage.removeItem("accessToken");
  }, []);

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};
