"use client";
import SectionPage from "../../components/SectionPage";
import { androidTopics } from "../../data/android";

export default function AndroidPage() {
  return <SectionPage topics={androidTopics} accentColor="green" />;
}
