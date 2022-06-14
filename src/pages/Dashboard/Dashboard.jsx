// Display Simple values from mqtt
import React, { useEffect, useState, useContext } from "react";
import Card from "../../components/Card/Card";
import PowerChart from "../../components/chart/PowerChart";
import io from "socket.io-client";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { emActions } from "../../redux/reducers/em-slice";
import "./Dashboard.css";
const socket = io("http://localhost:4003", {
  transports: ["websocket", "polling"],
});
function Dashboard() {
  const reduxValues = useSelector((state) => state.EM);
  const dispatch = useDispatch();
  function serverFetchData(){
    let d1 = new Date();

    d1 = d1.setTime(d1.getTime() + 5 * 60 * 60 * 1000);
    d1 = new Date(d1);
    d1 = d1.setDate(d1.getDate() - 1);

    d1 = new Date(d1).toISOString();
    console.log("getting data for: ", d1);
    Axios.get(`http://localhost:3009/power1Data?date=${d1}`, {
        date: d1,
      })
        .then((r) => {
          let da = r.data.result;
          // console.log(data);
          let sendData1 = [];
          let sendData2 = [];
          let sendData3 = [];
          let dateTimeData = [];
          let hr1Data = [];
          let hr1DateTime = [];
          let h1value = r.data.result[0].HrEn1;
          let hour = '';
          for (let i = 0; i < r.data.result.length; i++) {
            if (r.data.result[i].HrEn1 >= h1value) {
              h1value = r.data.result[i].HrEn1;
            } else {
              let d2 = new Date(r.data.result[i - 1].dateTime);
              // d2 = d2.setTime(d2.getTime() + 5 * 60 * 60 * 1000);
              if(hour!=new Date(d2).getHours()){
                hour = new Date(d2).getHours()
                console.log(new Date(d2).getHours())
                hr1DateTime.push(hour);
                hr1Data.push(h1value);
                h1value = r.data.result[i].HrEn1;
              }
              
            }
          }
          console.log(hr1Data);
          console.log(hr1DateTime);

          for (let i = 0; i < r.data.result.length; i += 10) {
            sendData1.push(r.data.result[i].ApP1);
            sendData2.push(r.data.result[i].ApP2);
            sendData3.push(r.data.result[i].ApP3);
            let d2 = new Date(r.data.result[i].dateTime);
            d2 = d2.setTime(d2.getTime() + 5 * 60 * 60 * 1000);
            dateTimeData.push(d2);
          }
          
          dispatch(emActions.setP1Data(sendData1));
          dispatch(emActions.setP2Data(sendData2));
          dispatch(emActions.setP3Data(sendData3));
          dispatch(emActions.setDateTimeData(dateTimeData));

          dispatch(emActions.seth1Data(hr1Data));
          dispatch(emActions.seth1DateTime(hr1DateTime));
          // console.log(reduxValues.p1Data);
          console.log(reduxValues.dateTimeData);
        })
        .catch((e) => {
          console.log(e);
        });
  }
  useEffect(() => {
    
    socket.on("EM11", (dd) => {
      serverFetchData();
      dispatch(emActions.setValues(dd));
    });
    serverFetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="card">
        <div className="card-container">
          <div className="div">
            <div className="phase-heading"></div>

            <Card
              title={"Phase 1"}
              color={{ backGround: "var(--main-color)", boxShadow: "" }}
              barValue={(reduxValues.apP1 / 1000).toFixed(2)}
              voltage={reduxValues.v1}
              current={reduxValues.i1}
              datetime={reduxValues.dateTimeData}
              dataa={reduxValues.p1Data}
            />
          </div>
          <div className="div">
            <div className="phase-heading"></div>
            <Card
              title={"Phase 2"}
              color={{ backGround: "var(--main-color)", boxShadow: "" }}
              barValue={(reduxValues.apP2 / 1000).toFixed(2)}
              voltage={reduxValues.v2}
              current={reduxValues.i2}
              datetime={reduxValues.dateTimeData}
              dataa={reduxValues.p2Data}
            />
          </div>
          <div className="div">
            <div className="phase-heading"></div>
            <Card
              title={"Phase 3"}
              color={{ backGround: "var(--main-color)", boxShadow: "" }}
              barValue={(reduxValues.apP3 / 1000).toFixed(2)}
              voltage={reduxValues.v3}
              current={reduxValues.i3}
              datetime={reduxValues.dateTimeData}
              dataa={reduxValues.p3Data}
            />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="phase-heading">
          <h3>24 Hour Energy Consumption kWh</h3>
        </div>
        <PowerChart
          datetime={reduxValues.h1DateTime}
          dataa={reduxValues.h1Data}
        />
      </div>
    </div>
  );
}

export default Dashboard;
