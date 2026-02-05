import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Tractor, Users, Building2, Rocket,
  DollarSign, Shield, TrendingUp, Heart,
  Leaf, Clock, Award, Handshake,
  Globe, Lightbulb, Network, BarChart3
} from "lucide-react";

const tabs = [
  {
    id: "farmers",
    label: "For Farmers",
    icon: Tractor,
    color: "bg-primary",
    benefits: [
      { icon: DollarSign, title: "Fair Pricing", description: "Earn 40-60% more by selling directly without middlemen" },
      { icon: Shield, title: "Guaranteed Payments", description: "Secure and timely payments for every sale" },
      { icon: TrendingUp, title: "Market Access", description: "Reach thousands of customers across the region" },
      { icon: Lightbulb, title: "Training & Support", description: "Access to modern farming techniques and resources" },
    ]
  },
  {
    id: "users",
    label: "For Families",
    icon: Users,
    color: "bg-harvest",
    benefits: [
      { icon: Leaf, title: "100% Fresh Produce", description: "Harvested within 24 hours of your order" },
      { icon: Shield, title: "Quality Guaranteed", description: "Full transparency on origin and farming practices" },
      { icon: Clock, title: "Convenient Delivery", description: "Door-to-door delivery at your preferred time" },
      { icon: Heart, title: "Support Local", description: "Your purchase directly supports farming families" },
    ]
  },
  {
    id: "communities",
    label: "For Communities",
    icon: Building2,
    color: "bg-leaf",
    benefits: [
      { icon: Users, title: "Job Creation", description: "Supporting rural employment and reducing migration" },
      { icon: Globe, title: "Food Security", description: "Building resilient local food systems" },
      { icon: Award, title: "Sustainable Practices", description: "Promoting eco-friendly farming in your area" },
      { icon: Handshake, title: "Community Bonds", description: "Strengthening farmer-consumer relationships" },
    ]
  },
  {
    id: "startups",
    label: "For Startups",
    icon: Rocket,
    color: "bg-earth",
    benefits: [
      { icon: Network, title: "Ready Infrastructure", description: "Access established supply chain and logistics" },
      { icon: BarChart3, title: "Data & Insights", description: "Market intelligence for informed decisions" },
      { icon: Handshake, title: "Partnership Model", description: "Collaborate and scale with our ecosystem" },
      { icon: TrendingUp, title: "Growth Support", description: "Mentorship and investment opportunities" },
    ]
  }
];

export const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("farmers");

  const activeTabData = tabs.find(tab => tab.id === activeTab)!;

  return (
    <section id="benefits" className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto container-padding relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Benefits & Value</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Creating Value for{" "}
            <span className="text-primary">Everyone</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our platform is designed to benefit all stakeholders in the agricultural ecosystem, 
            creating a sustainable and prosperous future for all.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? `${tab.color} text-primary-foreground shadow-lg`
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {activeTabData.benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl ${activeTabData.color}/10 flex items-center justify-center mb-4`}>
                <benefit.icon className={`w-7 h-7 text-primary`} />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "500+", label: "Active Farmers" },
            { value: "10K+", label: "Happy Customers" },
            { value: "50+", label: "Product Categories" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
