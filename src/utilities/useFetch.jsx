import { useEffect, useState } from "react";

export const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetchFn()
      .then(res => {  setData(res.data); })
      .catch(err => {  setError(err); })

  }, deps);

  return { data, error };
};
