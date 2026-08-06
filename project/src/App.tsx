import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '@/pages/Landing';
import About from '@/pages/About';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import Skills from '@/pages/Skills';
import Resume from '@/pages/Resume';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
