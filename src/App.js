import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line
} from "recharts";

function timeConverter(UNIX_timestamp: any) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  // var hour = a.getHours();
  // var min = a.getMinutes();
  // var sec = a.getSeconds();
  var time = date + " " + month + " " + year;
  return time;
}
console.log(timeConverter(0));

const dataset = async () => {
  const da = await fetch(
    "https://api.llama.fi/summary/fees/lyra?dataType=dailyFees"
  )
    .then((res) => res.json())
    .then((d) => {
      return d;
    });
  console.log("da", da);
  var data = da.totalDataChart.map((x) => ({
    time: timeConverter(x[0]),
    value: x[1]
  }));
  console.log("data", data);
  return data;
};

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    dataset().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <h4>Assignment 1</h4>
      {console.log("datttta", data)}
      <AreaChart
        width={1000}
        height={500}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      {/* <p>Maybe some other content</p>
      <AreaChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart> */}
    </div>
  );
}
