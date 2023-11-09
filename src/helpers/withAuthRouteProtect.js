import { useAccounts } from "@/context/AccountContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuthRouteProtect = (WrappedComponent) => {
  return function RouteProtect(props) {
    const router = useRouter();
    const [isAvailable, setIsAvailable] = useState(true);

    const { user } = useAccounts();

    useEffect(() => {
      if (window.localStorage.getItem("token")) {
        setIsAvailable(false);
        router.push("/");
      }
    }, [router]);

    return !user && isAvailable ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuthRouteProtect;
