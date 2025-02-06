import { CircularProgress } from "@mui/material";
import "../../styles/loading.css";
import React from "react";

type FlightsPageLoadingProps = {
  text: string;
};

const Loading: React.FC<FlightsPageLoadingProps> = ({ text }) => {
  return (
    <div className="flightsLoading">
      <div className="flightsLoadingInfo">{text}</div>
      <CircularProgress />
    </div>
  );
};

export default Loading;
