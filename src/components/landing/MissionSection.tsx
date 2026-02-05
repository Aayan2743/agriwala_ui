import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, TrendingDown, Link2Off, Rocket } from "lucide-react";

const problems = [
  {
    icon: TrendingDown,
    title: "Farmers' Income Crisis",
    description: "70% of farmers earn below living wage due to exploitative middlemen taking unfair cuts.",
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    icon: AlertTriangle,
    title: "Food Safety Concerns",
    description: "Lack of transparency in supply chains leads to unknown pesticide exposure and quality issues.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    icon: Link2Off,
    title: "Broken Supply Chains",
    description: "Multiple intermediaries cause price inflation, food waste, and disconnection from sources.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    icon: Rocket,
    title: "Startup Scaling Issues",
    description: "Agricultural startups struggle with infrastructure, trust-building, and market access.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  }
];

export const MissionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="mission" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-harvest/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto container-padding relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Mission</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Solving the Biggest Challenges in{" "}
            <span className="text-primary">Agriculture</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We identified the core problems plaguing our food systems and built a platform 
            that addresses each one with innovative, farmer-first solutions.
          </p>
        </motion.div>

        {/* Mission Statement Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-3xl mb-16 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🌱</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            "To create a world where every farmer thrives and every family 
            eats food they can trust."
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our mission is to revolutionize the agricultural supply chain, ensuring transparency, 
            fairness, and sustainability at every step—from seed to table.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card p-6 rounded-2xl hover:shadow-elevated transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${problem.bgColor} flex items-center justify-center mb-4`}>
                <problem.icon className={`w-7 h-7 ${problem.color}`} />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
