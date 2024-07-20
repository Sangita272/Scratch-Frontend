export const formValidate = (errors, name) => {
    const error_obj = {};
    if (errors && errors[name] && name && Object.keys(errors[name])?.length > 0) {
      error_obj[`errorType`] =
        errors[name]?.type === "required" ? "warning" : "denger";
      error_obj[`errorText`] = errors[name]?.message;
    }
  
    return error_obj;
  };