"use client";
import ProjectsPage from "../../components/ProjectsPage";
import { projectsData } from "../../data/projects";

export default function ProjectsRoute() {
  return <ProjectsPage projectsData={projectsData} />;
}
