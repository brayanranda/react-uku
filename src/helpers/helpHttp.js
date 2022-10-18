export const helpHttp = () => {
  const customFech = (endpoint, options) => {
    const defaultHeader = { accept: "application/json" };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;
    options.headers = { ...options.headers };

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    options.maxContentLength = Infinity;
    options.maxBodyLength = Infinity;

    setTimeout(() => controller.abort(), 5000);

    return fetch(endpoint, options)
      .then(async (res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: (await res.json()) || "Ocurrio un Error",
            })
      )
      .catch((err) => err);
  };
  const get = (url, options = {}) => {
    return customFech(url, options);
  };
  const post = (url, options = {}) => {
    options.method = "POST";
    return customFech(url, options);
  };
  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFech(url, options);
  };
  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFech(url, options);
  };

  return { get, post, put, del };
};
