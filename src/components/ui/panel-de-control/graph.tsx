import React from "react";
import { PT_Sans } from "next/font/google";

const pt_sans = PT_Sans({
  weight: "400",
  subsets: ["latin-ext"],
  preload: true,
});
import {
  AreaChart,
  XAxis,
  Area,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { api } from "@/utils/api";

const sampleData = [
  {
    name: "Junio",
    encomiendas: 4000,
    boletos: 2400,
  },
  {
    name: "Julio",
    encomiendas: 3000,
    boletos: 1398,
  },
  {
    name: "Agosto",
    encomiendas: 2000,
    boletos: 4800,
  },
  {
    name: "Septiembre",
    encomiendas: 2780,
    boletos: 3908,
  },
  {
    name: "Octubre",
    encomiendas: 1890,
    boletos: 4800,
  },
  {
    name: "Noviembre",
    encomiendas: 2390,
    boletos: 4800,
  },
  {
    name: "Diciembre",
    encomiendas: 2490,
    boletos: 5300,
  },
];

export default function ControlPaneGraph() {
  const { data: boletos } =
    api.boletos.getCountOfBoletosInLatest6Months.useQuery();
  const { data: encomiendas } =
    api.encomiendas.getCountOfEncomiendasInLatest6Months.useQuery();

  const latest6MonthsLabel = [];
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const date = new Date();
  for (let i = 5; i >= 0; i--) {
    date.setMonth(date.getMonth() - i);
    const monthIndex = (date.getMonth() + 12) % 12;
    const monthName = monthNames[monthIndex]?.toString() || "";
    latest6MonthsLabel.push(monthName);
    date.setMonth(date.getMonth() + i);
  }
  const data = latest6MonthsLabel.map((month, index) => {
    return {
      name: month,
      encomiendas: encomiendas?.response ? encomiendas.response[index] : 0,
      boletos: boletos?.response ? boletos.response[index] : 0,
    };
  });

  return (
    <ResponsiveContainer
      className="col-span-2 row-span-2 rounded-xl border-1  duration-200  hover:shadow-xl dark:border-zinc-800  dark:hover:bg-black/50"
      width="100%"
      height="100%"
    >
      <AreaChart
        className="rounded-xl border-1  duration-200 hover:bg-orange-100/10 hover:shadow-md dark:border-zinc-800  dark:hover:bg-black/50 "
        data={data}
      >
        <Legend
          align="right"
          iconType="circle"
          verticalAlign="top"
          height={10}
        />
        <defs>
          <linearGradient id="colorencomiendas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#faad14" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#faad14" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorboletos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a0d911" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#a0d911" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" className={pt_sans.className} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            borderRadius: "10px",
            border: "none",
          }}
        />
        <Area
          type="monotone"
          dataKey="encomiendas"
          stroke="#faad14"
          strokeWidth={4}
          fillOpacity={1}
          fill="url(#colorencomiendas)"
        />
        <Area
          type="monotone"
          dataKey="boletos"
          strokeWidth={4}
          stroke="#a0d911"
          fillOpacity={1}
          fill="url(#colorboletos)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
