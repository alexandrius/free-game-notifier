import { useEffect, useRef } from 'react';

export default function useEffectAfter(method, deps) {
  const firstSkipped = useRef(false);
  useEffect(() => {
    if (firstSkipped.current) method();
    else firstSkipped.current = true;
  }, deps);
}
