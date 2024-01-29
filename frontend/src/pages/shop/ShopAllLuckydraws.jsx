import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllLuckydraws  from "../../components/Shop/AllLuckydraws.jsx"

const ShopAllLuckydraws = () => {
    return (
        <div>
            <DashboardHeader/>
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                  <DashboardSideBar active={4} />
                </div>
                <div className="w-full justify-center flex mt-10">
                   <AllLuckydraws />
                </div>
              </div>
        </div>
      )
}

export default ShopAllLuckydraws