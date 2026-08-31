import LandingPage from "../assets/components/pages/LandingPages/LandingPage";
import Home from "./(tabs)/Home";
import SignIn from "./auth/signin/signin"
import { Redirect } from "expo-router";

export default function Index() {
  // return <LandingPage />;
  // return <Redirect href="/(tabs)/Home" />;
  return <SignIn />;
}