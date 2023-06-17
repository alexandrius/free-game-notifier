import { useCallback, useEffect, useRef, useState } from 'react';

import * as methods from './fetch';

export default function useFetch({ endpoint, params, body, method, requestOnMount = true }) {
  // eslint-disable-next-line no-undef
  const abortController = useRef(new AbortController()).current;

  const request = useCallback(() => {
    const { signal } = abortController;
    methods[method]({ endpoint, signal, params, body })
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

export function useGet(endpoint, params) {
  return useFetch({ endpoint, ...params, method: 'get' });
}

export function usePost(endpoint, body, params) {
  return useFetch({ endpoint, body, ...params, method: 'post' });
}

export function usePut(endpoint, body, params) {
  return useFetch({ endpoint, body, ...params, method: 'put' });
}

export function useDelete(endpoint, params) {
  return useFetch({ endpoint, ...params, method: 'del' });
}
