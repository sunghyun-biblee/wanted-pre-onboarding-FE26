import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MockData } from "../types";

import { calcTotal, getMockData } from "../lib/utils";
import Loading from "../components/Loading";
import ItemWrapper from "../components/ItemWrapper";

export const MainPage = () => {
  const [dataList, setDataList] = useState<MockData[]>([]);
  const [page, setPage] = useState(0);
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isLasted, setIsLasted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  const fetchData = useCallback(
    async (page: number) => {
      if (isLasted || isLoading) return;
      setIsLoading(true);

      try {
        const { datas, isEnd } = await getMockData(page);
        setDataList((prev) => [...prev, ...datas]);

        if (isEnd) {
          observerRef.current?.disconnect();
          setIsLasted(true);
        } else {
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        setIsError("데이터를 불러오는 중 오류가 발생했습니다");
      } finally {
        setIsLoading(false);
      }
    },
    [isLasted, isLoading]
  );
  // useLayoutEffect(() => {
  //   setData([...MOCK_DATA]);
  // }, []);

  useEffect(() => {
    const checkRef = moreRef.current;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting && !isLoading && !isLasted) {
          fetchData(page);
        }
      },
      { threshold: 1 }
    );

    if (checkRef) {
      observerRef.current.observe(checkRef);
    }

    return () => {
      if (checkRef) {
        observerRef.current?.unobserve(checkRef);
      }
    };
  }, [isLasted, isLoading]);

  useEffect(() => {
    const { dataTotalPrice } = calcTotal(dataList);
    setTotalPrice(dataTotalPrice);
  }, [dataList]);
  return (
    <div className="w-[600px] my-[70px]">
      <section className="flex flex-row justify-center items-center w-full h-[70px] bg-blue-100 fixed top-0 left-0 shadow-xl">
        <div className="flex flex-row justify-between w-[600px] ">
          <span className="text-xl font-sans">
            총 개수: {dataList.length}개
          </span>
          <span className="text-xl font-sans">합계 : {totalPrice} 원</span>
        </div>
      </section>
      <ul className="flex flex-col gap-4 my-5">
        {dataList.map((item, index) => (
          <li className="flex flex-col gap-10 my-3" key={item.productId}>
            <ItemWrapper className="gap-8 p-4 shadow-lg rounded-lg border-2 border-blue-300">
              <div className="flex flex-row justify-between">
                <span className="text-lg ">물품번호 : {index}</span>
                <span>{item.boughtDate.split("GMT")[0]}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="font-semibold">
                  물품명: {item.productName}
                </span>
                <span className="font-semibold">가격: {item.price}원</span>
              </div>
            </ItemWrapper>
          </li>
        ))}
        <div ref={moreRef} className="give_Observe"></div>
        {isLoading &&
          Array.from({ length: page === 0 ? 7 : 5 }).map((_, index) => (
            <ItemWrapper key={"itemWrapper" + index} className="my-2">
              <Loading />
            </ItemWrapper>
          ))}
        {isError && <div>{isError}</div>}
        {isLasted && (
          <div className="text-center text-xl my-2 border-dotted border-2 py-10 font-bold">
            모든 데이터를 불러왔습니다
          </div>
        )}
      </ul>
      <div></div>
    </div>
  );
};
