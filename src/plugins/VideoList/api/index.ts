import { LocaleLang } from "@common";
import { message } from "antd";
import { assign } from "lodash";
import { Api, ApiConfig } from "./__generated__/api";
export * from "./__generated__/api";
export * from "./format";
export * from "./interface";
export { api, refreshApiConfig };

const refreshApiConfigCore = <T>(apiConfig?: ApiConfig<T>) => {
  const api = new Api(
    assign(
      {},
      {
        baseURL: SERVER_URL,
        baseApiParams: {
          headers: {
            lang: LocaleLang.Zh,
          },
        },
      },
      apiConfig
    )
  );
  api.instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      message.error(error.message);
      return Promise.reject(error);
    }
  );
  return api;
};

const { api: api, refreshApiConfig } = (() => {
  let api: Api<unknown> = null;
  return {
    api: (v?: Parameters<typeof refreshApiConfigCore>[0]) => {
      if (!api) {
        api = refreshApiConfigCore(v);
      }
      return api;
    },
    refreshApiConfig: (v: Parameters<typeof refreshApiConfigCore>[0]) => {
      api = refreshApiConfigCore(v);
      return api;
    },
  };
})();
