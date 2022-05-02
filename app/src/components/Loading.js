import React from "react";
import Loader from "react-loader-spinner";
import { Loading as Dots } from "react-loading-dot";

export const Loading = () => (
  <>
    <div className="flex justify-center items-center ">
      <Loader type="Oval" color="#00BFFF" height={30} width={30} />
    </div>
    <div>
      <p className="text-blue-500 text-xl m-5 font-bold text-center">
        LOADING . . .
      </p>
    </div>
  </>
);

export default Loading;
