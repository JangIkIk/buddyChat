const Loading = (props: LoadingProps) => {
  const { size = "size-15"} = props;
  return (
    <svg
      className={`${size} tw:animate-spin tw:text-service-gray`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="tw:opacity-50"
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <circle
        className="tw:opacity-100 tw:text-service-primary"
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="30"
      ></circle>
    </svg>

    //  path로 가능하지만 차이점을 비교하게 위해보류
    //   <svg className="tw:size-15 tw:animate-spin tw:text-service-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    //       <circle className="tw:opacity-25" cx={12} cy={12} r={10} stroke="currentColor" stroke-width="4"></circle>
    //       <path className="tw:opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    //   </svg>
  );
};

export { Loading };

type LoadingProps = {
  size: string;
};
