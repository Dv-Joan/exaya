import AppHead from "@/components/head";
import { useNotification } from "@/context/NotificationContext";
import type { loginSchema } from "@/schemas";
import styles from "@/styles/login.module.css";
import AOSWrapper from "@/utils/AOS";
import { useRouter } from "next/router";
import Router from "next/router";
import { api } from "@/utils/api";
import LoginGradient from "@/assets/login-gradient.png";
import "animate.css";
import { Checkbox, Form, Input, Spin } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { FormInstance } from "antd/es/form";
import { signIn } from "next-auth/react";
import { Black_Ops_One, Literata } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import type { z } from "zod";

const literata = Literata({
  weight: "400",
  subsets: ["latin-ext"],
});

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Login() {
  //Added
  const router = useRouter();
  const version = api.version.exayaVersion.useQuery({ text: "0.1.13" });
  const { openNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  const onChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    if (checked) {
      formRef.current?.setFieldsValue({
        remember: true,
      });
    } else {
      formRef.current?.setFieldsValue({
        remember: false,
      });
    }
  };

  const onFinish = async (
    values: z.infer<typeof loginSchema> & { remember: boolean }
  ) => {
    try {
      setLoading(true);
      console.log(values);
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/dashboard",
        username: values.username,
        password: values.password,
        //Deleted callbackUrl
      });

      setLoading(false);
      if (!res?.error) {
        try {
          // Added
          await router.push("/dashboard");
        } catch (error) {
          console.error("Failed to redirect to dashboard:", error);
        }
      } else {
        onFinishFailed();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onFinishFailed = () => {
    openNotification({
      message: "Credenciales Incorrectas",
      description: "Verifique sus credenciales, recuerde que son precreadas.",
      placement: "topRight",
      type: "error",
    });
  };
  const formRef = useRef<FormInstance>(null);
  return (
    <div
      className={` ${literata.className} flex h-screen  items-center  bg-[#faf1eb] `}
    >
      <AppHead title="Login" />
      <div className="fixed bottom-0 right-0 z-10 p-2  text-sm text-slate-600">
        <h1 className="font-mono ">{version?.data?.currentVersion}</h1>
      </div>
      <div className="fixed bottom-0 right-[510px] z-10 p-2  text-sm text-slate-600">
        <p className="font-mono ">
          User: <span className="font-bold">albert</span>
        </p>
        <p className="font-mono ">
          Password: <span className="font-bold">albert-exaya</span>
        </p>
      </div>
      <Link
        href="/"
        className="fixed right-3 top-3 z-10 flex items-center justify-center text-sm hover:opacity-60  "
      >
        <HiOutlineArrowLeft className="mr-2" />
        Ir Atrás
      </Link>
      {/* //
      "url(https://img.freepik.com/free-photo/traffic-vehicle-urban-reflections-city_1112-973.jpg?size=626&ext=jpg&ga=GA1.1.631442079.1696688262&semt=sph)", */}
      <div
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1432531/pexels-photo-1432531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "right",
          position: "relative",
          width: "50%",
          height: "100%",
        }}
      >
        <div
          style={{
            content: "Exaya",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <div className="animate__animated animate__flipInX relative m-5 flex items-center gap-1">
          <Image
            src="https://cdn-icons-png.flaticon.com/128/10351/10351661.png"
            width={50}
            height={50}
            title="Exaya"
            alt="logo"
            priority
          />
          <h2
            className={`  bg-white bg-clip-text text-left text-3xl text-transparent   ${blackOpsOne.className} `}
          >
            Exaya
          </h2>
          <h5>
            <span className="text-orange-400">|</span> Sistema Web de Gestión
            Operativa <span className="text-orange-400">|</span>
          </h5>
        </div>
        <h5 className="absolute bottom-5 left-5 text-sm  text-slate-200 ">
          Desarrollado por{" "}
          <Link
            href="https://twitter.com/joanpaucar_"
            target="_blank"
            rel="noopener noreferrer"
            className="  text-orange-400 hover:text-orange-500"
          >
            @BrayanPaucar
          </Link>
        </h5>
      </div>

      <div
        style={{
          backgroundImage: `url(${LoginGradient.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          width: "50%",
          height: "100%",
        }}
        className={` ${literata.className} flex w-1/2 flex-col items-center justify-center pl-5`}
      >
        <h3
          className={`  font- bg-gradient-to-r  from-black to-orange-500 bg-clip-text text-left  text-4xl text-transparent   `}
        >
          Inicio de Sesión
        </h3>
        <div className="mb-10 text-center">
          <h4 className=" mt-2">
            Las credenciales son precreadas, solicítalas en el área de TI
          </h4>
        </div>

        <AOSWrapper>
          <Form
            data-aos="fade-in"
            data-aos-duration="500"
            initialValues={{ remember: true }}
            autoComplete="on"
            className={`${literata.className} w-[430px] drop-shadow-md `}
            ref={formRef}
            name="control-ref"
            onFinish={
              onFinish as unknown as (
                values: z.infer<typeof loginSchema>
              ) => void
            }
            onFinishFailed={onFinishFailed}
          >
            <h3 className="mb-2">Usuario</h3>
            <Form.Item
              name="username"
              className={`${literata.className} `}
              rules={[
                {
                  required: true,
                  message: "*Este campo es obligatorio",
                },
              ]}
            >
              <Input
                type="text"
                className={`rounded-lg px-5 py-2  ring-2 ring-orange-300   ${literata.className}`}
              />
            </Form.Item>

            <h4 className="mb-2">Contraseña</h4>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "*Escriba su contraseña",
                },
              ]}
            >
              <Input.Password
                className={`rounded-lg px-5 py-2  ring-2 ring-orange-300   ${literata.className}`}
                type="password"
              />
            </Form.Item>
            <div className="flex flex-col gap-14">
              <Checkbox
                className={`${literata.className}  `}
                onChange={onChange}
              >
                Recordar contraseña
              </Checkbox>
              <button
                type="submit"
                className={styles.button}
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : "Ingresar"}
              </button>
            </div>
          </Form>
        </AOSWrapper>
      </div>
    </div>
  );
}
