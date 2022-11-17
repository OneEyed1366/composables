import { useState, useEffect } from "react";
/**
 * @template {unknown} T
 *
 * @param {string} url
 * @param {Record<string, unknown> urlParams}
 * @param {RequestInit} [requestParams={cache: "force-cache"}]
 *
 * @returns {{
 *   isPending: boolean,
 *   error?: string,
 *   data?: T,
 * }}
 * */
export function useFetch(url, urlParams, requestParams = { cache: "force-cache" }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const _url = (url += Object.entries(urlParams).reduce((acc, [key, value], idx, array) => {
    const _str = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

    if (idx < array.length - 1) return (acc += `${_str}&`);

    return (acc += _str);
  }, ""));
  /** @param {AbortSignal} signal */
  const _fetchFunction = async (signal) => {
    setIsPending(true);

    try {
      const _res = await fetch(_url, { ...requestParams, signal });

      if (_res.ok) setData(await _res.json());
      if (!_res.ok) setError(_res.statusText);
    } catch (error) {
      setError(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const { signal, abort } = new AbortController();

    _fetchFunction(signal);

    return () => {
      abort();
    };
  }, [url, urlParams]);

  return {
    isPending,
    data,
    error,
  };
}
