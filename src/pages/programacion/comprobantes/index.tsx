import AppLayout from "@/components/exaya/layout";
import {
  Card,
  FloatButton,
  Typography,
  QRCode,
  Statistic,
  type StatisticProps,
} from "antd";
import CountUp from "react-countup";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import BoletosTable from "@/components/ui/programacion/comprobantes/boletos-table";
import { Steps } from "antd";
import FacturasTable from "@/components/ui/programacion/comprobantes/facturas-table";
import AppHead from "@/components/landing/head";
import { RxClipboardCopy } from "react-icons/rx";
import BoletosEncomiendasTable from "@/components/ui/programacion/comprobantes/boletos-encomiendas-table.";
import { api } from "@/utils/api";
import { useCallback, useEffect, useState } from "react";
import { useNotification } from "@/context/NotificationContext";

const { Title } = Typography;
function ProgramacionComprobantes() {
  const [current, setCurrent] = useState(0);
  const { data: pasajes } = api.boletos.getAllBoletos.useQuery();
  const { openNotification } = useNotification();
  const { data: encomiendas } =
    api.encomiendas.getAllBoletosEncomiendas.useQuery();
  const totalBoletos = (pasajes?.length ?? 0) + (encomiendas?.length ?? 0);
  const { data: facturas } =
    api.encomiendas.getAllFacturasEncomiendas.useQuery();

  const handleSunatTaxesSender = useCallback(() => {
    setTimeout(() => {
      if (current < 3) {
        setCurrent(current + 1);
      }
    }, 3000);
    if (current === 3) {
      openNotification({
        message: "Comprobantes enviados",
        description:
          "Los comprobantes registrados han sido enviados a la base de datos de la SUNAT",
        type: "success",
        placement: "bottomRight",
      });
    }
  }, [current, openNotification]);
  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp delay={2000} duration={10} end={value as number} separator="," />
  );
  useEffect(() => {
    handleSunatTaxesSender();
  }, [handleSunatTaxesSender]);

  return (
    <AppLayout>
      <AppHead title="Programacion Comprobantes" />
      <BoletosTable />
      <BoletosEncomiendasTable />
      <FacturasTable />
      <div className="flex gap-3.5">
        <Card
          className=" min-h-[150px]  backdrop-blur-3xl duration-200 hover:bg-blue-100/20   hover:shadow-md dark:hover:bg-black/50"
          type="inner"
          bordered
          title={<Title level={4}>Boletos Registrados</Title>}
        >
          <div className="flex items-center gap-3.5">
            <Statistic
              title="Cantidad de boletos enviados a la base de datos de la SUNAT"
              value={totalBoletos}
              className="w-36"
              formatter={formatter}
              prefix={<HiOutlineClipboardCopy size={30} />}
            />
            <QRCode value="https://ww1.sunat.gob.pe/ol-at-ittramitedoc/registro/iniciar" />
          </div>
        </Card>
        <Card
          className="min-h-[150px] backdrop-blur-3xl duration-200   hover:bg-blue-100/20   hover:shadow-md dark:hover:bg-black/50"
          type="inner"
          bordered
          title={<Title level={4}>Facturas Generadas</Title>}
        >
          <div className="flex items-center gap-3.5">
            <Statistic
              title="
            Facturas registradas hacia la base de datos de la SUNAT"
              value={facturas?.length}
              className="w-36"
              precision={2}
              formatter={formatter}
              prefix={<RxClipboardCopy size={30} className="mt-2" />}
            />
            <QRCode value="https://ww1.sunat.gob.pe/ol-at-ittramitedoc/registro/iniciar" />
          </div>
        </Card>
        <Steps
          size="small"
          onChange={handleSunatTaxesSender}
          className="ml-10 mt-5"
          direction="vertical"
          current={current}
          items={[
            {
              title: "Actualizado",
              description: "2023-08-20 12:45:00",
            },
            {
              title: "Cargado",
              description: "2023-12-20 22:14:00",
            },
            {
              title: "En la SUNAT",
              description: "2023-15-20 07:36:00",
            },
          ]}
        />
      </div>

      <FloatButton.BackTop className="bottom-4 right-4" />
    </AppLayout>
  );
}

export default ProgramacionComprobantes;
