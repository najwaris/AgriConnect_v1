import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { createLuckydraw } from "../../redux/actions/luckydraw";

const CreateLuckydraw = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.luckydraws);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [startDate] = useState(new Date().toISOString().slice(0, 10))
  const [endDate, setEndDate] = useState();

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const minEndDate = startDate
    ? new Date(new Date(startDate).getTime() + 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
    : "";

  const startDateTime = new Date(startDate);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success && isSubmitted) {
      toast.success("Lucky Draw created successfully!");
      navigate("/dashboard/luckydraws");
      window.location.reload();
    }
  }, [dispatch, error, success, isSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("shopId", seller._id);
    newForm.append("start_date", startDateTime.toISOString());
    newForm.append("end_date", endDate.toISOString());
    dispatch(createLuckydraw(newForm));
    setIsSubmitted(true);
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">
        Create New Lucky Draw
      </h5>
      {/* create bidding form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-teal-600 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Lucky Draw name"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-teal-600 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the description for the Lucky Draw crops, please state clearly the defects on the crops (if any)"
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px] border-teal-600"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-teal-600 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your lucky draw tags"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Lucky Draw Start Date</label>
          <input
            required
            type="date"
            name="date"
            id="start-date"
            value={startDate}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-teal-600 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            readOnly
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Lucky Draw End Date</label>
          <input
            required
            type="date"
            name="date"
            id="end-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-teal-600 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            onChange={handleEndDateChange}
            min={minEndDate}
            placeholder="Enter your minimum bidding price (RM) ..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-[3px] placeholder-gray-400 focus:outline-none shadow-lg hover:opacity-75 transition duration-300 ease-in-out sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateLuckydraw;
