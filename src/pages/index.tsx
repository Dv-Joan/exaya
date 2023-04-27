import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Exaya</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/icon.png" />
			</Head>
			{/* <Login /> */}
			<LandingPage />
		</>
	);
};

export default Home;
