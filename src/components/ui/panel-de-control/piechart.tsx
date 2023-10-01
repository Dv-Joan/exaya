import { PieChart, Pie, Tooltip } from "recharts";

const data01 = [
  {
    name: "A. Frontales",
    value: 40,
  },
  {
    name: "A. Medio",
    value: 30,
  },
  {
    name: "A. Traseros",
    value: 30,
  },
  {
    name: "Pasillo",
    value: 20,
  },
  {
    name: "Ventana",
    value: 27,
  },
];
const data02 = [
  {
    name: "Adultos",
    value: 240,
  },
  {
    name: "Niños",
    value: 456,
  },
  {
    name: "Discapacitados",
    value: 139,
  },

  {
    name: "Estudiantes",
    value: 390,
  },
  {
    name: "Tercera Edad",
    value: 480,
  },
];

import React from "react";

function ControlPanePieChart() {
  return (
    <PieChart width={250} height={250}>
      <Tooltip
        contentStyle={{
          backgroundColor: "rgba(255,255,255,0.7)",
          borderRadius: "10px",
          border: "none",
        }}
      />
      <Pie
        data={data01}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={50}
        fill="#1AFD6D"
      />
      <Pie
        data={data02}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        className=" font-semibold text-black"
        innerRadius={60}
        outerRadius={80}
        fill="#4096FF"
        label
      />
    </PieChart>
  );
}

export default ControlPanePieChart;
