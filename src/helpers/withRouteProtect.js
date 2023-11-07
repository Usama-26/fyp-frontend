// userTypeGuard.js
import { useAccounts } from "@/context/AccountContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withRouteProtect = (WrappedComponent, allowedUserTypes) => {
  return function RouteProtect(props) {
    const router = useRouter();
    const [isAvailable, setIsAvailable] = useState(true);
    const [userType, setUserType] = useState("visitor");
    const { user } = useAccounts();

    const switchUserType = (type) => {
      setUserType(type);
    };

    useEffect(() => {
      if (!window.localStorage.getItem("token")) {
        router.push("/access_denied");
      }
      if (user) {
        switchUserType(user.data.user_type);
        if (!allowedUserTypes.includes(userType)) {
          router.back();
          setIsAvailable(false);
        }
      }
    }, [user, router]);

    return user && isAvailable ? <WrappedComponent {...props} /> : null;
  };
};

export default withRouteProtect;
