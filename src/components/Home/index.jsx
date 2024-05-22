import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const { cash, expenses, product } = useSelector((s) => s);
  const dispatch = useDispatch();
  const addProduct = () => {
    let newProduct = {
      id: 1,
      name: productName,
      price: productPrice,
    };
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    setProductName("");
    setProductPrice("");
  };

  const messageErr = (str) =>
    toast.error(str, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const buyProduct = (data) => {
    if (data.price < cash) {
      dispatch({ type: "BUY_PRODUCT", payload: data });
    } else {
      const num = cash - data.price;
      messageErr(`у вас не хватает ${Math.abs(num)} сом!`);
    }
  };

  const removeAll = () => {
    dispatch({ type: "REMOVE_PRODUCT" });
    
  };

  useEffect(() => {
    localStorage.setItem("cash", JSON.stringify(cash));
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [cash, expenses]);

  return (
    <div className="my-[40px]">
      <div className="container">
        <div className="flex ic  justify-between">
          <div className="w-[340px] h-[200px] bg-red-600 text-[30px] text-white font-bold flex items-center justify-center">
            Expenses: {expenses} сом
          </div>
          <div className="w-[340px] h-[200px] bg-green-600 text-[30px] text-white font-bold flex items-center justify-center">
            Cash: {cash} сом
          </div>
        </div>
        <div className="flex items-center justify-center flex-col w-[50%] mx-auto mt-[50px] gap-5">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-white text-2xl bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-2xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addProduct();
                }
              }}
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-2xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-2xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Price
            </label>
          </div>
          <button
            onClick={() => addProduct()}
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Add Product
          </button>
        </div>

        <div className="relative w-[60%] mx-auto mt-[30px] overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {product.map((el, idx) => (
              <tbody>
                <tr
                  key={idx}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {el.name}
                  </th>

                  <td className="px-6 py-4">{el.price} сом</td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => buyProduct(el)}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Buy
                    </a>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <button
          onClick={() => removeAll()}
          type="button"
          className="text-white mx-auto  ml-[900px] mt-[30px] bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Remove All
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
