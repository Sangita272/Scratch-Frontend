import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../constant/ApiConstant";

const builderQueryString = (queries = [], contentType = "application/json") => {
  let queryString = "";
  if (queries) {
    Object.keys(queries).forEach((query) => {
      if (Array.isArray(queries[query]) && queries[query].length) {
        queries[query].forEach((item) => {
          queries[`${query}[]`] = item;
        });

        delete queries[query];
      }
    });

    queryString = new URLSearchParams(queries);
    queryString = "?" + queryString.toString();
  }

  return queryString;
};
function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}
export const apiRequest = async (
  method = "put",
  url = "",
  payload = { body: null, queries: null },
  contentType = "application/json",
  options = { useCustomUrl: false, showToastMessage: false }
) => {
  let defaultPayload = { body: null, queries: null };
  payload = { ...payload, defaultPayload };

  let defaultOptions = { useCustomUrl: false, showToastMessage: false };
  options = { ...options, defaultOptions };

  let queryString = "";
  if (payload.queries != null) {
    queryString = builderQueryString(payload?.queries, contentType);
  }

  let accessToken = localStorage.getItem("auth_token");

  let headers = { "Content-Type": contentType };

  let payloadData = payload.body;
  if (contentType.includes("form-data")) {
    payloadData = jsonToFormData(payload.body);
  }

  const refreshToken = localStorage.getItem("refreshToken");

  try {
    if (accessToken) {
      headers = {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    const request = axios.create({
      baseURL: options.useCustomUrl ? "" : API_BASE_URL,
      headers,
    });

    let res = await request[method.toLowerCase()](
      `${url}${queryString}`,
      method === "delete" ? { data: payloadData } : payloadData
    );

    if (res.status === 401 && res.data.tokenExpired && refreshToken) {
      const tokenRes = await request.post("refreshToken", {
        refreshToken,
      });

      if (tokenRes.data && tokenRes.data.accessToken) {
        request.defaults.headers = {
          ...headers,
          Authorization: `Bearer ${tokenRes.data.accessToken}`,
        };

        res = await request[method.toLowerCase()](
          `${url}${queryString}`,
          method === "delete" ? { data: payloadData } : payloadData
        );
      }
    }

    if (res.status) {
      if (options.showToastMessage) {
        if (res.data?.message) {
          toast.success(res.data?.message);
        }
        if (res.data?.data?.message) {
          toast.success(res.data?.data?.message);
        }
      }
      return res;
    } else {
      if (options.showToastMessage) {
        if (res?.data?.message) {
          toast.error(res?.data?.message);
        }
        if (res?.data?.data?.message) {
          toast.error(res?.data?.data?.message);
        }
      }
      throw new Error(res?.message || res);
    }
  } catch (error) {
    if (options.showToastMessage) {
      toast.error(error?.response?.data);
    }

    if (
      error?.response?.status === 401 &&
      error?.response?.data &&
      error?.response?.data?.tokenExpired &&
      refreshToken
    ) {
      const request = axios.create({
        baseURL: options.useCustomUrl ? "" : API_BASE_URL,
        headers,
      });

      const tokenRes = await request.post("refreshToken", {
        refreshToken,
      });

      if (tokenRes.data && tokenRes.data.accessToken) {
        localStorage.setItem("auth_token", tokenRes.data.accessToken);
        localStorage.setItem("refreshToken", tokenRes.data.refreshToken);

        request.defaults.headers = {
          ...headers,
          Authorization: `Bearer ${tokenRes.data.accessToken}`,
        };

        const res = await request[method.toLowerCase()](
          `${url}${queryString}`,
          method === "delete" ? { data: payloadData } : payloadData
        );

        if (res.status) {
          if (options.showToastMessage) {
            if (res.data?.message) {
              toast.success(res.data?.message);
            }
            if (res.data?.data?.message) {
              toast.success(res.data?.data?.message);
            }
          }
          return res;
        } else {
          if (options.showToastMessage) {
            if (res.data?.message) {
              toast.error(res.data?.message);
            }
            if (res.data?.data?.message) {
              toast.error(res.data?.data?.message);
            }
          }
          throw new Error(res?.message || res);
        }
      }
    }
    throw error.response;
  }
};
