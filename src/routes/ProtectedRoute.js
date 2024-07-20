

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = (props) => {

  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(true);
  const [auth, setAuth] = useState(false);
  let token_ = localStorage.getItem("auth_token");
  useEffect(() => {

    if (!token_) {
      setIsLoader(false);
      navigate("/login");
    }
  }, [token_]);

  return <>{props.children}</>;
};
export default ProtectedRoute;
