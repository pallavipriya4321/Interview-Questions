"use client";
import SectionPage from "../../components/SectionPage";
import { fullstackTopics } from "../../data/fullstack";

export default function FullStackPage() {
  return <SectionPage topics={fullstackTopics} accentColor="purple" />;
}
