import { useMediaQuery } from "react-responsive";

export const useResponsive = ( props: PropsType ): boolean => {
    const { device, callback } = props;

    const width = {
        mobile: {maxWidth: 767},
        tablet: {minWidth: 768},
        desktop: {minWidth: 1024}
    }
    const isDevice = useMediaQuery( width[device], undefined, (state) => {callback(state)});
    
    return isDevice;
};

type PropsType = {
    device: "mobile" | "tablet" | "desktop";
    callback: ( state: boolean ) => void;
} & {};
