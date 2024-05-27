// components/PrivateRoute.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PrivateRoute = (WrappedComponent: React.FC<any>) => {
  const AuthenticatedComponent: React.FC<any> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        //router.push("/login");
        window.location.href = "/login"; // Redirect to login if not authenticated
      }
    });

    if (!isAuthenticated) {
      return <div>Loading...</div>; // You can add a loading spinner here
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default PrivateRoute;
