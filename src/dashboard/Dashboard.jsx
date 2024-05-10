import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState('');

  // get total book in each category
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/books/getTotalBook`
      );
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = data.map((item, index) => ({
    id: index,
    value: item.total,
    label: item._id,
  }));
  // end of get total book in each category

  const fetchDataGetTotalRevenue = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/totalRevenue`);
      const data = await response.json();
      console.log('revenue', data);
      setTotalRevenue(data);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDataGetTotalRevenue();
  }, []);

  return (
    <div>
      <h2> Total revenue: {totalRevenue}$ </h2>
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={300}
      />
    </div>
  );
};

export default Dashboard;
