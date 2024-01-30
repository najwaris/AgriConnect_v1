import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { updateUserInformation } from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import Biddingcard from "../Profile/Biddingcard";
import Luckydrawcard from "../Profile/Luckydrawcard.jsx";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="w-full">
      {/*profile page*/}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Enter Your Password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* Biddings */}
      {active === 2 && (
        <div>
          <Biddings />
        </div>
      )}

      {/* lucky Draws  */}
      {active === 3 && <div><Luckydraws/></div>}

      {/* lucky Draws  */}
      {active === 4 && (
        <div>
          <ChangePassword />
        </div>
      )}
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Biddings = () => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [userBiddings, setUserBiddings] = useState([]);

  useEffect(() => {
    const fetchUserBiddings = async () => {
      try {
        const response = await axios.get(
          `${server}/bidding/user-winning-bids/${user._id}`
        ); // Replace with your actual API endpoint
        setUserBiddings(response.data.winningBids);
      } catch (error) {
        console.error("Error fetching user biddings:", error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchUserBiddings();
  }, []);
  return (
    <div className="px-5">
      <h2 className="text-2xl font-bold mb-4">Your Winning Bids</h2>
      {Array.isArray(userBiddings) && userBiddings.length > 0 ? (
        userBiddings.map((bid) => (
          <div key={bid._id} className="mb-3">
            <Biddingcard data={bid} />
          </div>
        ))
      ) : (
        <p>You haven't won any biddings.</p> 
      )}
    </div>
  );
};

const Luckydraws = () => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [userLuckydraws, setuserLuckydraws] = useState([]);

  useEffect(() => {
    const fetchUserLuckydraws = async () => {
      try {
        const response = await axios.get(
          `${server}/luckydraw/user-won-luckydraws/${user._id}`
        ); // Replace with your actual API endpoint
        setuserLuckydraws(response.data.wonLuckyDraws);
      } catch (error) {
        console.error("Error fetching user biddings:", error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchUserLuckydraws();
  }, []);
  return (
    <div className="px-5">
      <h2 className="text-2xl font-bold mb-4">Your Winning Luckydraws</h2>
      {Array.isArray(userLuckydraws) && userLuckydraws.length > 0 ? (
        userLuckydraws.map((luckydraw) => (
          <div key={luckydraw._id} className="mb-3">
            <Luckydrawcard data={luckydraw} />
          </div>
        ))
      ) : (
        <p>You haven't won any luckydraws.</p> 
      )}
    </div>
  );
};



export default ProfileContent;
