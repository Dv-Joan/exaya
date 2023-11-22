import React from "react";
import { ProgramacionTable } from "@/components/ui/programacion/programacion-viajes-table";
import { ViajesForm } from "@/components/ui/programacion/viajes-form";
import AppLayout from "@/components/layout";
import AppHead from "@/components/head";
import { Typography } from "antd";
const { Title } = Typography;
function ProgramacionViajes() {
  return (
    <AppLayout>
      <AppHead title="Programacion de Viajes" />
      <div className="space-y-3.5">
        <Title level={5}>Programacion de Viajes</Title>
        <ViajesForm />
        <Title level={5}>Historial de Salidas</Title>
        <ProgramacionTable />
      </div>
    </AppLayout>
  );
}

export default ProgramacionViajes;
