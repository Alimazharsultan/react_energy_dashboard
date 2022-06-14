import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

// parent Card

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={(param.barValue/5)*100}
          text={`${param.barValue}kW`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
       
        <span>{param.current}A</span>
        <span>{param.voltage}V</span>
      </div>
    </motion.div>
  );
}
// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  const seriess = [
    {
      name: "Power Phase 1",
      data: param.dataa,
    },
    
    // {
    //   name: "Pressure",
    //   data: props.pressureData,
    // },
  ]
  const options= {
    chart: {
      type: "area",
      height: "auto",
    },

    dropShadow: {
      enabled: false,
      enabledOnSeries: undefined,
      top: 0,
      left: 0,
      blur: 3,
      color: "#000",
      opacity: 0.35,
    },

    fill: {
      colors: ["#fff"],
      type: "gradient",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["white"],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm:ss",
      },
    },
    grid: {
      show: true,
    },
    xaxis: {
      type: "datetime",
      categories: param.datetime
    },
    yaxis: [
      {
        
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "white"
      },
      labels: {
        style: {
          color: "white"
        }
      },
      title: {
        text: "Power Watts",
        style: {
          color: "white"
        }
      }
    }
    ]
  };
  // console.log(param.datetime);
  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
        <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={options} series={seriess} type="line" />
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  );
}

export default Card;
