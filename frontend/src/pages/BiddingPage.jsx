import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { productData } from "../static/data";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";

const BiddingPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allBiddings, isLoading } = useSelector((state) => state.biddings);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allBiddings;
      setData(d);
    } else {
      const d =
        allBiddings && allBiddings.filter((i) => i.category === categoryData);
      setData(d);
    }

    // window.scrollTo(0, 0);
  }, [allBiddings]);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />

      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
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

export default BiddingPage;
