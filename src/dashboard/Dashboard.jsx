import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { CircularProgress, Typography, Box } from "@mui/material";
import SummaryCard from "../components/SummaryCard";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaBookOpen, FaMoneyBills } from "react-icons/fa6";


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalBook, setTotalBook] = useState('');
  const [totalOrder, setTotalOrder] = useState('');

  // Fetch total book in each category
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/books/getTotalBook`
      );
      const data = await response.json();
      setData(data);
      // sum all book 
      const totalBooks = data.reduce((acc, item) => acc + item.total, 0);
      setTotalBook(totalBooks)
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

  const chartData = data.map((item, index) => ({
    id: index,
    value: item.total,
    label: item._id,
  }));

  //get all order
  const fetchTotalOrder = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/allorders`);
      const data = await response.json();
      // console.log(data.length)
      setTotalOrder(data.length)
    } catch(error) {
      console.log('Error fetching total order: ', error);
    }
  }
  useEffect(() => {
    fetchData();
    fetchTotalRevenue();
    fetchTotalOrder();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {loading ? (
      <CircularProgress />
    ) : (
      <div style={{ width: '100%' }}>
        <Box display="flex" justifyContent="space-around" mb={2}>
          <SummaryCard
            // icon={<MonetizationOnIcon />}
            icon={<MdOutlineAttachMoney />}
            label="Total Revenue"
            value={`${totalRevenue}$`}
            color="green"
          />
          <SummaryCard
            // icon={<ShoppingCartIcon />}
            icon = {<FaMoneyBills/>}
            label="Total Order"
            value={totalOrder}
            color="red"
          />
          <SummaryCard
            icon = {<FaBookOpen />}
            label="Total Book"
            value={totalBook}
            color="blue"
          />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Typography variant="h6" gutterBottom>
            Total of book per category
          </Typography>
          <PieChart
            series={[
              {
                data: chartData,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray',
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
