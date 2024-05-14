import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";

import { AUTH } from "./auth";
import LOADER from "./loader";
import TOASTER from "./toaster";

type AxiosRequestConfigTypes = AxiosRequestConfig & {
  loaderStatus?: boolean;
  hideToast?: boolean;
};

const makeRequestWith = (BASE_TYPE?: "BASE") => {
  const getBaseURL = (BASE_TYPE?: string) => {
    if (BASE_TYPE === "BASE") {
      return process.env.NEXT_PUBLIC_BASE_URL;
    }
    return "";
  };

  const axiosInstance = axios.create({
    baseURL: getBaseURL(BASE_TYPE)
  });

  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfigTypes): any => {
      if (config && config.headers) {
        if (
          !config.headers.Authorization &&
          !config.url?.includes("/public")
        ) {
          const token = AUTH.getAccessToken();
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        } else {
          if (String(config.headers.Authorization).match("undefined")) {
            delete config.headers.Authorization;
          }
        }
        if (!config.headers["Content-Type"]) {
          config.headers["Content-Type"] = "application/json";
        }
      }
      return config;
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        AUTH.cleanTokens();
        window.location.href = "/sign-in";
      }
      return error;
    }
  );
  return async (config: AxiosRequestConfigTypes) => {
    if (config?.loaderStatus !== false) {
      LOADER.show();
    }
    const configuration: AxiosRequestConfigTypes = {
      method: config.method || "get",
      url: config.url,
      data: config.data,
      headers: config.headers ? config.headers : {},
      params: config.params,
      timeout: config.timeout ? config.timeout : 100000,
      cancelToken: config.cancelToken
    };

    if (config.signal) {
      configuration.signal = config.signal;
    }
    return axiosInstance(configuration)
      .then((result: AxiosResponse) => {
        LOADER.hide();
        if (result && result.status >= 200 && result.status < 300) {
          return { status: result.status, ...result.data };
        }
        throw result;
      })
      .catch((err: AxiosError) => {
        const error = err as unknown as {
          response: {
            data: { error?: string; message: string; errorCode: number };
          };
        };
        LOADER.hide();
        if (!config.hideToast) {
          if (error?.response?.data?.message) {
            TOASTER.failed({ message: error.response.data.message });
          } else if (error?.response?.data?.error) {
            TOASTER.failed({ message: error.response.data.error });
          }
        }
        throw {
          error: {
            errorCode: error.response?.data?.errorCode,
            message: String(
              error.response?.data?.message || "Something went wrong"
            )
          }
        };
      });
  };
};

const makeRequestWithBase = makeRequestWith("BASE");

export { makeRequestWithBase, makeRequestWith };
