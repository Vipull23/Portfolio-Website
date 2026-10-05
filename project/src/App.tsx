import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Layout from '@/components/Layout';
import Landing from '@/pages/Landing';

// The landing page loads up front; every other page is fetched the first time it's opened.
const About = lazy(() => import('@/pages/About'));
const Experience = lazy(() => import('@/pages/Experience'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Skills = lazy(() => import('@/pages/Skills'));
const Resume = lazy(() => import('@/pages/Resume'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  return (
    // Visitors who ask their OS for reduced motion get instant transitions instead of animations.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
