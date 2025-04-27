"use client";
import { motion } from 'framer-motion'
import { CompanyLogos } from "@/components/Company-logos";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Home from "@/components/Home";
import Preview from "@/components/Preview";
import Solution from "@/components/Solution";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();

  const lightPattern = "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]";
  const darkPattern = "bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]";

  return (
    <div>
      <Header />
      <div className="relative h-full w-full bg-white dark:bg-black transition-colors">
        <Home />
        
        <div
          className={`absolute z-0 bottom-0 left-0 right-0 top-0 
            ${theme === "dark" ? darkPattern : lightPattern} 
            bg-[size:14px_24px] 
            [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]`}
        ></div>
        
      </div>
      <div className="container mt-20 mb-10 mx-auto px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto mb-12 text-center text-lg text-white/70"
            >
              Join Thousands Using Repulens to Monitor Company Reputations
            </motion.p>

            <CompanyLogos />
          </div>
      <Solution/>
      
        <Feature/>
        <Preview/>
      
      <Footer/>
    </div>
  );
}
