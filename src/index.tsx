import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URI,
});

const token = localStorage.getItem("accessToken");

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <Auth0Provider
      domain={String(process.env.REACT_APP_AUTH0_DOMAIN)}
      clientId={String(process.env.REACT_APP_AUTH0_CLIENT_ID)}
      audience={String(process.env.REACT_APP_AUTH0_AUDIENCE)}
      redirectUri={window.location.origin}
      scope={String(process.env.REACT_APP_AUTH0_SCOPE)}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Auth0Provider>
  </ApolloProvider>
);
