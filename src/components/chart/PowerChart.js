import React from "react";
import Chart from "react-apexcharts";

import { useSelector, useDispatch } from "react-redux";

const PowerChart = (params) => {

  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const data = {
    series: [
      {
        name: "Review",
        data: params.dataa,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      fill: {
        colors: ["var(--main-color)"],
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: params.datetime
      },
      yaxis: {
        show: false
      },
      toolbar:{
        show: false
      }
    },
  };
  return <div className="">
    {themeReducer === "theme-mode-dark" ? (
    <Chart options={{...data.options,theme: { mode: 'dark' }}} series={data.series} type="bar" height="325"/>
    ):(
      <Chart options={{...data.options,theme: { mode: 'light' }}} series={data.series} type="bar" height="325"/>
    )
    }
  </div>;
};

export default PowerChart;
