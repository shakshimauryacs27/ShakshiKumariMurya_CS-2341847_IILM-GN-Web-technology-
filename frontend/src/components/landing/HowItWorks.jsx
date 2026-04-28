import { motion } from "framer-motion";
import StepCard from "./StepCard";
import steps from "./stepsData.js";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2>How It Works</h2>

      <div className="steps">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.2
            }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 }
            }}
          >
            <StepCard
              stepNumber={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;