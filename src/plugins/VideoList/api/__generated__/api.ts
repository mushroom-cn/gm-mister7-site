/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TagDto {
  id: number;
  /**
   * @minLength 1
   * @maxLength 255
   * @default ""
   */
  name: string;
  /**
   * @minLength 1
   * @maxLength 255
   * @default ""
   */
  description?: string | null;
  /** @format YYYY-MM-DDTHH:mm:ss.sssZ */
  createDate: string;
  /** @format YYYY-MM-DDTHH:mm:ss.sssZ */
  modifyDate: string;
  /** @format YYYY-MM-DDTHH:mm:ss.sssZ */
  deleteDate: string | null;
}

export interface ActorDto {
  id: number;
  /**
   * @minLength 1
   * @maxLength 255
   * @default ""
   */
  name: string;
  /**
   * @minLength 1
   * @maxLength 255
   * @default ""
   */
  description?: string | null;
  /** @format YYYY-MM-DDTHH:mm:ss.sssZ */
  createDate: string;
  /** @format YYYY-MM-DDTHH:mm:ss.sssZ */
  modifyDate: string;
  /** @format YYYY-MM-DDTHH:mm:ss.sssZ */
  deleteDate: string | null;
  tags?: TagDto[];
}

export interface MediaDto {
  id: number;
  /**
   * @minLength 1
   * @maxLength 255
   * @default ""
   */
  name: string;
  /** @minLength 1 */
  path: string;
  target: string;
  /**
   * @minLength 1
   * @maxLength 255
   * @default ""
   */
  description?: string | null;
  /**
   * @minLength 1
   * @maxLength 255
   */
  mediaType: string;
  /** @default 0 */
  size: number;
  /** @format YYYY-MM-DDTHH:mm:ss.sssZ */
  createDate: string;
  /** @format YYYY-MM-DDTHH:mm:ss.sssZ */
  modifyDate: string;
  /** @format YYYY-MM-DDTHH:mm:ss.sssZ */
  deleteDate: string | null;
  actors?: ActorDto[];
  tags?: TagDto[];
}

export interface Gm7Error {
  code: string;
  message: string;
}

export interface BaseResult {
  error?: Gm7Error;
  status: number;
}

export interface DataResult {
  error?: Gm7Error;
  status: number;
  totalCount: number;
  data: any[];
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title gm-ffmpge
 * @version 1.0
 * @license MIT
 * @contact
 *
 * The ffmpeg API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  settings = {
    /**
     * No description
     *
     * @tags settings
     * @name ChangeLang
     * @request PUT:/settings/change/lang
     */
    changeLang: (
      query: {
        lang: "en" | "zh-cn";
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/settings/change/lang`,
        method: "PUT",
        query: query,
        ...params,
      }),
  };
  media = {
    /**
     * No description
     *
     * @tags media
     * @name Create
     * @request POST:/media
     */
    create: (data: MediaDto, params: RequestParams = {}) =>
      this.request<
        BaseResult & {
          data?: MediaDto[];
        } & {
          totalCount?: number;
        },
        | (BaseResult & {
            /** @default 400 */
            status?: number;
          })
        | BaseResult
        | (BaseResult & {
            /** @default 403 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 404 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 405 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 408 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 413 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 429 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 500 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 501 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 502 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 503 */
            status?: number;
          })
      >({
        path: `/media`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name Get
     * @request GET:/media
     */
    get: (
      query: {
        id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BaseResult & {
          data?: MediaDto[];
        } & {
          totalCount?: number;
        },
        | (BaseResult & {
            /** @default 400 */
            status?: number;
          })
        | BaseResult
        | (BaseResult & {
            /** @default 403 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 404 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 405 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 408 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 413 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 429 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 500 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 501 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 502 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 503 */
            status?: number;
          })
      >({
        path: `/media`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name Update
     * @request PUT:/media
     */
    update: (data: MediaDto, params: RequestParams = {}) =>
      this.request<
        BaseResult & {
          data?: MediaDto[];
        } & {
          totalCount?: number;
        },
        | (BaseResult & {
            /** @default 400 */
            status?: number;
          })
        | BaseResult
        | (BaseResult & {
            /** @default 403 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 404 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 405 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 408 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 413 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 429 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 500 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 501 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 502 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 503 */
            status?: number;
          })
      >({
        path: `/media`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name Delete
     * @request DELETE:/media
     */
    delete: (
      query: {
        ids: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BaseResult & {
          data?: MediaDto[];
        } & {
          totalCount?: number;
        },
        | (BaseResult & {
            /** @default 400 */
            status?: number;
          })
        | BaseResult
        | (BaseResult & {
            /** @default 403 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 404 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 405 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 408 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 413 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 429 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 500 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 501 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 502 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 503 */
            status?: number;
          })
      >({
        path: `/media`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name List
     * @request GET:/media/list
     */
    list: (
      query?: {
        page?: number;
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BaseResult & {
          data?: MediaDto[];
        } & {
          totalCount?: number;
        },
        | (BaseResult & {
            /** @default 400 */
            status?: number;
          })
        | BaseResult
        | (BaseResult & {
            /** @default 403 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 404 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 405 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 408 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 413 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 429 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 500 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 501 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 502 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 503 */
            status?: number;
          })
      >({
        path: `/media/list`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name Reindex
     * @request GET:/media/reindex
     */
    reindex: (params: RequestParams = {}) =>
      this.request<any[], any>({
        path: `/media/reindex`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name TagBind
     * @request PUT:/media/tag/bind
     */
    tagBind: (
      query: {
        mediaId: number;
        tagIds: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BaseResult & {
          data?: MediaDto[];
        } & {
          totalCount?: number;
        },
        | (BaseResult & {
            /** @default 400 */
            status?: number;
          })
        | BaseResult
        | (BaseResult & {
            /** @default 403 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 404 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 405 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 408 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 413 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 429 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 500 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 501 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 502 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 503 */
            status?: number;
          })
      >({
        path: `/media/tag/bind`,
        method: "PUT",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name TagUnbind
     * @request DELETE:/media/tag/unbind
     */
    tagUnbind: (
      query: {
        mediaId: number;
        tagIds: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/media/tag/unbind`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name ActorBind
     * @request PUT:/media/actor/bind
     */
    actorBind: (
      query: {
        mediaId: number;
        actorIds: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/media/actor/bind`,
        method: "PUT",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name ActorUnbind
     * @request DELETE:/media/actor/unbind
     */
    actorUnbind: (
      query: {
        mediaId: number;
        actorIds: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/media/actor/unbind`,
        method: "DELETE",
        query: query,
        ...params,
      }),
  };
  tag = {
    /**
     * No description
     *
     * @tags tag
     * @name Get
     * @request GET:/tag
     */
    get: (
      query: {
        id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/tag`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags tag
     * @name Create
     * @request POST:/tag
     */
    create: (data: TagDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tag`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags tag
     * @name Update
     * @request PUT:/tag/{id}
     */
    update: (id: string, data: TagDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tag/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags tag
     * @name Delete
     * @request DELETE:/tag/{id}
     */
    delete: (
      id: string,
      query: {
        id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/tag/${id}`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags tag
     * @name List
     * @request GET:/tag/list
     */
    list: (
      query?: {
        page?: number;
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/tag/list`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  actors = {
    /**
     * No description
     *
     * @tags actors
     * @name Create
     * @request POST:/actors
     */
    create: (data: ActorDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/actors`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags actors
     * @name Get
     * @request GET:/actors
     */
    get: (
      query: {
        id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/actors`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags actors
     * @name Update
     * @request PUT:/actors
     */
    update: (data: ActorDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/actors`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags actors
     * @name Delete
     * @request DELETE:/actors
     */
    delete: (
      query: {
        ids: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/actors`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags actors
     * @name List
     * @request GET:/actors/list
     */
    list: (
      query?: {
        pageSize?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BaseResult & {
          data?: ActorDto[];
        } & {
          totalCount?: number;
        },
        | (BaseResult & {
            /** @default 400 */
            status?: number;
          })
        | BaseResult
        | (BaseResult & {
            /** @default 403 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 404 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 405 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 408 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 413 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 429 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 500 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 501 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 502 */
            status?: number;
          })
        | (BaseResult & {
            /** @default 503 */
            status?: number;
          })
      >({
        path: `/actors/list`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags actors
     * @name Bind
     * @request PUT:/actors/tag/bind
     */
    bind: (
      query: {
        actorId: number;
        tagIds: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/actors/tag/bind`,
        method: "PUT",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags actors
     * @name Unbind
     * @request DELETE:/actors/tag/unbind
     */
    unbind: (
      query: {
        actorId: number;
        tagIds: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/actors/tag/unbind`,
        method: "DELETE",
        query: query,
        ...params,
      }),
  };
  rtmp = {
    /**
     * No description
     *
     * @tags rtmp
     * @name Pull
     * @request GET:/rtmp/pull
     */
    pull: (
      query: {
        resource: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/rtmp/pull`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags rtmp
     * @name PushToMeiaServer
     * @request PUT:/rtmp/push
     */
    pushToMeiaServer: (
      query: {
        resource: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/rtmp/push`,
        method: "PUT",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags rtmp
     * @name StopPushToMeiaServer
     * @request DELETE:/rtmp/stop
     */
    stopPushToMeiaServer: (resource: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/rtmp/stop`,
        method: "DELETE",
        ...params,
      }),
  };
}
