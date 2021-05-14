import { useEffect, useState } from 'react';
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return  */
//used to differentiate variables from this project
const PREFIX = 'gui-';

export default function useLocalStorage(key: string, initialValue: any) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    //if we have a value in local storage, we return it
    if (jsonValue) {
      return JSON.parse(jsonValue);
    }
    //if not we want to use initial value
    if (typeof initialValue === 'function') {
      return initialValue();
    }
    return initialValue;
  });
  //saving value to local storage at specfied key
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);
  return [value, setValue];
}
