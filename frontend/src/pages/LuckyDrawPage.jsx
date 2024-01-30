import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import ProductCard2 from "../components/Route/ProductCard/ProductCard2";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";

const LuckyDrawPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allLuckydraws, isLoading } = useSelector((state) => state.luckydraws);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allLuckydraws;
      setData(d);
    } else {
      const d =
      allLuckydraws&& allLuckydraws.filter((i) => i.category === categoryData);
      setData(d);
    }
    // window.scrollTo(0, 0);
  }, [allLuckydraws]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />

      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((i, index) => <ProductCard2 data={i} key={index} />)}
        </div>

        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default LuckyDrawPage;
