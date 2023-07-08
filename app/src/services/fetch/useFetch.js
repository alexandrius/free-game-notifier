import { useCallback, useEffect, useRef, useState, useContext, useMemo } from 'react';

import * as methods from './fetch';
import FetchContext from './fetch-context';

export default function useFetch({
  endpoint,
  params,
  body,
  method,
  fetchAlias = 'default',
  requestOnMount = true,
}) {
  const aliases = useContext(FetchContext);
  const url = useMemo(() => `${aliases[fetchAlias].baseUrl}${endpoint}`);

  // eslint-disable-next-line no-undef
  const abortController = useRef(new AbortController()).current;

  const request = useCallback(() => {
    const { signal } = abortController;
    methods[method]({ url, signal, params, body })
      .then((response) => {
        setRequestState((state) => ({ ...requestState, loading: false, response }));
      })
      .catch((error) => setRequestState((state) => ({ ...requestState, loading: false, error })));
  }, []);

  const [requestState, setRequestState] = useState({
    error: null,
    response: null,
    request,
    loading: requestOnMount,
  });

  useEffect(() => {
    if (requestOnMount) {
      request();
    }

    return () => {
      abortController.abort();
    };
  }, []);

  return requestState;
}

export function useGet(endpoint, params, fetchAlias) {
  return useFetch({ endpoint, ...params, fetchAlias, method: 'get' });
}

export function usePost(endpoint, body, params, fetchAlias) {
  return useFetch({ endpoint, body, ...params, fetchAlias, method: 'post' });
}

export function usePut(endpoint, body, params, fetchAlias) {
  return useFetch({ endpoint, body, ...params, fetchAlias, method: 'put' });
}

export function useDelete(endpoint, params, fetchAlias) {
  return useFetch({ endpoint, ...params, fetchAlias, method: 'del' });
}
