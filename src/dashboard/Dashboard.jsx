import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { CircularProgress, Typography, Box } from "@mui/material";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch total book in each category
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/books/getTotalBook`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch total revenue
  const fetchTotalRevenue = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/totalRevenue`
      );
      const data = await response.json();
      setTotalRevenue(data);
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTotalRevenue();
  }, []);

  const chartData = data.map((item, index) => ({
    id: index,
    value: item.total,
    label: item._id,
  }));

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography> */}
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ width: "100%" }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Total revenue: ${totalRevenue}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Typography variant="h6" gutterBottom>
              Total of book per category
            </Typography>
            <PieChart
              series={[
                {
                  data: chartData,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={300}
            />
          </Box>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
