import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
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

    fetchData();
  }, []);

  const chartData = data.map((item, index) => ({
    id: index,
    value: item.total,
    label: item._id,
  }));

  return (
    <div>
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={200}
      />
    </div>
  );
};

export default Dashboard;
