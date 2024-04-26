import { api } from "@/utils/api";
import { Dropdown, Space, Table, Tag, Tooltip, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IoFilterSharp } from "react-icons/io5";
import { TbBus } from "react-icons/tb";
import { TfiMoreAlt } from "react-icons/tfi";
import { Manifiesto } from "./manifiesto";
import { MisBoletos } from "./mis-boletos-modal";
import { RegistrarPasajeModal } from "./registrar-pasaje-modal";
import { type Dayjs } from "dayjs";
import { CollapsedContext } from "@/context/MenuContext";
import { useContext } from "react";

export function PasajesTable({ dayQuery }: { dayQuery: Dayjs }) {
  const { data: viajes, isLoading } = api.viajes.getViajesByDate.useQuery({
    date: dayQuery.format("YYYY-MM-DD"),
  });
  const { isCollapsed } = useContext(CollapsedContext);
  const origenFilterItems = viajes?.response?.map((viaje) => ({
    text: viaje.ruta.ciudadOrigen,
    value: viaje.ruta.ciudadOrigen,
  }));
  const destinoFilterItems = viajes?.response?.map((viaje) => ({
    text: viaje.ruta.ciudadDestino,
    value: viaje.ruta.ciudadDestino,
  }));
  const columns: ColumnsType = [
    {
      title: "Origen",
      dataIndex: "ruta",
      key: "origen",
      render: (ruta: { ciudadOrigen: string }) => ruta.ciudadOrigen,
      filterOnClose: true,
      filters: origenFilterItems,
      filterIcon: <IoFilterSharp size={16} />,
      onFilter: (
        value,

        record: {
          ruta: { ciudadOrigen: string };
        }
      ) => record.ruta.ciudadOrigen.includes(value as string),
    },
    {
      title: "Destino",
      dataIndex: "ruta",
      key: "destino",
      render: (ruta: { ciudadDestino: string }) => ruta.ciudadDestino,
      filterOnClose: true,
      filters: destinoFilterItems,
      filterIcon: <IoFilterSharp size={16} />,
      onFilter: (
        value,
        record: {
          ruta: { ciudadDestino: string };
        }
      ) => record.ruta?.ciudadDestino?.includes(value as string),
    },

    {
      title: "Hora Salida",
      dataIndex: "salida",
      key: "horaSalida",
      sorter: {
        compare: (
          a: {
            salida: string;
          },
          b: {
            salida: string;
          }
        ) => {
          const dateA = new Date(a.salida);
          const dateB = new Date(b.salida);
          return dateA.getTime() - dateB.getTime();
        },
      },
      render: (salida: string) => {
        const salidaFormatted = new Date(salida);
        return (
          <Tag>
            {salidaFormatted.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Tag>
        );
      },
    },
    {
      title: "Placa",
      dataIndex: "bus",
      key: "placaBus",
      render: (bus: { placa: string }) => (
        <Tooltip className="cursor-pointer" title={bus.placa}>
          <TbBus
            strokeWidth={1}
            size={25}
            className="text-zinc-600 dark:text-zinc-400"
          />
        </Tooltip>
      ),
    },
    {
      title: "Tarifas",
      key: "tarifas",
      dataIndex: "tarifas",
      render: (tarifas: number[]) => {
        const tarifaClassified = tarifas.map((tarifa) => {
          if (tarifa <= 20) return "orange-inverse";
          if (tarifa <= 40) return "blue-inverse";
          if (tarifa <= 60) return "green-inverse";
          return "red";
        });
        return tarifas.map((tarifa, index) => (
          <Tag key={index} color={tarifaClassified[index]} className="mb-1.5">
            {tarifa.toLocaleString("es-PE", {
              style: "currency",
              currency: "PEN",
            })}
          </Tag>
        ));
      },
    },
    {
      title: "",
      key: "acciones",
      dataIndex: "id",
      render: (id: string) => {
        const items = [
          {
            key: "1",
            label: <RegistrarPasajeModal viajeId={id} />,
          },
          {
            key: "2",
            label: <Manifiesto viajeId={id} />,
          },
          {
            key: "3",
            label: <MisBoletos viajeId={id} />,
          },
        ];

        return (
          <Dropdown menu={{ items }}>
            <TfiMoreAlt className="cursor-pointer" />
          </Dropdown>
        );
      },
    },
  ];
  return (
    <Table
      expandable={{
        expandedRowRender: (record: {
          salida: Date;
          bus: { asientos: number };
          boletos: any[];
        }) => (
          <Space className="w-full justify-between">
            <Space>
              <Typography.Text type="secondary">Salida : </Typography.Text>
              <Typography.Text className=" font-mono font-semibold">
                {new Date(record.salida).toLocaleDateString()}
              </Typography.Text>
            </Space>
            <Space>
              <Typography.Text type="secondary">
                Total Asientos :{" "}
              </Typography.Text>
              <Typography.Text className=" font-mono font-semibold">
                {record.bus.asientos}
              </Typography.Text>
            </Space>

            <Space>
              <Typography.Text type="secondary">
                Boletos Vendidos :{" "}
              </Typography.Text>
              <Typography.Text className=" font-mono font-semibold">
                {record.boletos.length}
              </Typography.Text>
            </Space>
          </Space>
        ),
      }}
      pagination={false}
      loading={isLoading}
      columns={columns}
      dataSource={viajes?.response}
      style={{
        width: ` ${(isCollapsed && "860px") || "100%"}`,
      }}
    />
  );
}
