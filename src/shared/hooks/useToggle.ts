import { useState } from "react";

/**
 * @FileDesc
 * - useState 단순 Toggle 변경
 * - 
*/
const useToggle = (initialValue: boolean = false) => {
  const [toggle, setToggle] = useState<boolean>(initialValue);

  const changeToggle = () => setToggle(!toggle);

  const optionalToggle = (state: boolean) => setToggle(state);

  return [toggle, changeToggle, optionalToggle] as const;
};

export { useToggle };
