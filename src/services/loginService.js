import { apiRequest } from "../util/apiUtils";

export const SignInService = async (
  params,
  setLoaded = () => {},
  setResData = () => {}
) => {
  setLoaded(false);
  try {
    const res = await apiRequest("post", "user-login", {
      body: {
        email: params?.email,
        password: params?.password,
      },
    });
    const data = res.data;
    setResData(data);
    setLoaded(true);
    return res;
  } catch (error) {
    setResData(error);
    setLoaded(true);
    return error;
  }
};
export const SignIUpService = async (
  params,
  setLoaded = () => {},
  setResData = () => {}
) => {
  setLoaded(false);
  try {
    const res = await apiRequest(
      params?.id ? "put" : "post",
      params?.id ? `user/edit/${params.id}` : "signup",
      {
        body: {
          email: params?.email,
          id: params?.id,
          password: params?.password,
          firstName: params.firstName,
          lastName: params.lastName,
        },
      }
    );
    const data = res.data;
    setResData(data);
    setLoaded(true);
    return res;
  } catch (error) {
    setResData(error);
    setLoaded(true);
    return error;
  }
};

export const usersList = async (params) => {
  try {
    const res = await apiRequest("get", "user/list", {
      queries: params,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const usersDetails = async (params) => {
  try {
    const res = await apiRequest("get", `user/details/${params.id}`, {
      queries: params,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const usersDelete = async (params) => {
  try {
    const res = await apiRequest("patch", `user/delete`, {
      body: { id: [params?.id] },
    });
    return res;
  } catch (error) {
    return error;
  }
};
