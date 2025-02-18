import { useMessageContext } from "@/context/MessageContext";
import { api } from "@/utils/api";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Button, Form, Input, Modal, Space, Typography } from "antd";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TbLicense } from "react-icons/tb";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { busSchema } from "@/schemas";
import type { z } from "zod";

type Props = {
  activator: string;
};
const { Title } = Typography;

export function BusForm({ activator }: Props) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openMessage } = useMessageContext();
  const utils = api.useUtils();
  const [source, setSource] = useState<string | undefined>();
  const { mutate: createBusMutation, isLoading } =
    api.buses.createBus.useMutation();
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSource(undefined);
  };

  function onFinish(values: z.infer<typeof busSchema>) {
    createBusMutation(
      {
        ...values,
        asientos: Number(values.asientos),
        foto: source,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSuccess: async (response) => {
          openMessage({
            content: response.message,
            type: "success",
            duration: 3,
          });
          form.resetFields();
          setSource(undefined);
          setIsModalOpen(false);
          await utils.buses.getAllBuses.invalidate();
        },
        onError: (error) => {
          openMessage({
            content: error.message,
            type: "error",
            duration: 3,
          });
        },
      }
    );
  }

  return (
    <>
      <Button
        icon={<AiOutlinePlusCircle size={15} />}
        type="primary"
        loading={isLoading}
        onClick={() => setIsModalOpen(true)}
      >
        {activator}
      </Button>
      <Modal
        width={350}
        centered
        title={
          <p className="mb-7">
            <Title level={3}>Agregar Bus</Title>
            <Typography.Text className=" font-light ">
              Rellene los campos para registrar un nuevo bus
            </Typography.Text>
          </p>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="asientos"
            label="N° de Asientos"
            rules={[
              {
                required: true,
                message: "Ingresa la cantidad de asientos",
              },
              {
                pattern: /^[0-9]+(\.[0-9]+)?$/,
                message: "Solo valores numéricos",
              },
            ]}
          >
            <Input type="number" placeholder="45" maxLength={2} />
          </Form.Item>

          <Form.Item
            name="placa"
            label="Placa de Rodaje"
            rules={[
              {
                required: true,
                message: "Ingresa la placa del bus",
                whitespace: true,
              },
            ]}
          >
            <Input
              addonBefore={<TbLicense title="Placa" />}
              placeholder="LXC-48C"
            />
          </Form.Item>
          <Form.Item
            name="modelo"
            label="Modelo"
            rules={[
              {
                message: "Ingresa el modelo del bus",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Scania Turismo Grant" />
          </Form.Item>
          <Form.Item label="Foto del Bus">
            <div>
              <CldUploadWidget
                uploadPreset="ml_default"
                options={{
                  folder: "exaya",
                  maxImageFileSize: 5000000,
                  sources: ["local", "url", "camera"],
                  language: "es",
                  text: {
                    es: {
                      or: "o",
                      menu: {
                        files: "Mis Archivos",
                        web: "Desde una URL",
                        camera: "Cámara",
                      },
                      selection_counter: {
                        selected: "Seleccionado",
                      },
                      queue: {
                        mini_title_processing: "Procesando...",
                        mini_upload_count: "{{num}} archivo(s) subido(s)",
                        done: "Listo",
                        statuses: {
                          uploading: "Subiendo...",
                          error: "Error",
                          timeout: "Tiempo de espera agotado",
                          uploaded: "Subido",
                          aborted: "Abortado",
                          processing: "Procesando...",
                        },
                      },
                      local: {
                        browse: "Buscar",
                        dd_title_single: "Arrastra y suelta un archivo aquí",
                        dd_title_multi: "Arrastra y suelta archivos aquí",
                        drop_title_single: "Arrastra y suelta un archivo aquí",
                        drop_title_multiple: "Arrastra y suelta archivos aquí",
                      },
                    },
                  },

                  autoMinimize: true,
                }}
                onSuccess={(result) => {
                  if (
                    typeof result?.info === "object" &&
                    "secure_url" in result.info
                  ) {
                    setSource(result.info.secure_url);
                  }
                }}
              >
                {({ open }) => {
                  function handleOnClick() {
                    setSource(undefined);
                    open();
                  }
                  return (
                    <Button
                      disabled={source !== undefined}
                      onClick={handleOnClick}
                    >
                      Cargar Imagen
                    </Button>
                  );
                }}
              </CldUploadWidget>
              {source && (
                <CldImage
                  width="100"
                  className="border-rounded mt-2 rounded-lg border border-dashed"
                  height="100"
                  src={source}
                  sizes="50vw"
                  alt="Imagen"
                />
              )}
            </div>
          </Form.Item>
          <Space className="mt-10 flex justify-end">
            <Button loading={isLoading} htmlType="submit" type="primary">
              Registrar
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
}
