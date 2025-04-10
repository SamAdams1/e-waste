import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Jan", users: 400, sales: 240 },
  { name: "Feb", users: 300, sales: 139 },
  { name: "Mar", users: 200, sales: 980 },
  { name: "Apr", users: 278, sales: 390 },
  { name: "May", users: 189, sales: 480 },
  { name: "Jun", users: 239, sales: 380 },
];
interface buildingI {
  name: string,
  capacity: number
}

const binCapacity: buildingI[] = [
  { 
    name: "Student Center",
    capacity: Math.floor(Math.random() * 101) // Random capacity between 0 and 50
  },
  { 
    name: "Kingston",
    capacity: Math.floor(Math.random() * 101)
  },
  { 
    name: "Seta",
    capacity: Math.floor(Math.random() * 101)
  },
  { 
    name: "Webster",
    capacity: Math.floor(Math.random() * 101)
  },
  { 
    name: "New Castle",
    capacity: Math.floor(Math.random() * 101)
  },
  { 
    name: "Washington",
    capacity: Math.floor(Math.random() * 101)
  },
  { 
    name: "Monadnock",
    capacity: Math.floor(Math.random() * 101)
  },
  { 
    name: "Windsor",
    capacity: Math.floor(Math.random() * 101)
  },
  { 
    name: "Tuckerman",
    capacity: Math.floor(Math.random() * 101)
  },
  { 
    name: "Conway",
    capacity: Math.floor(Math.random() * 101)
  },
];

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Plastics", value: 300 },
  { name: "Metals", value: 300 },
  { name: "Others", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Admin: React.FC = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Bin Capacity
            </Typography>
            <BarChart width={400} height={300} data={binCapacity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-70} textAnchor="end" height={100} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="capacity" fill="#82ca9d" />
            </BarChart>
          </Paper>
        </Grid>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            User Growth
          </Typography>
          <LineChart width={400} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
          </LineChart>
        </Paper>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Types of E-Waste
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;