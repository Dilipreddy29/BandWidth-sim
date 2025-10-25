import React from 'react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {

  const Section: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mb-10 bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700"
    >
      <h2 className="text-2xl font-bold text-sky-400 border-b-2 border-slate-700 pb-2 mb-4">{title}</h2>
      <div className="space-y-4 text-slate-300 leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
  
  const techStack = [
    { name: 'React', description: 'For building the user interface.' },
    { name: 'Tailwind CSS', description: 'For modern, utility-first styling.' },
    { name: 'React Router', description: 'For client-side navigation.' },
    { name: 'Recharts', description: 'For creating dynamic and responsive charts.' },
    { name: 'Framer Motion', description: 'For smooth, declarative animations.' },
  ];

  const creators = [
    { roll: '23071A3203', name: 'Likhita' },
    { roll: '23071A3204', name: 'Dilip Reddy' },
    { roll: '23071A3220', name: 'Datta Reddy' },
    { roll: '23071A3221', name: 'Silpi Kumar' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
        >
            <h1 className="text-4xl font-extrabold text-white">About This Project</h1>
        </motion.div>

        <Section title="Project Overview">
            <p>
                The <strong>Bandwidth Sharing Simulator</strong> is an interactive educational tool designed to demystify complex networking concepts. Its primary goal is to provide a hands-on experience for understanding how a finite amount of bandwidth is allocated among multiple devices using different strategies.
            </p>
            <p>
                Whether you're a student, a developer, or just curious about how the internet works, this simulator offers a visual and intuitive way to explore the trade-offs between various sharing and multiplexing methods.
            </p>
        </Section>

        <Section title="Technology Stack">
            <p>This application was built with a modern, frontend-only tech stack:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
                {techStack.map(tech => (
                    <li key={tech.name}>
                        <span className="font-semibold text-white">{tech.name}:</span> {tech.description}
                    </li>
                ))}
            </ul>
        </Section>
        
        <Section title="About the Creators">
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
                <div className="font-semibold text-white border-b border-slate-600 pb-2">Roll No.</div>
                <div className="font-semibold text-white border-b border-slate-600 pb-2">Name</div>
                
                {creators.map(creator => (
                    <React.Fragment key={creator.roll}>
                        <div className="text-slate-400">{creator.roll}</div>
                        <div>{creator.name}</div>
                    </React.Fragment>
                ))}
            </div>
        </Section>
    </div>
  );
};

export default AboutPage;