"use client";
import SectionPage from "../../components/SectionPage";
import { frontendTopics } from "../../data/frontend";

export default function FrontendPage() {
  return <SectionPage topics={frontendTopics} accentColor="blue" />;
}
