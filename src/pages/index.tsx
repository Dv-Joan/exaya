import Asset3D4 from "@/assets/3d-asset-4.png";
import LandingBanner4 from "@/assets/landing-banner-4.svg";
import MobileNav from "@/components/ui/login/mobilenav";
import DevicesVersionSteps from "@/components/ui/login/steps";
import ThemeToggle from "@/components/ui/login/theme-toggle";
import AOSWrapper from "@/utils/AOS";
import { RightCircleOutlined } from "@ant-design/icons";
import "animate.css";
import { Image as AntImage, Tag } from "antd";
import { Black_Ops_One, Dancing_Script, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Nosotros",
    path: "/about",
  },
  {
    title: "Planes",
    path: "/plans",
  },
];

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
});
const dancing_Script = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
});
const inter = Inter({
  weight: ["800", "600", "300"],
  subsets: ["latin-ext"],
  preload: true,
});
export default function Index() {
  return (
    <div className="via-orange-00 bg-gradient-to-r from-orange-300 to-yellow-300 lg:space-y-14">
      <div className="mb-16 flex items-center  justify-between bg-transparent px-3 pt-7 lg:mx-10 lg:mb-36 ">
        <Link href="/">
          <div className="flex  justify-start ">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/10351/10351661.png"
              //40 mobile
              width={40}
              height={40}
              className="animate__animated animate__flip"
              alt="logo"
            />
            <span
              className={` text-xl font-bold text-[#2d1a42] lg:text-3xl ${blackOpsOne.className}`}
            >
              Exaya
            </span>
          </div>
        </Link>
        <nav className="hidden lg:inline-flex">
          <ul className=" flex gap-3.5 ">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  className="flex items-center justify-center font-bold duration-300 hover:text-purple-900  "
                  href={link.path}
                >
                  <span className="mr-2">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="hover:purple-900 group inline-flex items-center rounded-full border-1 border-black bg-transparent  px-4 py-1 font-semibold duration-500 hover:border-orange-400 hover:bg-orange-500  hover:text-white active:bg-orange-500 "
          >
            Ver Demo
          </Link>
        </div>
        <nav className="lg:hidden">
          <MobileNav />
        </nav>
      </div>
      <AOSWrapper>
        <div
          data-aos="fade-up"
          className={`${inter.className} flex h-screen flex-col items-center justify-center  text-center`}
        >
          <div className="space-y-14  px-7 py-16">
            <div className="relative space-y-7">
              <h1 className="text-3xl font-bold tracking-tight lg:text-7xl">
                Conduce tu empresa hacia la excelencia operativa
              </h1>
              {/* //TODO: < br/> separation changes it's place win mobile version  */}
              <div className="space-y-3.5 font-semibold lg:text-2xl ">
                <p className="tracking-tight">
                  El socio tecnológico que acelera el crecimiento de tu <br />
                  empresa en la industria del transporte
                </p>
                <blockquote className="lg:text-4xl">
                  <p className={`${dancing_Script.className} `}>
                    "La elección
                    <Tag
                      color="gold-inverse"
                      className={`${dancing_Script.className} animate__animated animate__fadeIn animate__delay-1s mx-2 rounded-lg  px-2 drop-shadow-lg lg:text-4xl `}
                    >
                      SaaS
                    </Tag>
                    de las empresas líderes"
                  </p>
                </blockquote>
              </div>
            </div>
            <div className="relative">
              <Link
                href="/dashboard"
                className="hover:purple-900 group inline-flex items-center rounded-full border-b-[3px] border-orange-800 bg-orange-500 px-5 py-2  font-semibold text-zinc-200 shadow-lg shadow-orange-400   duration-500 hover:bg-orange-500 hover:px-14 active:bg-orange-900 lg:px-10  lg:py-5 lg:text-2xl "
              >
                <RightCircleOutlined
                  twoToneColor={"red"}
                  className="mr-4 duration-300 group-hover:mr-2 lg:mr-7 "
                />
                Ver Demo
              </Link>

              <Image
                src={Asset3D4}
                // width = {80 mobile}
                width={130}
                height={130}
                title="Exaya"
                className="animate__animated animate__fadeInDown animate__delay-2s absolute -top-16 right-0 rotate-45 drop-shadow-xl "
                alt="asset"
              />
            </div>
            <AntImage.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              <div className="flex flex-col justify-center gap-7 lg:flex-row  ">
                <AntImage
                  src="https://imgur.com/UH4xUQO.png"
                  alt="banner"
                  className="rounded-2xl duration-300  
             "
                  //300 mobile
                  width={500}
                />
                <AntImage
                  src="https://imgur.com/4D47umW.png"
                  alt="banner"
                  className="rounded-2xl object-cover drop-shadow-xl duration-300 
              "
                  //300 mobile
                  width={500}
                />
              </div>
            </AntImage.PreviewGroup>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          className="mx-7 flex items-center justify-center gap-2"
        >
          <Image
            src={LandingBanner4}
            alt="banner"
            className=" mt-36 flex rounded-2xl drop-shadow-xl"
            //300 mobile
            width={900}
          />
          <DevicesVersionSteps />
        </div>
      </AOSWrapper>

      <footer className="pb-7 pt-24 text-center text-[12px]  lg:text-sm   ">
        © Copyright 2024 Brayan Paucar. All rights reserved.
      </footer>
    </div>
  );
}
