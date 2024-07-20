import React, { useState } from "react";

// Custom hook for form validation
const useForm = (initialState = {}, validationRules, steper) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const setFieldsValue = (data) => {
    setValues(data);
  };

  const handleChange = (e) => {
    let element = e.target.type;
    const { name, value, checked, files } = e.target;

    if (steper) {
      setErrors({});
    }

    switch (element) {
      case "checkbox":
        setValues({
          ...values,
          [name]: checked,
        });
        break;
      case "file":
        const multiple = e.target.multiple;

        if (multiple) {
          setValues({
            ...values,
            [name]: files,
          });
        } else {
          setValues({
            ...values,
            [name]: files[0],
          });
        }
        break;
      default:
        setValues({
          ...values,
          [name]: value,
        });
        break;
    }

    // Validate the field
    const newErrors = validateField(
      name,
      typeof value == "string" || typeof value == "number"
        ? value.trim()
        : value
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newErrors[name], // Update error for this field
    }));
  };

  const validateField = (fieldName, value) => {
    const fieldErrors = {};
    const rules = validationRules[fieldName];

    if (Array.isArray(rules)) {
      for (const rule of rules) {
        if (rule.required && !value) {
          fieldErrors[fieldName] = {
            message: rule.message || `${fieldName} is required`,
            type: rule?.errorType || "required",
          };
          break;
        }
        switch (rule.type) {
          case "email":
            if (
              value &&
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              fieldErrors[fieldName] = {
                message: rule.message || `${fieldName} is not a valid email`,
                type: rule?.errorType || "info",
              };
              break;
            }
            break;
          case "range":
            if (value && value.length > rule?.max) {
              fieldErrors[fieldName] = {
                message: rule.message || `invalid range`,
                type: rule?.errorType || "info",
              };
              setValues((pre) => {
                pre[fieldName] = value?.slice(0, rule?.max);
                return { ...pre };
              });
              break;
            }
            break;
          // case "regx":
          //   if (value && !rule?.regx.test(value)) {
          //     fieldErrors[fieldName] = {
          //       message: rule.message || `invalid range`,
          //       type: rule?.errorType || "info",
          //     };
          //     setValues((pre) => {
          //       pre[fieldName] = "";
          //       return { ...pre };
          //     });
          //     break;
          //   }
          //   break;

          default:
            break;
        }
      }
    } else if (rules && rules.required && !value) {
      fieldErrors[fieldName] = {
        message: rules.message || `${fieldName} is required`,
        type: rules?.errorType || "required",
      };
    }

    return fieldErrors;
  };

  const handleSubmit = (e, onSubmit = () => {}) => {
    e.preventDefault();
    const fieldsValues = {};

    if (values) {
      Object.keys(values)?.forEach((key) => {
        if (
          (values[key] && typeof values[key] === "string") ||
          typeof values[key] === "number"
        ) {
          fieldsValues[key] = values[key]?.trim();
        } else {
          fieldsValues[key] = values[key];
        }
      });
    }

    let formErrors = validateForm(fieldsValues);

    // Add confirm password validation
    if (values.password && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        formErrors.confirmPassword = {
          message: "Passwords do not match",
          type: "info",
        };
      }
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Submit the form
      formErrors = {};
      setErrors({});
      onSubmit(values);
    }
  };

  const validateForm = (values) => {
    const formErrors = {};
    for (const key in validationRules) {
      if (validationRules.hasOwnProperty(key)) {
        const value = values[key];
        const fieldErrors = validateField(key, value);
        if (Object.keys(fieldErrors).length > 0) {
          formErrors[key] = fieldErrors[key];
        }
      }
    }
    return formErrors;
  };

  function resetField(field = {}) {
    const fields = {};
    if (field && typeof field == "object" && Object.keys(field)?.length > 0) {
      Object.keys(field)?.forEach((key) => {
        setValues((pre) => ({ ...pre, [key]: field[key] || "" }));
      });
      return;
    }
    if (Object?.keys(initialState)?.length > 0) {
      Object.keys(initialState)?.forEach((key) => {
        fields[key] = "";
      });
      setValues(fields);
      setErrors({});
    } else {
      setValues({});
      setErrors({});
    }
  }

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
    setFieldsValue,
    resetField,
  };
};

export default useForm;
