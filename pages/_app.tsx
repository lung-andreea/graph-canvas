import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "../utils/useLocalStorage/useLocalStorage";

import "../styles/globals.scss";

export const UserContext = React.createContext({ user: null, setUser: null });

function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useLocalStorage("user", null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", () => authCheck(router.asPath));

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authCheck = (url) => {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    if (!user && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.pathname },
      });
    } else {
      setAuthorized(true);
    }
  };

  return (
    <>
      <Head>
        <title>Graph Canvas app</title>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        {authorized && <Component {...pageProps} />}
      </UserContext.Provider>
    </>
  );
}

export default App;
