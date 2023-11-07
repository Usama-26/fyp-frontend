// userTypeGuard.js
import { useAccounts } from "@/context/AccountContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withRouteProtect = (WrappedComponent, allowedUserTypes) => {
  return function RouteProtect(props) {
    const router = useRouter();
    const [isAvailable, setIsAvailable] = useState(true);

    const { user } = useAccounts();

    useEffect(() => {
      if (!window.localStorage.getItem("token")) {
        router.push("/access_denied");
      }
      if (user) {
        if (!allowedUserTypes.includes(user.data.user_type)) {
          router.back();
          setIsAvailable(false);
        }
      }
    }, [user, router]);

    return user && isAvailable ? <WrappedComponent {...props} /> : null;
  };
};

export default withRouteProtect;
