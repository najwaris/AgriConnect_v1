import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLuckydraw, getAllLuckydrawsShop } from "../../redux/actions/luckydraw";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";

const AllLuckydraws = () => {
    const { luckydraws, isLoading } = useSelector((state) => state.luckydraws);
    const { seller } = useSelector((state) => state.seller);
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllLuckydrawsShop(seller._id));
    }, [dispatch]);
  
    const handleDelete = (id) => {
      dispatch(deleteLuckydraw((id)));
      window.location.reload();
    };
  
  
    const columns = [
      { field: "id", headerName: "Biddings Id", minWidth: 150, flex: 0.7 },
      { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
      { field: "status", headerName: "Status", minWidth: 100, flex: 0.5 },
      {
        field: "participantsCount", // This should match the key in your row data
        headerName: "Participants",
        minWidth: 120,
        flex: 0.8,
      },
      // {
      //   field: "preview",
      //   headerName: "",
      //   minWidth: 100,
      //   flex: 0.8,
      //   type: "number",
      //   sortable: false,
      //   renderCell: (params) => {
      //     const d = params.row.name;
      //     const bidding_name = d.replace(/\+s/g, "-");
      //     return (
      //       <>
      //         {/* <Link to={`/biddings/${bidding_name}`}> */}
      //           {/* <button>
      //             <AiOutlineEye size={20} />
      //           </button> */}
      //         {/* </Link> */}
      //       </>
      //     );
      //   },
      // },
      {
        field: "delete",
        headerName: "",
        minWidth: 120,
        flex: 0.8,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Button onClick={() => handleDelete(params.id)}>
                <AiOutlineDelete size={20} />
              </Button>
            </>
          );
        },
      },
    ];
  
    const row = [];
  
    luckydraws &&
    luckydraws.forEach((item) => {
        row.push({
          id: item._id,
          name: item.name,
          status: item.status,
          participantsCount: item.participants.length,
        });
      });
  
      return (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="w-full mx-8 pt-1 mt-10 bg-white">
                <DataGrid
                  rows={row}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  autoHeight
                />
              </div>
            )}
          </>
        );
  };

export default AllLuckydraws