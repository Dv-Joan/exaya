import React from "react";
import { Button, Space, Table, Tag, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IUsuario } from "@/interfaces";
import { usuarios } from "@/data";

const columns: ColumnsType<IUsuario> = [
  {
    title: "Nombres",
    dataIndex: "nombres",
    key: "nombres",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Apellidos",
    dataIndex: "apellidos",
    key: "apellidos",
  },
  {
    title: "DNI",
    dataIndex: "dni",
    key: "dni",
  },
  {
    title: "Agencia Sede",
    key: "sede",
    dataIndex: "sede",
    render: (sede: string) => (
      <Tag className="font-semibold" key={sede}>
        {sede.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Rol del Usuario",
    dataIndex: "rol",
    key: "rol",
    render: (rol: string) => (
      <Tag
        color={
          rol === "administrador"
            ? "gold-inverse"
            : rol === "usuario"
            ? "blue-inverse"
            : rol === "supervisor"
            ? "green-inverse"
            : "purple-inverse"
        }
        className="rounded-full font-semibold shadow-md "
        key={rol}
      >
        {rol.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Acciones",
    key: "acciones",
    render: (_, record) => {
      const cancel = () => {
        console.log("Cancelado");
      };
      return (
        <Space size="middle">
          <Button type="dashed">
            Editar <code className="ml-2 underline">{record.nombres}</code>{" "}
          </Button>
          <Popconfirm
            okButtonProps={{
              style: {
                backgroundColor: "#f5222d",
                color: "white",
                borderRadius: "5px",
                border: "none",
              },
            }}
            title="Estás segur@ ?"
            onConfirm={cancel}
          >
            <Button type="link" danger>
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
];

const UsuariosTable: React.FC = () => (
  <Table columns={columns} dataSource={usuarios} />
);

export default UsuariosTable;
