import { useDispatch, useSelector } from "react-redux";
import { onChangeMsgErrorLog } from "../../store";
import { changePassword, loginAdmin } from "../../api/auth.api";

//
//
//
//

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const { errorMsgAuth } = useSelector((state) => state.auth);

  const login = async (password) => {
    try {
      await loginAdmin({ passwordUser: password });
      localStorage.setItem("auth", true);
      dispatch(onChangeMsgErrorLog({ msg: "Sin errores", error: "" }));
      window.location.reload();

      //
    } catch (error) {
      console.log(error);
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

      //
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
    localStorage.clear();
    window.location.reload();
  };

  return {
    //* Propiedades

    errorMsgAuth,

    //* Métodos

    login,
    logout,
    updatePassword,
  };
};
