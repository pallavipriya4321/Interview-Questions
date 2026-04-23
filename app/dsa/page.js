"use client";
import DSAPage from "../../components/DSAPage";
import { dsaData } from "../../data/dsa";

export default function DSARoute() {
  return <DSAPage dsaData={dsaData} />;
}
