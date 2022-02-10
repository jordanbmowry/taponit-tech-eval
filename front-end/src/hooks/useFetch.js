import { useState } from 'react';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function get(url, abortController) {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setError(null);
      fetch(API_BASE_URL + url, { signal: abortController.signal })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            setError(error);
            reject({ message: error });
          }
        })
        .finally(() => setLoading(false));
    });
  }

  function put(url, body, abortController) {
    return new Promise((resolve, reject) => {
      setError(null);
      setLoading(true);
      fetch(API_BASE_URL + url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: abortController.signal,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            reject({ message: data.error });
          }
          resolve(data);
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            setError(error);
            reject({ message: error });
          }
        })
        .finally(() => setLoading(false));
    });
  }

  return { get, put, loading, error };
}
