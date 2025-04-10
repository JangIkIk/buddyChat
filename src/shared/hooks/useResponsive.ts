import { useMediaQuery } from "react-responsive";


/**
 * @FileDesc
 * - 지정된 반응형화면 감지
 * - 
*/
const useResponsive = (props: PropsType): boolean => {
  const { device, callback } = props;

  const width = {
    mobile: { maxWidth: 767 },
    tablet: { minWidth: 768 },
    desktop: { minWidth: 1024 },
  };
  const isDevice = useMediaQuery(width[device], undefined, (state) => {
    callback(state);
  });

  return isDevice;
};

export { useResponsive };

type PropsType = {
  device: "mobile" | "tablet" | "desktop";
  callback: (state: boolean) => void;
} & {};
