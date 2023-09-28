import AppHeader from "@/components/appheader";
import { AiOutlineSetting } from "react-icons/ai";
import { BsTicketPerforated } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { GrMoney } from "react-icons/gr";
import { HiOutlineSupport } from "react-icons/hi";
import { IoMdTimer } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiLuggageCartLine } from "react-icons/ri";

import { Title } from "@mantine/core";
import "animate.css";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { AIAssistantInput } from "./ui/panel-de-control/ai-assistant-input";

const { Header, Footer, Sider, Content } = Layout;

interface LayoutProps {
  children: React.ReactNode;
}
const items: MenuProps["items"] = [
  {
    label: <Link href="/dashboard">Dashboard</Link>,
    key: "dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    label: <Link href="/venta-pasajes">Pasajes</Link>,
    key: "venta-pasajes",
    icon: <BsTicketPerforated />,
  },
  {
    label: <Link href="/encomiendas">Encomiendas</Link>,
    icon: <RiLuggageCartLine />,
    key: "encomiendas",
  },

  {
    key: "programacion",
    label: "Programación",
    icon: <IoMdTimer />,
    children: [
      {
        key: "bus-conductor",
        label: <Link href="/programacion/bus-conductor">Bus Conductor</Link>,
      },
      {
        key: "comprobantes",
        label: <Link href="/programacion/comprobantes">Comprobantes</Link>,
      },
      {
        key: "viajes",
        label: <Link href="/programacion/viajes">Viajes</Link>,
      },
    ],
  },
  {
    label: <Link href="/contable">Contable</Link>,
    icon: <GrMoney />,
    key: "contable",
  },
  {
    key: "administacion",
    label: <Link href="/administracion">Administración</Link>,
    icon: <AiOutlineSetting />,
  },
  {
    label: <Link href="/soporte">Soporte</Link>,
    key: "soporte",
    icon: <HiOutlineSupport />,
  },
  {
    key: "logout",
    icon: <CgLogOut />,
    label: <Link href="/login">Cerrar Sesión</Link>,
    danger: true,
  },
];

export default function AppLayout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* //! Sider is one of components that cause the Hydration issue */}
      <Sider
        className=" m-2  rounded-lg border-2  border-slate-200 border-opacity-50 shadow-xl"
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
          borderRadius: 21,
          maxHeight: "86vh",
        }}
        collapsedWidth={50}
        onCollapse={(value) => setCollapsed(value)}
      >
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        {/* // TODO: Add a selected key to the menu */}
        <Menu mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          className=" m-2 mt-2.5 flex  items-center justify-between  rounded-lg  border-2 border-slate-200  border-opacity-50 shadow-md"
          style={{
            background: colorBgContainer,
            borderRadius: 14,
          }}
        >
          <AIAssistantInput />
          <Title
            order={4}
            className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text font-black  text-transparent"
          >
            Tu Empresa
          </Title>
        </Header>
        <Content
          style={{
            background: colorBgContainer,
            padding: 21,
            borderRadius: 21,
          }}
          className=" m-2  rounded-lg border-2 border-slate-100  border-opacity-50  bg-purple-100  shadow-xl"
        >
          {children}
        </Content>
        <Footer className="my-5 text-center text-sm text-slate-500">
          © Copyright 2024 Brayan Paucar . All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
}
