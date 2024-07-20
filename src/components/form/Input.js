import React, { useEffect, useState, useRef } from "react";
import { classNames } from "../../helpers/classNames";

const Input = ({
  label,
  labelClasses,
  inputType,
  inputClasses,
  inputPlaceholder,
  value,
  inputValue,
  inputName,
  isInputGroup = false,
  inputGroupIcon,
  inputGroupPosition,
  errorType,
  errorText,
  isDisabled,
  onChange = () => {},
  ...props
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const passwordInput = useRef(null);
  const handleChange = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  useEffect(() => {
    passwordInput.current.type = passwordVisibility ? "text" : inputType;
  }, [passwordVisibility]);

  return (
    <>
      {label && <div className={classNames("text-sm font-medium text-slate-500 mb-1", labelClasses)}>{label}</div>}
      <div className="relative flex">
        {isInputGroup && inputGroupPosition === "left" && (
          <div className="w-10 min-w-[40px] flex items-center justify-center border border-slate-200 rounded-md rounded-r-none bg-slate-50 text-sm text-slate-500">
            <i className={classNames("fa-fw", inputGroupIcon)}></i>
          </div>
        )}
        <div className="w-full">
          <div className="relative flex">
            {isDisabled ? (
              <input
                type={inputType}
                ref={passwordInput}
                className={classNames(
                  "w-full h-10 rounded-md bg-slate-50 border border-slate-200 px-3 text-sm text-slate-600 !ring-0 !outline-0 focus:border-victoria focus:bg-carnation-50 transition-all duration-200",
                  inputClasses,
                  isInputGroup
                    ? inputGroupPosition === "left"
                      ? "!border-l-none !rounded-l-none -ml-[1px]"
                      : ""
                    : inputGroupPosition === "right"
                    ? "!border-r-none !rounded-r-none -mr-[1px]"
                    : ""
                )}
                value={value}
                placeholder={inputPlaceholder}
                name={inputName}
                defaultValue={inputValue}
                autoComplete={"new-" + inputType}
                disabled
              />
            ) : (
              <input
                type={inputType}
                ref={passwordInput}
                className={classNames(
                  "w-full h-10 rounded-md bg-slate-50 border border-slate-200 px-3 text-sm text-slate-600 !ring-0 !outline-0 focus:border-victoria focus:bg-carnation-50 transition-all duration-200",
                  inputClasses,
                  isInputGroup
                    ? inputGroupPosition === "left"
                      ? "!border-l-none !rounded-l-none -ml-[1px]"
                      : ""
                    : inputGroupPosition === "right"
                    ? "!border-r-none !rounded-r-none -mr-[1px]"
                    : ""
                )}
                placeholder={inputPlaceholder}
                name={inputName}
                value={value}
                // defaultValue={inputValue}
                onChange={onChange}
                autoComplete={"new-" + inputType}
              />
            )}
            {inputType === "password" && (
              <button
                type="button"
                className="w-10 h-10 absolute top-0 right-0 bg-transparent text-slate-500"
                onClick={handleChange}
              >
                <i className={classNames("fa-regular fa-fw", passwordVisibility ? "fa-eye-slash" : "fa-eye")}></i>
              </button>
            )}
          </div>
        </div>
        {isInputGroup && inputGroupPosition === "right" && (
          <div className="w-10 min-w-[40px] flex items-center justify-center border border-slate-200 rounded-md rounded-l-none bg-slate-50 text-sm text-slate-500">
            <i className={classNames("fa-fw", inputGroupIcon)}></i>
          </div>
        )}
      </div>
      {errorType && errorType === "danger" && (
        <div className="text-xs text-red-600 mt-1">
          <i className="fa-regular fa-fw fa-square-exclamation text-sm mr-1"></i>
          {errorText}
        </div>
      )}
      {errorType && errorType === "warning" && (
        <div className="text-xs text-amber-600 mt-1">
          <i className="fa-regular fa-fw fa-triangle-exclamation text-sm mr-1"></i>
          {errorText}
        </div>
      )}
      {errorType && errorType === "success" && (
        <div className="text-xs text-green-600 mt-1">
          <i className="fa-regular fa-fw fa-circle-check text-sm mr-1"></i>
          {errorText}
        </div>
      )}
      {errorType && errorType === "info" && (
        <div className="text-xs text-sky-600 mt-1">
          <i className="fa-regular fa-fw fa-circle-info text-sm mr-1"></i>
          {errorText}
        </div>
      )}
    </>
  );
};

export default Input;
