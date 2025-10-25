
import React from 'react';
import { motion } from 'framer-motion';

const ReadPage: React.FC = () => {
  
  const Section: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold text-sky-400 border-b-2 border-sky-500 pb-2 mb-4">{title}</h2>
      <div className="space-y-4 text-slate-300 leading-relaxed">
        {children}
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Section title="What is Bandwidth?">
        <p>
          In computing, bandwidth is the maximum rate of data transfer across a given path. It's often mistaken for internet speed when it's actually the volume of information that can be sent over a connection in a measured amount of time – calculated in megabits per second (Mbps).
        </p>
        <p>
          Think of it like a highway. Bandwidth is the number of lanes, while speed is how fast cars are moving. More lanes allow more cars to travel simultaneously, increasing the total volume of traffic that can be handled.
        </p>
      </Section>

      <Section title="Types of Bandwidth Sharing">
        <h3 className="text-xl font-semibold text-white mt-4">Equal Sharing</h3>
        <p>
          The simplest method. The total available bandwidth is divided equally among all active devices. While fair, it can be inefficient if some devices have low demand while others have high demand.
        </p>

        <h3 className="text-xl font-semibold text-white mt-4">Priority-Based</h3>
        <p>
          Devices are assigned priority levels. Higher-priority devices are allocated bandwidth to meet their demand first. Any remaining bandwidth is then distributed to lower-priority devices. This is crucial for applications that require consistent performance, like video conferencing or online gaming.
        </p>
        
        <h3 className="text-xl font-semibold text-white mt-4">Statistical Multiplexing</h3>
        <p>
          A dynamic method where bandwidth is allocated based on each device's current demand. It assumes that not all devices will require their peak bandwidth simultaneously. Bandwidth is shared proportionally among devices that are actively requesting it, leading to very efficient use of the total capacity.
        </p>
      </Section>

      <Section title="Multiplexing Concepts">
        <h3 className="text-xl font-semibold text-white mt-4">Time-Division Multiplexing (TDM)</h3>
        <p>
          In TDM, the entire bandwidth is dedicated to one device for a very short period of time (a "time slot"). The connection then rapidly switches to the next device in a round-robin fashion. This happens so quickly that it appears all devices are connected simultaneously.
        </p>

        <h3 className="text-xl font-semibold text-white mt-4">Frequency-Division Multiplexing (FDM)</h3>
        <p>
          FDM divides the total bandwidth into several smaller, non-overlapping frequency bands. Each device is assigned its own unique band to transmit data without interfering with others. This is common in radio and television broadcasting.
        </p>
      </Section>

      <Section title="Real-World Use Cases">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Wi-Fi & LAN:</strong> Your home or office network uses statistical multiplexing to handle traffic from multiple devices like laptops, phones, and smart TVs.</li>
          <li><strong>4G/5G Cellular Networks:</strong> Mobile networks use a combination of TDM, FDM, and more advanced techniques like Orthogonal Frequency-Division Multiple Access (OFDMA) to serve thousands of users in a cell.</li>
          <li><strong>Fiber Optic Internet:</strong> Wavelength-Division Multiplexing (WDM) is used to send multiple data streams over a single fiber optic cable using different wavelengths (colors) of light.</li>
        </ul>
      </Section>
    </div>
  );
};

export default ReadPage;