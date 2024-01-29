import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import CreateLuckydraw  from "../../components/Shop/CreateLuckydraw.jsx";

const ShopCreateLuckydraw = () => {
    return (
        <div>
            <DashboardHeader/>
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                  <DashboardSideBar active={5} />
                </div>
                <div className="w-full justify-center flex mt-10">
                    <CreateLuckydraw />
                </div>
              </div>
        </div>
      )
}

export default ShopCreateLuckydraw