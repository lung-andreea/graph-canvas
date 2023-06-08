import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "../utils/useLocalStorage/useLocalStorage";

import "../styles/globals.scss";

export default App;

function App({ Component, pageProps }) {
  const router = useRouter();
  const [user] = useLocalStorage("user", null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

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
      {authorized && <Component {...pageProps} />}
    </>
  );
}
