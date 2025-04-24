import { ReactNode } from "react";
import { useAppSelector } from "../../redux/features/hooks";
import { logout, setCurrentUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
}

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(setCurrentUser);
  const dispatch = useDispatch();

  if( role !== undefined && role !== user?.role){
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }


  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
