import { useState, useEffect } from "react";

interface IFetchReturn<T> {
  isPending: boolean;
  error?: string;
  data?: T;
}

export function useFetch<T extends unknown>(
  url: string,
  urlParams: Record<string, unknown>,
  requestParams: RequestInit = { cache: "force-cache" },
): IFetchReturn<T> {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const _url = (url += Object.entries(urlParams).reduce((acc, [key, value], idx: number, array) => {
    const _str = `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;

    if (idx < array.length - 1) return (acc += `${_str}&`);

    return (acc += _str);
  }, ""));

  const _fetchFunction = async (signal: AbortSignal) => {
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
