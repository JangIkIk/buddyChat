import { useState } from "react";

const useToggle = (initialValue: boolean = false) => {
  const [toggle, setToggle] = useState<boolean>(initialValue);

  const changeToggle = () => setToggle(!toggle);

  const optionalToggle = (state: boolean) => setToggle(state);

  return [toggle, changeToggle, optionalToggle] as const;
};

export { useToggle };
