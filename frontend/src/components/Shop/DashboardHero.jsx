import React, { useEffect, useState } from 'react'
import { server } from '../../server';
import Biddingcard from "../Shop/Biddingcard.jsx"
import { useSelector } from 'react-redux';
import axios from 'axios';
import Luckydrawcard from "../Shop/Luckydrawcard.jsx"

const DashboardHero = () => {
  return (
    <div className='w-[90%]'>
       <div><Biddings /></div>
       <div><LuckyDraws /></div>
    </div>
  )
}


const Biddings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [sellerBiddings, setSellerBiddings] = useState([]);

  useEffect(() => {
    const fetchUserBiddings = async () => {
      try {
        const response = await axios.get(
          `${server}/bidding/ended-biddings/${seller._id}`
        ); // Replace with your actual API endpoint
        setSellerBiddings(response.data.endedBiddings);
      } catch (error) {
        console.error("Error fetching biddings:", error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchUserBiddings();
  }, []);
  return (
    <div className="px-5">
      <h2 className="text-2xl font-bold mb-4">Ended Bidding Listings</h2>
      {Array.isArray(sellerBiddings) && sellerBiddings.length > 0 ? (
        sellerBiddings.map((bid) => (
          <div key={bid._id} className="mb-3">
            <Biddingcard data={bid} />
          </div>
        ))
      ) : (
        <p>No Ended Bidding Yet</p> 
      )}
    </div>
    
  );
};

const LuckyDraws = () => {
  const { seller } = useSelector((state) => state.seller);
  const [sellerLuckydraws, setSellerLuckydraws] = useState([]);

  useEffect(() => {
    const fetchSellerLuckydraws = async () => {
      try {
        const response = await axios.get(
          `${server}/luckydraw/seller-luckydraws/${seller._id}`
        ); // Replace with your actual API endpoint
        setSellerLuckydraws(response.data.sellerLuckyDraws);
      } catch (error) {
        console.error("Error fetching user biddings:", error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchSellerLuckydraws();
  }, []);
  return (
    <div className="px-5">
      <h2 className="text-2xl font-bold mb-4">Ended Luckydraws Listings</h2>
      {Array.isArray(sellerLuckydraws) && sellerLuckydraws.length > 0 ? (
        sellerLuckydraws.map((luckydraw) => (
          <div key={luckydraw._id} className="mb-3">
            <Luckydrawcard data={luckydraw} />
          </div>
        ))
      ) : (
        <p>No Ended Listing yet</p> 
      )}
    </div>
  );
};


export default DashboardHero