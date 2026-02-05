import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Package, Truck, ShoppingBag, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Farmers Register",
    description: "Local farmers join our platform, verified for organic and sustainable practices.",
    color: "from-primary to-leaf"
  },
  {
    icon: Package,
    title: "Products Listed",
    description: "Fresh produce is listed with full transparency—origin, farming methods, harvest date.",
    color: "from-leaf to-harvest"
  },
  {
    icon: ShoppingBag,
    title: "You Order",
    description: "Browse, select, and order directly from farmers you trust. No middlemen involved.",
    color: "from-harvest to-earth"
  },
  {
    icon: Truck,
    title: "Fresh Delivery",
    description: "Products are harvested and delivered within 24-48 hours for maximum freshness.",
    color: "from-earth to-primary"
  },
  {
    icon: CheckCircle2,
    title: "Enjoy & Review",
    description: "Taste the difference, rate your experience, and support farmers directly.",
    color: "from-primary to-leaf"
  }
];

export const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto container-padding" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            From Soil to Your{" "}
            <span className="text-primary">Table</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A simple, transparent process that connects you directly with farmers 
            and ensures the freshest produce reaches your home.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-harvest to-primary -translate-y-1/2 z-0 opacity-20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>

                <div className="glass-card p-6 rounded-2xl text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <h3 className="font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary/40">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full text-primary font-medium">
            <CheckCircle2 className="w-5 h-5" />
            Average delivery time: 24-48 hours from harvest
          </div>
        </motion.div>
      </div>
    </section>
  );
};
