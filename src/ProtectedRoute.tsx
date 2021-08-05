import { Route, Redirect, RouteProps } from "react-router-dom";

interface ProtectedRouteProps extends RouteProps {
  currentUser: any;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  currentUser,
  ...rest
}) => {
  return currentUser === "noUser" ? <Redirect to="/" /> : <Route {...rest} />;
};
