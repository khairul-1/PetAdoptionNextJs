// components/PrivateRoute.tsx
import { useEffect, useState } from "react";
import { decode } from "jwt-js-decode";

const PrivateRoute = (WrappedComponent: React.FC<any>) => {
  const AuthenticatedComponent: React.FC<any> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken: any = decode(token);
          //console.log(decodedToken.payload.type);
          const currentTime = Date.now() / 1000;

          if (decodedToken.payload.exp < currentTime) {
            // Token has expired

            localStorage.removeItem("token");
            window.location.href = "/login";
          } else {
            // Token is valid
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } else {
        window.location.href = "/login";
      }

      setIsLoading(false);
    }, []);

    if (isLoading) {
      return <div>Loading...</div>; // You can add a loading spinner here
    }

    if (!isAuthenticated) {
      return null; // or a redirect component
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default PrivateRoute;
