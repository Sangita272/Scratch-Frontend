import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  SignInService,
  SignIUpService,
  usersDetails,
} from "../../services/loginService";
import Logo from "../../assets/images/favicon.png";
import { formValidate } from "../../helpers/formValidate";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import useForm from "../../hooks/useForm";

const Add = () => {
  const { id } = useParams();

  const validation = {
    email: { required: true, message: "Email is required" },
    password: { required: id ? false : true, message: "Password is required" },
    firstName: { required: true, message: "First Name is required" },
    lastName: { required: true, message: "Last Name is required" },
  };
  const { values, handleChange, handleSubmit, errors, setFieldsValue } =
    useForm({}, validation);
  const backgroundStyle = {
    backgroundColor: "#f1f5f9",
    // backgroundImage:`url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    color: "red-600",
    message: null,
  });
  const [loaded, setLoaded] = useState(true);

  const onSubmit = async (values) => {
    setLoaded(false);
    try {
      await SignIUpService({
        id: id ? id : null,
        email: values?.email,
        password: values?.password,
        firstName: values.firstName,
        lastName: values.lastName,
      }).then((res) => {
        if (res?.data?.status === 200) {
          setErrorMessage({ color: "teal-500", message: res.data.message });
          setTimeout(function () {
            navigate("/");
          }, 2000);
        } else {
          setErrorMessage({
            color: "red-600",
            message: res?.data?.message || res?.data?.error,
          });
          toast.info(res?.data?.message || res?.data?.error);
        }
      });
      setLoaded(true);
    } catch (error) {
      // console.error("Error adding category:", error);
      setLoaded(true);
      toast.error(error);
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    if (id) {
      usersDetails({ id }).then((res) => {
        console.log(res, "pp");
        if (res && res?.data?.status == 200) {
          setFieldsValue({
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            email: res.data.data.email,
          });
        }
      });
    }
  }, [id]);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center py-3 px-5"
      style={backgroundStyle}
    >
      <div className="w-full max-w-md xl:max-w-md bg-white py-10 rounded-2xl">
        <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-4 lg:px-2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-1 text-center text-xl font-bold leading-9 tracking-tight text-slate-600">
              {id ? "Edit User" : "Add New User"}
            </h2>
          </div>

          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(event) => handleSubmit(event, onSubmit)}>
              <div className="mt-2">
                <Input
                  label={"First Name"}
                  labelClasses={"!text-xs"}
                  inputType={"text"}
                  inputPlaceholder={"Enter first your name"}
                  value={values?.firstName}
                  inputName={"firstName"}
                  onChange={handleChange}
                  {...formValidate(errors, "firstName")}
                />
              </div>
              <div className="mt-2">
                <Input
                  label={"Last Name"}
                  labelClasses={"!text-xs"}
                  inputType={"text"}
                  inputPlaceholder={"Enter your last name"}
                  value={values?.lastName}
                  inputName={"lastName"}
                  onChange={handleChange}
                  {...formValidate(errors, "lastName")}
                />
              </div>
              <div className="mt-2">
                <Input
                  label={"Email"}
                  labelClasses={"!text-xs"}
                  inputType={"text"}
                  inputPlaceholder={"Enter your email"}
                  value={values?.email}
                  inputName={"email"}
                  onChange={handleChange}
                  {...formValidate(errors, "email")}
                />
              </div>

              <div>
                {!id && (
                  <div className="mt-2">
                    <Input
                      label={"Password"}
                      labelClasses={"!text-xs"}
                      inputType={"password"}
                      inputPlaceholder={"Enter your password"}
                      value={values?.password}
                      inputName={"password"}
                      onChange={handleChange}
                      {...formValidate(errors, "password")}
                    />
                  </div>
                )}
              </div>

              <div className="mt-2">
                <Button
                  buttonClasses={
                    "w-full text-white hover:bg-secondaryColor focus-visible:outline justify-center rounded-md"
                  }
                  buttonHasLink={false}
                  buttonType={"submit"}
                  buttonLabel={"Submit"}
                  buttonIconPosition={"left"}
                  buttonIcon={"fa-light fa-right-to-bracket"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
