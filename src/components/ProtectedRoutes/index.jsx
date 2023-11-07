import { useRef, useState } from "react";
import { useEffect } from "react";
import { useAccounts } from "@/context/AccountContext";

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ children, router }) => {
  let pathAvailable = true;
  const prePath = useRef(true);
  const { isLoggedIn, user } = useAccounts();
  const [userType, setUserType] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded, SetIsLoaded] = useState(false);

  let unprotectedRoutes = [
    "/",
    "/contact",
    "/about",
    "/auth/login",
    "/auth/signup",
    "/projects",
    "/freelancers",
    "/freelancer/join",
    "/auth/forgot_password",
  ];

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
  useEffect(() => {
    if (isLoggedIn) {
      setIsAuthenticated(isLoggedIn);
      setUserType(user?.user_type);
    }
    SetIsLoaded(true);
  }, [isLoggedIn]);

  if (loaded) {
    if (isBrowser() && !isAuthenticated && pathIsProtected) {
      router.push("/auth/login");
    } else {
      if (
        router.pathname.startsWith("/client") &&
        userType !== "client" &&
        pathIsProtected
      ) {
        pathAvailable = false;
        prePath.current = false;
      }
      if (
        router.pathname.startsWith("/freelancer") &&
        userType !== "freelancer" &&
        pathIsProtected
      ) {
        pathAvailable = false;
        prePath.current = false;
      }
    }

    if ((isAuthenticated || !pathIsProtected) && pathAvailable) return children;
  }
};

export default ProtectedRoute;
