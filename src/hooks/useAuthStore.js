import { useDispatch, useSelector } from "react-redux";
import { changeStatusAuth, onChangeMsgErrorLog } from "../store";
import { changePassword, loginAdmin } from "../api/auth.api";

//
//
//
//

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const { authenticatedStatus, errorMsgAuth } = useSelector(
    (state) => state.auth
  );

  const checkAuthStatus = () => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      dispatch(changeStatusAuth(true));
    } else {
      dispatch(changeStatusAuth(false));
    }
  };

  const login = async (password) => {
    try {
      await loginAdmin({ passwordUser: password });

      localStorage.setItem("auth", true);
      dispatch(onChangeMsgErrorLog({ msg: "Sin errores", error: "" }));
      dispatch(changeStatusAuth(true));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        onChangeMsgErrorLog({
          msg: "Hay errores",
          error: error.response.data.message,
        })
      );
    }
  };

  const updatePassword = async (actPass, newPass) => {
    try {
      await changePassword({
        passwordUser: actPass,
        newPassword: newPass,
      });

      dispatch(onChangeMsgErrorLog({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        onChangeMsgErrorLog({
          msg: "Hay errores",
          error: error.response.data.message,
        })
      );
    }
  };

  const logout = () => {
    // localStorage.setItem("auth", false);
    // localStorage.removeItem()
    localStorage.clear();
    dispatch(changeStatusAuth(false));
  };

  return {
    //* Propiedades
    authenticatedStatus,
    errorMsgAuth,

    //* Métodos
    checkAuthStatus,
    login,
    logout,
    updatePassword,
  };
};
