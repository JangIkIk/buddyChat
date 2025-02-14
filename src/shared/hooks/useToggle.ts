import { useState } from 'react';

export const useToggle = ( initialValue: boolean = false ) => {
    const [toggle, setToggle] = useState<boolean>(initialValue);

    const changeToggle = () => setToggle(!toggle);

    return [ toggle, changeToggle ] as const;
}