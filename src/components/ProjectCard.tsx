'use client';

import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  color: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const getImageSize = (title: string) => {
    switch (title) {
      case 'Connect 4':
      case 'Quiz Time':
        return { width: 192, height: 192, containerClass: 'w-32 h-32' };
      default:
        return { width: 96, height: 96, containerClass: 'w-24 h-24' };
    }
  };

  const getProjectImage = (title: string) => {
    switch (title) {
      case 'Alien Invasion':
        return '/assets/images/alien_invasion.png';
      case 'Connect 4':
        return '/assets/images/Connect4.png';
      case 'Quiz Time':
        return '/assets/images/QuizTime.png';
      default:
        return '';
    }
  };

  const getHeaderMargin = (title: string) => {
    switch (title) {
      case 'Connect 4':
      case 'Quiz Time':
        return 'mb-2'; // Less margin for larger images
      default:
        return 'mb-4'; // Default margin for smaller images
    }
  };

  return (
    <div className={`${project.color} rounded-3xl p-6 h-full relative overflow-hidden grid-item group`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full" />
        <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className={`flex items-start justify-between ${getHeaderMargin(project.title)}`}>
          {/* Project Image */}
          <div className={`${getImageSize(project.title).containerClass} overflow-hidden`}>
            <Image
              src={getProjectImage(project.title)}
              alt={project.title}
              width={getImageSize(project.title).width}
              height={getImageSize(project.title).height}
              className="object-cover rounded-2xl"
            />
          </div>

          {/* Action Links */}
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors corner-link"
              >
                <Github size={16} className="text-white" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors corner-link"
              >
                <ExternalLink size={16} className="text-white" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-moranga text-[#003049] mb-3">
            {project.title}
          </h3>
          <p className="text-[#003049] font-silka text-sm mb-4 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-silka-medium text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// TODO: Replace with your actual GitHub projects
// To add your projects:
// 1. Update the projects array below with your project data
// 2. Add real GitHub URLs and live demo URLs
// 3. Update project descriptions and tech stacks
// 4. Consider fetching data from GitHub API for dynamic content

const ProjectsShowcase = () => {
  // Featured projects array
  const projects: Project[] = [
    {
      title: "Alien Invasion",
      description: "A classic arcade-style game where you defend Earth from alien invaders. Features multiple levels, power-ups, and increasing difficulty.",
      tech: ["Python", "Pygame", "OOP"],
      githubUrl: "https://github.com/BishalABPS52/Alien-Invasion",
      color: "bg-[#69cdb5]"
    },
    {
      title: "Connect 4",
      description: "A strategic two-player connection game with AI opponent. Implemented using minimax algorithm with alpha-beta pruning for efficient AI moves.",
      tech: ["C++", "SFML", "AI"],
      githubUrl: "https://github.com/BishalABPS52/Connect4",
      color: "bg-[#9ac9f1]"
    },    {
      title: "Quiz Time",
      description: "An interactive quiz application that tests your knowledge across various topics. Features multiple choice questions, score tracking, and instant feedback.",
      tech: ["React", "TypeScript", "TailwindCSS"],
      githubUrl: "https://github.com/BishalABPS52/QuizTime",
      color: "bg-[#f8c4d3]"
    }
  ];

  return (
    <>
      {projects.map((project) => (
        <div key={project.title} className="col-span-1 row-span-2">
          <ProjectCard project={project} />
        </div>
      ))}
    </>
  );
};

export default ProjectsShowcase;
