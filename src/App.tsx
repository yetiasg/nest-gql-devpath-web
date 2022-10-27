import "./App.css";
import { LoginButton } from "./components/login-btn";
import { LogoutButton } from "./components/logout-btn";
import { ProductsList } from "./components/products";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function App() {
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: String(process.env.REACT_APP_AUTH0_DOMAIN),
          scope: "read:current_user",
        });

        if (!!accessToken) localStorage.setItem("accessToken", accessToken);
      } catch (e: any) {
        console.log({ e: e.message });
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user]);

  return (
    <div className="App">
      <header className="App-header">
        <LoginButton />
        <LogoutButton />
        <ProductsList />
      </header>
    </div>
  );
}
