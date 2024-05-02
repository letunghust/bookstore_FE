import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {
  const data = [
    { id: 0, value: 10, label: 'Sách thiếu nhi' },
    { id: 1, value: 15, label: 'Sách giáo khoa' },
    { id: 2, value: 20, label: 'Sách văn học' },
  ];

  return (
    <div>
        <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
    </div>
  );
};

export default Dashboard;
