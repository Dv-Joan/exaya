import { useMessageContext } from "@/context/MessageContext";
import { api } from "@/utils/api";
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { TbBus } from "react-icons/tb";
export function ProgramacionTable({
  setIdToEdit,
}: {
  setIdToEdit: (id: string) => void;
}) {
  const {
    data: viajes,
    refetch,
    isLoading,
  } = api.viajes.getAllViajes.useQuery();
  const { mutate: deleteViajeMutation } =
    api.viajes.deleteViajeById.useMutation();
  const { openMessage } = useMessageContext();

  const handleDeleteViaje = (id: string) => {
    deleteViajeMutation(
      { id },
      {
        onSuccess: (response) => {
          openMessage({
            content: response.message,
            duration: 3,
            type: "success",
          });
          void refetch();
        },
        onError: (error) => {
          openMessage({
            content: error.message,
            duration: 3,
            type: "error",
          });
        },
      }
    );
  };

  const columns: ColumnsType = [
    {
      title: "Ruta",
      dataIndex: "ruta",
      key: "ruta",
      render: (ruta: { ciudadOrigen: string; ciudadDestino: string }) => (
        <span>
          {ruta.ciudadOrigen} - {ruta.ciudadDestino}
        </span>
      ),
    },
    {
      title: "Bus",
      dataIndex: "bus",
      key: "bus",
      responsive: ["lg"],

      render: (bus: { placa: string; id: string }) => (
        <Tooltip className="cursor-pointer" key={bus.id} title={bus.placa}>
          <TbBus
            strokeWidth={1}
            size={25}
            className="text-zinc-600 dark:text-zinc-400"
          />
        </Tooltip>
      ),
    },
    {
      title: "Fecha Salida",
      dataIndex: "salida",
      key: "fechaSalida",
      render: (salida: Date) =>
        new Date(salida).toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    {
      title: "Hora Salida",
      responsive: ["lg"],
      dataIndex: "salida",
      key: "hora",
      render: (salida: string) => {
        const salidaFormatted = new Date(salida);
        return salidaFormatted.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      title: "Estado",
      responsive: ["lg"],
      key: "estado",
      dataIndex: "estado",

      render: (estado: string) => (
        <Tag
          className="rounded-full"
          color={
            estado === "DISPONIBLE"
              ? "green-inverse"
              : estado === "LLENO"
              ? "red-inverse"
              : "yellow-inverse"
          }
        >
          {estado}
        </Tag>
      ),
    },

    {
      title: "Acciones",
      dataIndex: "id",
      key: "action",
      render: (id: string) => (
        <Space className="items-baseline gap-2">
          <Button
            title="Editar"
            onClick={() => setIdToEdit(id)}
            icon={<FiEdit3 />}
          />
          <Popconfirm
            okButtonProps={{
              danger: true,
            }}
            title="Estás segur@ de eliminar este viaje ?"
            okText="Sí"
            cancelText="No"
            onConfirm={() => handleDeleteViaje(id)}
          >
            <Button
              title="Eliminar"
              icon={<FaRegTrashCan />}
              type="text"
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      dataSource={viajes?.response}
      columns={columns}
      loading={isLoading}
      rowClassName="editable-row"
      pagination={{
        defaultPageSize: 5,
        position: ["bottomRight"],
        pageSizeOptions: ["5", "10", "20"],
        showSizeChanger: true,
      }}
    />
  );
}
