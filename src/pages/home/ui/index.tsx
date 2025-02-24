import { text } from "../text";
import { cn } from "@/shared/lib/cn";

const Home = () => {
  return (
    <div
      className={cn(
        "tw:@container tw:snap-y tw:h-full tw:snap-mandatory tw:overflow-y-scroll tw:c-text-theme-base tw:text-base",
        "tw:md:text-lg"
      )}
    >
      {/* section1 */}
      <section className="tw:snap-always tw:c-linear-base tw:snap-start tw:h-full tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-10">
        <p className="tw:max-w-[768px] tw:px-5">
          <span
            className={cn(
              "tw:text-xl tw:text-service-primary tw:pr-1",
              "tw:md:text-2xl"
            )}
          >
            {text.serviceInfo.title}
          </span>
          {text.serviceInfo.description}
        </p>
        <button className="tw:bg-service-primary tw:text-service-white tw:py-2 tw:px-5 tw:rounded-lg">
          랜덤채팅 시작하기
        </button>
      </section>

      {/* section2 */}
      <section className="tw:snap-always tw:p-4 tw:snap-start tw:h-full tw:flex tw:flex-col tw:gap-5 tw:max-w-[1024px] tw:m-auto tw:overflow-y-scroll">
        <h2 className="tw:font-bold tw:text-xl">이런게 가능해요!</h2>
        {text.chatInfo.map((item) => {
          return (
            <div>
              <span className="tw:font-bold">{item.title}</span>
              <p className="tw:text-service-gray tw:shadow-md tw:p-4 tw:mt-2 tw:rounded-b-lg">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* section3 */}
      <section className="tw:snap-always tw:p-4 tw:snap-start tw:h-full tw:px-4 tw:max-w-[1024px] tw:m-auto">
        <h2 className="tw:font-bold tw:text-xl">새로운소식</h2>
        <ul className="tw:mt-2 tw:flex tw:flex-col tw:gap-5">
          <li className="tw:p-4 tw:flex tw:flex-col tw:gap-4 tw:c-shadow-bt tw:rounded-lg tw:c-bg-theme-strong tw:hover:bg-service-secondary tw:group tw:cursor-pointer">
            <div className="tw:flex tw:items-center tw:justify-between">
              <span className="tw:font-bold tw:group-hover:text-service-white">
                2025-03-01
              </span>
              <span className={cn("tw:text-sm tw:text-service-gray tw:group-hover:text-service-white",
                "tw:md:text-base"
              )}>
                v1.0.0
              </span>
            </div>
            <p className="tw:group-hover:text-service-white">
              랜덤채팅 & 그룹채팅이 가능해요!
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
