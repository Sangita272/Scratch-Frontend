export const Validation = (type, value, compareValue = "") => {
    switch (type) {
      case "name":
        return value.trim().length > 0;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case "phone":
        const phoneRegex = /^\d{10}$/; // Example for a 10-digit phone number
        return phoneRegex.test(value);
      case "password":
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        return passwordRegex.test(value);
      case "confirmPassword":
        return value === compareValue;
      default:
        return false;
    }
  };
  