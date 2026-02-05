import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Handshake, Sprout, TrendingUp, Heart, Globe } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Direct Farmer-to-Family",
    description: "Connect directly with local farmers, building relationships that nourish both communities and families."
  },
  {
    icon: Handshake,
    title: "No Middlemen",
    description: "Eliminating intermediaries means fair prices for farmers and fresh produce for you."
  },
  {
    icon: Sprout,
    title: "Transparent Soil-to-Plate",
    description: "Track your food's journey from the moment it's planted to when it arrives at your door."
  },
  {
    icon: TrendingUp,
    title: "Fair Farmer Earnings",
    description: "Farmers earn what they deserve, enabling them to invest in better practices and quality."
  },
  {
    icon: Heart,
    title: "Sustainable Growth",
    description: "Supporting regenerative agriculture that heals the earth while feeding communities."
  },
  {
    icon: Globe,
    title: "Community Impact",
    description: "Every purchase supports local farming communities and promotes food security."
  }
];

export const WhoWeAreSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="who-we-are" className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-muted/50 to-transparent -z-10" />
      
      <div className="container mx-auto container-padding" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&h=750&fit=crop"
                  alt="Farmer working in organic field"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Stat Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -right-6 -bottom-6 glass-card p-6 rounded-2xl"
              >
                <div className="text-center">
                  <p className="text-4xl font-display font-bold text-primary mb-1">98%</p>
                  <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                </div>
              </motion.div>

              {/* Decorative Element */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-primary/20 rounded-3xl -z-10" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Who We Are</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
              Revolutionizing the Way{" "}
              <span className="text-primary">Food Reaches You</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              We're building an agricultural ecosystem that honors the hard work of farmers 
              while delivering the freshest, most nutritious produce directly to your family. 
              No compromises, no shortcuts—just pure, honest food.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
