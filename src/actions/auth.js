import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
// import toast from "react-hot-toast";
import swal from 'sweetalert';


export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    swal("Signed In Successfully");

    router.push('/');
  } catch (error) {
    console.log(error);
    swal("Something Went Wrong","Please Enter Correct Details");
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
