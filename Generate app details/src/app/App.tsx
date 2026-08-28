import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Menu,
  X,
  ArrowRight,
  Search,
  Users,
  Building2,
  Award,
  Globe,
  Mail,
  Heart,
  Phone,
  BookOpen,
  Handshake,
  TrendingUp,
  MapPin,
  Filter,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Page =
  | "home"
  | "about"
  | "projects"
  | "impact"
  | "community"
  | "gallery"
  | "donate"
  | "news"
  | "fellowship"
  | "partner"
  | "wotr"    
  | "peace"
  | "eplan"
  | "eplim"
  | "contact"
  | "communities";

// ─── Data ─────────────────────────────────────────────────────────────────────

const fellows = [
  {
    id: 1,
    name: "Abena Osei-Bonsu",
    role: "Policy Analyst",
    institution: "Ministry of Finance",
    cohort: "Cohort 8",
    sector: "Public Finance",
    location: "Accra",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&auto=format",
    bio: "Abena brings rigorous analytical skills to fiscal policy reform, committed to building transparent financial systems for Ghana's future.",
  },
  {
    id: 2,
    name: "Kwame Asante",
    role: "Programme Officer",
    institution: "Ghana Health Service",
    cohort: "Cohort 7",
    sector: "Health",
    location: "Kumasi",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format",
    bio: "Kwame works at the intersection of public health and community engagement, driving health equity across the Ashanti Region.",
  },
  {
    id: 3,
    name: "Efua Mensah",
    role: "District Planning Officer",
    institution: "Accra Metropolitan Assembly",
    cohort: "Cohort 8",
    sector: "Local Government",
    location: "Accra",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&auto=format",
    bio: "Efua leads inclusive urban planning processes that put communities at the centre of Greater Accra's development.",
  },
  {
    id: 4,
    name: "Kofi Darko",
    role: "Agricultural Extension Officer",
    institution: "Ministry of Food and Agriculture",
    cohort: "Cohort 6",
    sector: "Agriculture",
    location: "Tamale",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&auto=format",
    bio: "Kofi connects smallholder farmers to modern agricultural solutions and sustainable farming practices across Northern Ghana.",
  },
  {
    id: 5,
    name: "Ama Boateng",
    role: "Education Coordinator",
    institution: "Ghana Education Service",
    cohort: "Cohort 7",
    sector: "Education",
    location: "Cape Coast",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=500&fit=crop&auto=format",
    bio: "Ama is transforming learning outcomes in the Central Region through innovative, community-centred educational approaches.",
  },
  {
    id: 6,
    name: "Nana Yaw Boadu",
    role: "Infrastructure Engineer",
    institution: "Ghana Highway Authority",
    cohort: "Cohort 5",
    sector: "Infrastructure",
    location: "Accra",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&auto=format",
    bio: "Nana Yaw builds resilient infrastructure systems contributing to Ghana's connectivity and economic development.",
  },
  {
    id: 7,
    name: "Akosua Frimpong",
    role: "Social Protection Officer",
    institution: "Department of Social Welfare",
    cohort: "Cohort 8",
    sector: "Social Development",
    location: "Accra",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&auto=format",
    bio: "Akosua strengthens Ghana's social protection systems to reach the most vulnerable communities with dignity.",
  },
  {
    id: 8,
    name: "Emmanuel Adjei",
    role: "Environment Officer",
    institution: "Environmental Protection Agency",
    cohort: "Cohort 6",
    sector: "Environment",
    location: "Accra",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&auto=format",
    bio: "Emmanuel leads environmental governance initiatives protecting Ghana's natural resources for future generations.",
  },
];
const projects = [
  {
    id: 1,
    title: "Emerging Public Leaders Fellowship",
    category: "Core Programme",
    description:
      "A flagship 12-month leadership development programme placing young professionals in public institutions across Ghana. Fellows receive structured mentorship, targeted training and peer learning that builds lasting leadership capacity.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=700&fit=crop&auto=format",
    impact: "500+ Fellows across 8 cohorts",
  },

  {
    id: 2,
    title: "EPL in Maritime (EPLIM)",
    category: "Program",
    description:
      "A leadership programme developing emerging leaders in Ghana's maritime sector through practical learning, mentorship, professional development and exposure to the institutions shaping the country's maritime future.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=700&fit=crop&auto=format",
    impact: "Developing leaders in Ghana's maritime sector",
  },

  {
    id: 3,
    title: "Women on the Rise",
    category: "Program",
    description:
      "Empowering women in public service through targeted leadership training, mentorship networks and deliberate spaces that amplify women's voices in institutional decision-making across Ghana.",
    image:
      "https://images.unsplash.com/photo-1573497019236-d22bce4b7c9f?w=800&h=500&fit=crop&auto=format",
    impact: "120+ women leaders developed",
  },

  {
    id: 4,
    title: "P.E.A.C.E.",
    category: "Initiative",
    description:
      "Promoting Ethical Action in Civic Environments — building ethical leadership and governance principles in public institutions through focused cohorts, peer accountability and applied research.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop&auto=format",
    impact: "Policy frameworks in development",
  },
];

const coreValues = [
  {
    number: "01",
    name: "Partnership",
    description:
      "We believe in the core values of collaboration. By fostering strong partnerships accross sectors and communities, We create meaningful connections that drive collective impact and sustainable change in public service.",
  },
  {
    number: "02",
     name: "Integrity",
    description:
      "Operating with transparency, honesty and ethical consistency in everything we do, modelling the very values we seek to develop in our Fellows.",
  },
   
  
  {
    number: "03",
    name: "Value-Based Leadership",
    description:
      "Developing leaders guided not only by competence, but by a deep commitment to public good, ethical service and institutional responsibility.",

  },
  {
    number: "04",
    name: "Excellence",
    description:
      "Maintaining the highest standards in programme design, Fellow development and organisational practice — excellence is not a goal, it is our baseline.",
    
  },
  {
    number: "05",
    name: "Transparency",
    description:
      "We embrace openess and clear communication in our operations and relationships. Transparency builds trust and reinforces our credibility as a public service organisation.",
  },
  {
    number: "06",
    name: "Sustainability",
    description:
      "Building systems, relationships and practices designed to endure long after any single programme, cohort or partnership.",
  },
];

// ─── Menu Sections Data ───────────────────────────────────────────────────────

const menuSections = [
  {
    title: "About",
    page: "about" as Page,
    links: [
      {
        label: "Who We Are",
        desc: "Our origin, purpose and journey",
      },
      {
        label: "Mission & Vision",
        desc: "What drives us forward",
      },
      {
        label: "Our Values",
        desc: "The principles we live by",
      },
      {
        label: "Leadership & Team",
        desc: "The people behind EPL Ghana",
      },
      { 
        label: "Partners", 
        desc: "Who we work with" 
      },
    ]
  },
  {
    title: "Programmes",
    page: "projects" as Page,
    links: [
      {
        label: "Emerging Public Leaders Fellowship",
        desc: "Our flagship 12-month programme",
      },
      {
        label: "Women on the Rise",
        desc: "Empowering women in public service",
      },
      {
        label: "P.E.A.C.E.",
        desc: "Ethical action in civic environments",
      },
      {
        label: "EPL in Maritime (EPLIM)",
        desc: "Developing leaders for Ghana's maritime future",
      },
      {
        label: "Other Projects",
        desc: "Additional EPL Ghana initiatives",
      },
    ],
  },
  {
    title: "Impact",
    page: "impact" as Page,
    links: [
      {
        label: "Impact Overview",
        desc: "Our reach across Ghana",
      },
      {
        label: "Success Stories",
        desc: "Fellows making a difference",
      },
      {
        label: "Community Stories",
        desc: "Transformation across districts",
      },
      {
        label: "Testimonials",
        desc: "Voices from mentors, supervisors & partners",
      },
      {
        label: "Annual Reports",
        desc: "Our accountability in numbers",
      },
      {
        label: "Research & Publications",
        desc: "Knowledge we generate",
      },
    ],
  },
  {
    title: "Community",
    page: "community" as Page,
    links: [
      {
        label: "Current Cohort",
        desc: "Our eighth cohort of Fellows",
      },
      {
        label: "EPLAN",
        desc: "Alumni network of 500+ leaders",
      },
    ],
  },
  {
    title: "Media & Engage",
    page: "news" as Page,
    links: [
      {
        label: "News & Insights",
        desc: "Updates, events & publications",
      },
      {
        label: "Photo Gallery",
        desc: "Events, training & cohort highlights",
      },
      {
        label: "Get Involved", 
        desc: "Ways to be part of our work",
      },
      {
        label: "Partner With Us",
        desc: "Strategic partnerships",
      },
      { label: "Donate", desc: "Support our mission" },
      { label: "Contact Us", desc: "Get in touch with our team" },
    ],
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useScrollInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const steps = 55;
    const inc = value / steps;
    const timer = setInterval(() => {
      current += inc;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else setCount(Math.floor(current));
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [timeLeft, setTimeLeft] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return timeLeft;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useScrollInView(0.08);
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 36,
        }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── EPL Logo ─────────────────────────────────────────────────────────────────

function EPLLogo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <div
        className={`w-9 h-9 flex items-center justify-center flex-shrink-0 ${light ? "bg-[#F4BD12]" : "bg-[#4150A3]"}`}
      >
        <span
          className={`font-black text-xs leading-none tracking-tight ${light ? "text-black" : "text-white"}`}
        >
          EPL Ghana
        </span>
      </div>
      <div className="leading-none">
        <div
          className={`font-black text-[9px] tracking-[0.18em] uppercase ${light ? "text-white" : "text-[#4150A3]"}`}
        >
          EMERGING
        </div>
        <div
          className={`font-black text-[9px] tracking-[0.18em] uppercase ${light ? "text-white" : "text-[#4150A3]"}`}
        >
          PUBLIC LEADERS
        </div>
        <div
          className={`font-semibold text-[7px] tracking-[0.12em] uppercase ${light ? "text-white/50" : "text-[#A6A6A6]"}`}
        >
          OF GHANA
        </div>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({
  currentPage,
  setPage,
  menuOpen,
  setMenuOpen,
}: {
  currentPage: Page;
  setPage: (p: Page) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-[0_1px_16px_rgba(0,0,0,0.08)]" : "bg-white/96 backdrop-blur-sm"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 lg:h-20 gap-4 lg:gap-8">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-[11px] font-black tracking-[0.22em] uppercase text-[#4150A3] hover:text-[#F4BD12] transition-colors flex-shrink-0 group cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </motion.div>
            <span className="hidden sm:inline">Menu</span>
          </button>

          <button
            onClick={() => setPage("home")}
            className="flex-shrink-0 ml-1 cursor-pointer"
          >
            <EPLLogo />
          </button>

          <nav className="hidden lg:flex items-center gap-7 ml-6">
            {(["about", "projects", "community"] as Page[]).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setPage(page)}
                  className={`text-[11px] font-black tracking-[0.18em] uppercase transition-colors cursor-pointer ${currentPage === page ? "text-[#4150A3]" : "text-gray-600 hover:text-[#4150A3]"}`}
                >
                  {page === "news"
                    ? "News & Insights"
                    : page.charAt(0).toUpperCase() +
                      page.slice(1)}
                </button>
              ),
            )}
          </nav>

          <div className="flex-1" />

          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setPage("donate")}
              className="bg-[#F4BD12] text-black text-[10px] font-black tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-[#4150A3] hover:text-white transition-all duration-200 cursor-pointer"
            >
              Donate
            </button>
            <button
              onClick={() => setPage("partner")}
              className="border border-[#4150A3] text-[#4150A3] text-[10px] font-black tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-[#4150A3] hover:text-white transition-all duration-200 cursor-pointer"
            >
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Mega Menu ────────────────────────────────────────────────────────────────

function MegaMenu({
  open,
  onClose,
  setPage,
}: {
  open: boolean;
  onClose: () => void;
  setPage: (p: Page) => void;
}) {
  const pageMap: Record<string, Page> = {
    "Who We Are": "about",
    "Mission & Vision": "about",
    "Our Values": "about",
    "Leadership & Team": "about",
    Partners: "about",
    "Emerging Public Leaders Fellowship": "fellowship",
    "Women on the Rise": "wotr",
    "P.E.A.C.E.": "peace",
    "EPL in Maritime (EPLIM)": "eplim",
    "EPLIM": "eplim",
    "Other Projects": "projects",
    "Impact Overview": "impact",
    "Success Stories": "impact",
    "Community Stories": "impact",
    Testimonials: "impact",
    "Annual Reports": "impact",
    "Research & Publications": "impact",
    "Current Cohort": "community",
    EPLAN: "eplan",
    Alumni: "eplan",
    "Alumni Network": "eplan",
    "News & Insights": "news",
    "Photo Gallery": "gallery",
    Gallery: "gallery",
    "Get Involved": "community",
    "Partner With Us": "partner",
    Donate: "donate",
    "Contact Us": "contact", 
    Contact: "contact",
  };

  const sectionMap: Record<string, string> = {
    "Who We Are": "about-story",
    "Mission & Vision": "about-mission-vision",
    "Our Values": "about-values",
    "Leadership & Team": "about-team",
    Partners: "about-partners",
    "Impact Overview": "impact-overview",
    "Success Stories": "impact-stories",
    "Community Stories": "community-stories",
    Testimonials: "testimonials",
    "Annual Reports": "impact-reports",
    "Research & Publications": "impact-reports",
    "Current Cohort": "community-directory",
    "Get Involved": "community-get-involved",
    "Partner With Us": "enquiry",
    Donate: "ways-to-give",
  };

  const handleLinkClick = (label: string) => {
    const targetPage = pageMap[label] ?? "home";
    const targetSectionId = sectionMap[label];

    setPage(targetPage);
    onClose();

    if (targetSectionId) {
      setTimeout(() => {
        const element = document.getElementById(targetSectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: open ? 1 : 0, y: open ? 0 : -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: open ? "all" : "none" }}
      className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-[#4150A3] shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              <button
                onClick={() => {
                  setPage(section.page);
                  onClose();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-[10px] font-black tracking-[0.22em] uppercase text-[#F4BD12] mb-5 block hover:text-white transition-colors cursor-pointer"
              >
                {section.title}
              </button>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.label)}
                      className="text-left group block cursor-pointer"
                    >
                      <div className="text-sm font-semibold text-white/90 group-hover:text-[#F4BD12] transition-colors leading-snug">
                        {link.label}
                      </div>
                      <div className="text-xs text-white/45 mt-0.5 hidden lg:block leading-snug">
                        {link.desc}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-white/20 flex items-center justify-between">
          <span className="text-[10px] text-white/35 tracking-widest uppercase">
            Emerging Public Leaders of Ghana
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X size={13} /> Close Menu
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({
  setPage,
}: {
  setPage: (p: Page) => void;
}) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0f1630]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&h=1000&fit=crop&auto=format)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1630]/96 via-[#0f1630]/80 to-[#4150A3]/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-10 h-[2px] bg-[#F4BD12]" />
            <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
              Emerging Public Leaders of Ghana
            </span>
          </motion.div>
          {[
            "Public Service is",
            "Strengthened",
            "by People",
          ].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.45 + i * 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h1
                  className={`font-black leading-[0.95] tracking-tight ${
                    i === 1
                      ? "text-[#F4BD12] text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-1"
                      : i === 2
                        ? "text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6"
                        : "text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-1"
                  }`}
                >
                  {line}
                </h1>
              </motion.div>
            </div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="text-white/75 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg"
          >
            Developing ethical, critical-thinking and
            change-driven public leaders to strengthen public
            service institutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => setPage("community")}
              className="bg-[#F4BD12] text-black font-black text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white transition-colors cursor-pointer"
            >
              Get Involved
            </button>
            <button
              onClick={() => setPage("about")}
              className="border border-white/35 text-white font-black text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:border-white hover:bg-white/10 transition-all flex items-center gap-2 group cursor-pointer"
            >
              Learn More{" "}
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="w-[1px] h-10 bg-white/25"
        />
        <span className="text-white/30 text-[9px] tracking-[0.25em] uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

// ─── Why EPL ──────────────────────────────────────────────────────────────────

function WhyEPL({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <section className="py-16 md:py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="relative max-w-lg mx-auto lg:max-w-none w-full">
              <div
                className="aspect-[4/3] bg-gray-100 bg-cover bg-center shadow-md border border-gray-100"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=900&h=675&fit=crop&auto=format)",
                }}
              />
              <div className="absolute -bottom-4 -right-4 bg-[#F4BD12] py-4 px-5 hidden sm:block shadow-md">
                <div className="text-3xl font-black text-black leading-none">
                  8
                </div>
                <div className="text-[9px] font-black tracking-[0.2em] uppercase text-black/70 mt-1">
                  Cohorts
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                  Why EPL Ghana
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] mb-6">
                Public service is strengthened by people.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                Emerging Public Leaders of Ghana believes the
                quality of public institutions is ultimately
                determined by the quality of the people within
                them.
              </p>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
                We develop ethical, critical-thinking, and
                change-driven leaders — Fellows who go on to
                serve in public institutions and create lasting
                impact across communities, regions, and national
                systems.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <button
                onClick={() => setPage("about")}
                className="flex items-center gap-3 text-[#4150A3] font-black text-[11px] tracking-[0.22em] uppercase hover:gap-5 transition-all group cursor-pointer"
              >
                Discover EPL Ghana
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1.5 transition-transform text-[#F4BD12]"
                />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── EPL Way ──────────────────────────────────────────────────────────────────

function EPLWay() {
  const ways = [
    {
      word: "Think Critically",
      title: "Analytical rigor & strategic problem-solving.",
      description:
        "We equip aspiring public leaders with data-driven policy analysis, evidence-based reasoning, and strategic innovation to navigate complex institutional challenges.",
      image:
        "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=600&h=800&fit=crop&auto=format",
      overlay: "rgba(65,80,163,0.88)",
    },
    {
  word: "Act Ethically",
  title: "Integrity, transparency & values-led service.",
  description:
    "Leadership begins with character. We instill an uncompromising commitment to accountability, fairness, and moral conviction across every level of public administration.",
  image:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=800&fit=crop&auto=format",
  overlay: "rgba(15,22,48,0.90)",
},
    {
      word: "Drive Change",
      title: "Transforming institutions & local communities.",
      description:
        "Fellows don't just study policy — they put it into action. By leading community initiatives and streamlining civil service processes, they create real, measurable impact.",
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&h=800&fit=crop&auto=format",
      overlay: "rgba(180,140,0,0.88)",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                How We Work
              </span>
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              The EPL Way
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-0">
          {ways.map((way, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div
                className="relative overflow-hidden cursor-pointer group"
                style={{ aspectRatio: "3/4" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
                  style={{
                    backgroundImage: `url(${way.image})`,
                    transform: "scale(1)",
                  }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to top, ${way.overlay} 0%, ${way.overlay.replace(/[\d.]+\)$/, "0.4)")} 60%)`,
                  }}
                />
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  <div className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase mb-3">
                    0{i + 1}
                  </div>
                  <h3 className="font-black text-4xl md:text-5xl text-white leading-none mb-4">
                    {way.word}
                  </h3>
                  <p className="text-white/90 text-sm font-semibold leading-relaxed mb-4">
                    {way.title}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400 max-h-0 group-hover:max-h-24 overflow-hidden">
                    {way.description}
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <ArrowRight
                      size={20}
                      className="text-[#F4BD12] group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectsSection({
  setPage,
}: {
  setPage: (p: Page) => void;
}) {
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                Our Work
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Projects That Move
              <br className="hidden md:block" /> Public Service
              Forward
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="group cursor-pointer mb-6"
            onClick={() => setPage("fellowship")}
          >
            <div className="relative overflow-hidden aspect-video md:aspect-[16/7] bg-gray-200">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                style={{
                  backgroundImage: `url(${featured.image})`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-3">
                  {featured.category}
                </div>

                <h3 className="text-white text-2xl md:text-4xl font-black leading-tight mb-3 max-w-xl">
                  {featured.title}
                </h3>

                <p className="text-white/65 text-sm md:text-base max-w-md leading-relaxed mb-5 hidden md:block">
                  {featured.description}
                </p>

                <span className="flex items-center gap-3 text-white font-black text-[10px] tracking-[0.22em] uppercase group-hover:gap-5 transition-all">
                  Explore Project <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((proj, i) => (
            <Reveal key={proj.id} delay={i * 0.1}>
              <div
                className="group cursor-pointer"
                onClick={() => setPage("wotr")}
              >
                <div className="relative overflow-hidden aspect-video bg-gray-200">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
                    style={{
                      backgroundImage: `url(${proj.image})`,
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 p-6 md:p-8">
                    <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-2">
                      {proj.category}
                    </div>

                    <h3 className="text-white text-xl font-black leading-tight mb-3">
                      {proj.title}
                    </h3>

                    <span className="flex items-center gap-2 text-white/80 text-[10px] font-black tracking-[0.2em] uppercase group-hover:gap-4 transition-all">
                      Explore <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="flex justify-end mt-10">
            <button
              onClick={() => setPage("peace")}
              className="flex items-center gap-2 text-[#4150A3] font-black text-[10px] tracking-[0.22em] uppercase hover:gap-4 transition-all group cursor-pointer"
            >
              All Projects{" "}
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Impact Strip ─────────────────────────────────────────────────────────────

function ImpactStrip() {
  const stats = [
    { value: 500, suffix: "+", label: "Fellows" },
    { value: 12, suffix: "+", label: "Public Institutions" },
    { value: 8, suffix: "", label: "Cohorts" },
    { value: 85, suffix: "%", label: "Career Advancement" },
  ];

  return (
    <section className="bg-[#4150A3] py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-white/20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:px-8">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.22em] uppercase mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Beyond Numbers ───────────────────────────────────────────────────────────

function BeyondNumbers({
  setPage,
}: {
  setPage: (p: Page) => void;
}) {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                Impact Stories
              </span>
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Beyond the Numbers
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="grid lg:grid-cols-2 gap-0 mb-6 group cursor-pointer"
            onClick={() => setPage("impact")}
          >
            <div
              className="aspect-[4/3] lg:aspect-auto bg-cover bg-center min-h-64 bg-gray-200 transition-transform duration-700 group-hover:scale-[1.01] overflow-hidden"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=700&fit=crop&auto=format)",
              }}
            />
            <div className="bg-[#4150A3] p-9 md:p-14 flex flex-col justify-center">
              <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-5">
                Featured Story
              </div>
              <h3 className="text-white text-2xl md:text-3xl font-black leading-tight mb-3">
                From Fellow to Policy Leader
              </h3>
              <div className="text-white/50 text-sm mb-5">
                Abena Osei-Bonsu · Cohort 3 · Ministry of
                Finance
              </div>
              <blockquote className="text-white/80 text-lg font-light italic leading-relaxed mb-7 border-l-2 border-[#F4BD12] pl-5">
                "EPL didn't just teach me to lead. It showed me
                what leadership in service to Ghana truly
                means."
              </blockquote>
              <button className="flex items-center gap-3 text-[#F4BD12] font-black text-[10px] tracking-[0.22em] uppercase group-hover:gap-5 transition-all cursor-pointer">
                Read Her Story <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: "Kwame Asante",
              cohort: "Cohort 7",
              role: "Ghana Health Service",
              quote:
                "The fellowship transformed how I see my role in public health.",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format",
            },
            {
              name: "Efua Mensah",
              cohort: "Cohort 8",
              role: "Accra Metropolitan Assembly",
              quote:
                "EPL gave me the tools and the community to drive real change from within.",
              image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop&auto=format",
            },
          ].map((story, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className="bg-white group cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setPage("impact")}
              >
                <div
                  className="aspect-video bg-cover bg-center overflow-hidden bg-gray-200"
                  style={{
                    backgroundImage: `url(${story.image})`,
                  }}
                >
                  <div
                    className="w-full h-full transition-transform duration-700 group-hover:scale-[1.05] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${story.image})`,
                    }}
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase mb-2">
                    {story.cohort}
                  </div>
                  <h4 className="font-black text-gray-900 text-lg mb-1">
                    {story.name}
                  </h4>
                  <div className="text-gray-400 text-sm mb-4">
                    {story.role}
                  </div>
                  <p className="text-gray-500 italic text-sm leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Latest Section ───────────────────────────────────────────────────────────

const UPCOMING_EVENT = {
  title: "EPL Annual Leadership Forum 2026",
  description:
    "A full-day gathering of Ghana's emerging and established public leaders — featuring keynote addresses, panel discussions, networking and the formal welcome of Cohort 9.",
  date: new Date("2026-09-15T09:00:00"),
  dateLabel: "15 September 2026",
  location: "Accra International Conference Centre, Accra",
  image:
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&h=800&fit=crop&auto=format",
};

function LatestSection() {
  const { days, hours, minutes, seconds } = useCountdown(
    UPCOMING_EVENT.date,
  );

  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Mins" },
    { value: seconds, label: "Secs" },
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-[2px] bg-[#F4BD12]" />
            <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
              Upcoming Event
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12">
            Latest Updates from EPL Ghana
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-0 overflow-hidden shadow-xl">
          <Reveal>
            <div
              className="relative overflow-hidden bg-[#4150A3]"
              style={{ minHeight: 420 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${UPCOMING_EVENT.image})`,
                }}
              />
              <div className="absolute inset-0 bg-[#4150A3]/30" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-[#F4BD12] text-black text-[9px] font-black tracking-[0.22em] uppercase px-3 py-1.5">
                  Annual Forum
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-white p-8 md:p-12 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">
                  {UPCOMING_EVENT.title}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-7 text-sm md:text-base">
                  {UPCOMING_EVENT.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#4150A3] flex items-center justify-center flex-shrink-0">
                      <svg
                        width="15"
                        height="15"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        strokeWidth={2}
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                        />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-black tracking-widest uppercase text-gray-300">
                        Date
                      </div>
                      <div className="font-black text-gray-900 text-sm">
                        {UPCOMING_EVENT.dateLabel}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#F4BD12] flex items-center justify-center flex-shrink-0">
                      <MapPin
                        size={14}
                        className="text-black"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] font-black tracking-widest uppercase text-gray-300">
                        Location
                      </div>
                      <div className="font-black text-gray-900 text-sm">
                        {UPCOMING_EVENT.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[9px] font-black tracking-[0.25em] uppercase text-gray-300 mb-4">
                  Event Countdown
                </div>
                <div className="grid grid-cols-4 gap-2 mb-7">
                  {units.map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <div
                        className="bg-[#4150A3] text-white font-black text-xl md:text-2xl leading-none flex items-center justify-center"
                        style={{ height: 54 }}
                      >
                        {String(value).padStart(2, "0")}
                      </div>
                      <div className="text-[9px] font-black tracking-[0.2em] uppercase text-gray-400 mt-1.5">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full flex items-center justify-center gap-3 bg-[#F4BD12] text-black font-black text-[11px] tracking-[0.22em] uppercase py-4 hover:bg-[#4150A3] hover:text-white transition-all duration-200 group cursor-pointer">
                  Register for Event
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <EPLWay />
      <ProjectsSection setPage={setPage} />
      <ImpactStrip />
      <BeyondNumbers setPage={setPage} />
      <LatestSection />
    </>
  );
}

// ─── Value Flip Card ──────────────────────────────────────────────────────────

const VALUE_ACCENT_COLORS = [
  "#4150A3",
  "#0f1630",
  "#4150A3",
  "#0f1630",
  "#4150A3",
  "#0f1630",
];

function ValueFlipCard({
  value,
  index,
  delay,
}: {
  value: (typeof coreValues)[0];
  index: number;
  delay: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const { ref, inView } = useScrollInView(0.15);

  return (
    <div
      ref={ref}
      className="cursor-pointer select-none"
      style={{
        perspective: "900px",
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0)"
          : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        style={{
          position: "relative",
          height: 180,
          transformStyle: "preserve-3d",
          transform: flipped
            ? "rotateY(180deg)"
            : "rotateY(0deg)",
          transition:
            "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: VALUE_ACCENT_COLORS[index],
          }}
        >
          <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase mb-3">
            {value.number}
          </div>
          <div className="text-white font-black text-xl leading-tight">
            {value.name}
          </div>
          <div className="mt-4 w-6 h-[1.5px] bg-[#F4BD12]/50" />
          <div className="mt-2 text-white/40 text-[9px] tracking-widest uppercase">
            Tap to reveal
          </div>
        </div>
        <div
          className="absolute inset-0 flex flex-col justify-center p-6 bg-white border-2 border-gray-100"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-[#4150A3] text-[10px] font-black tracking-[0.22em] uppercase mb-2">
            {value.name}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {value.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

function AboutPage({
  setPage,
}: {
  setPage: (p: Page) => void;
}) {
  const [activeTab, setActiveTab] = useState<"leadership" | "team">("leadership");

  const team = [
    {
      name: "Board chair",
      role: "Board chair",
      image:
       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&auto=format",
      tab: "leadership",
    },
    {
      name: "Programmes Director",
      role: "Leadership",
      image:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&auto=format",
      tab: "leadership",
    },
    {
      name: "Programmes Coordinator",
      role: "Team",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&auto=format",
      tab: "team",
    },
    {
      name: "Communications Officer",
      role: "Team",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format",
      tab: "team",
    },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Header */}
      <section className="relative min-h-[58vh] flex items-center overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#4150A3]/82" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-28">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                About EPL Ghana
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Who We Are
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/75 text-xl max-w-xl leading-relaxed">
              A non-profit organisation committed to developing Ghana's next
              generation of ethical, critical-thinking public servants.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Target for: "Who We Are" */}
      <section id="about-story" className="py-14 md:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <Reveal className="lg:col-span-3">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                    Our Story
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-5 leading-tight">
                  A Movement for Stronger Public Service
                </h2>
                <p className="text-gray-500 leading-relaxed mb-4">
                  Launched in 2018, EPL Ghana was founded on the conviction that public institutions are only as strong 
                  as the people within them. Through our 12-month Emerging Public Leaders Fellowship, we place talented 
                  young Ghanaians inside public sector institutions for immersive training, executive mentorship, and hands-on 
                  service, working toward an ambitious goal of nurturing over 275 dedicated Fellows by 2030 to drive lasting national 
                  transformation.
                </p>
                
              </div>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-2">
              <div
                className="aspect-video bg-gray-100 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop&auto=format)",
                }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Target for: "Mission & Vision" */}
      <section id="about-mission-vision" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-0">
            <Reveal>
              <div className="bg-[#4150A3] p-12 lg:p-16 h-[400px]">
                <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-3">
                  Mission
                </div>
                <div className="text-white/50 text-[10px] font-black tracking-[0.2em] uppercase mb-7 border-b border-white/15 pb-6">
                  What We Do
                </div>
                <p className="text-white text-xl md:text-2xl font-bold leading-snug">
                  To develop ethical, critical-thinking and change-driven public
                  sector leaders who strengthen Ghana's institutions and serve the
                  public good.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="bg-[#0f1630] p-12 lg:p-16 h-[400px]">
                <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-3">
                  Vision
                </div>
                <div className="text-white/50 text-[10px] font-black tracking-[0.2em] uppercase mb-7 border-b border-white/15 pb-6">
                  Where We Are Going
                </div>
                <p className="text-white text-xl md:text-2xl font-bold leading-snug">
                  A Ghana where public institutions are led by principled,
                  capable and innovative leaders committed to national
                  development and public welfare.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Target for: "Our Values" */}
      <section id="about-values" className="py-20 md:py-32 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                Core Values
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              The principles that guide everything we do.
            </h2>
            <p className="text-gray-400 mb-12">
              Click any value to reveal its meaning.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {coreValues.map((v, i) => (
              <ValueFlipCard
                key={i}
                value={v}
                index={i}
                delay={i * 0.07}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Target for: "Leadership & Team" */}
      <section id="about-team" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-7">
                The People Behind EPL Ghana
              </h2>
              <div className="inline-flex border border-gray-200">
                {(["leadership", "team"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-2.5 text-[10px] font-black tracking-[0.2em] uppercase transition-all cursor-pointer ${activeTab === tab ? "bg-[#4150A3] text-white" : "text-gray-400 hover:text-gray-700"}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team
              .filter((p) => p.tab === activeTab)
              .map((person, i) => (
                <Reveal key={i} delay={i * 0.09}>
                  <div className="group">
                    <div
                      className="aspect-[3/4] bg-gray-200 bg-cover bg-center overflow-hidden mb-4 relative"
                      style={{
                        backgroundImage: `url(${person.image})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-[#4150A3]/0 group-hover:bg-[#4150A3]/25 transition-colors duration-300" />
                    </div>
                    <div className="font-black text-gray-900">
                      {person.name}
                    </div>
                    <div className="text-[#4150A3] text-sm font-semibold tracking-wide mt-0.5">
                      {person.role}
                    </div>
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* Target for: "Partners" */}
      <section id="about-partners" className="py-20 bg-white border-t border-gray-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                  Ecosystem
                </span>
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Our Partners &amp; Sponsors
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                We work with government agencies, development partners and the
                private sector to build Ghana's public leadership capacity.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
              {[
                {
                  name: "Government of Ghana",
                  img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=120&h=120&fit=crop&auto=format",
                  initials: "GoG",
                },
                {
                  name: "Civil Service Authority",
                  img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=120&h=120&fit=crop&auto=format",
                  initials: "CSA",
                },
                {
                  name: "UNDP Ghana",
                  img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=120&h=120&fit=crop&auto=format",
                  initials: "UNDP",
                },
                {
                  name: "US Embassy",
                  img: "https://images.unsplash.com/photo-1573497019236-d22bce4b7c9f?w=120&h=120&fit=crop&auto=format",
                  initials: "US",
                },
                {
                  name: "European Union",
                  img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format",
                  initials: "EU",
                },
                {
                  name: "British Council",
                  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format",
                  initials: "BC",
                },
              ].map((partner, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="group cursor-pointer flex flex-col items-center gap-3 p-5 bg-white border border-gray-100 hover:border-[#4150A3] transition-all duration-300 hover:shadow-md">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-[#4150A3]/10 flex-shrink-0 relative">
                      <img
                        src={partner.img}
                        alt={partner.name}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-[#4150A3]/40 group-hover:bg-transparent transition-colors">
                        <span className="text-white font-black text-[9px] tracking-wide group-hover:opacity-0 transition-opacity">
                          {partner.initials}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#4150A3] text-center leading-tight transition-colors">
                      {partner.name}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="text-center mt-10">
              <button
                onClick={() => setPage("partner")}
                className="inline-flex items-center gap-3 border-2 border-[#4150A3] text-[#4150A3] font-black text-[10px] tracking-[0.22em] uppercase px-8 py-3.5 hover:bg-[#4150A3] hover:text-white transition-all cursor-pointer"
              >
                Partner With Us <ArrowRight size={15} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// ─── News & Insights Page ─────────────────────────────────────────────────────

const eventsData = [
  {
    id: 1,
    title: "EPL Annual Public Leadership Forum 2026",
    category: "EPL Hosted",
    date: "15 September 2026",
    time: "09:00 AM - 04:30 PM",
    location: "Accra International Conference Centre",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=500&fit=crop&auto=format",
    desc: "A full-day flagship convening bringing together current fellows, government heads, and institutional partners to examine ethical governance in Ghana.",
  },
  {
    id: 2,
    title:
      "Civil Service Innovation & Digital Governance Summit",
    category: "Partnered Event",
    date: "28 October 2026",
    time: "10:00 AM - 03:00 PM",
    location: "Kempinski Hotel Gold Coast City, Accra",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop&auto=format",
    desc: "Co-hosted with the Ministry of Communications and UNDP Ghana to discuss institutional automation and public sector data frameworks.",
  },
  {
    id: 3,
    title:
      "Public Sector Career Masterclass & Fellowship Info Session",
    category: "Upcoming Event",
    date: "12 November 2026",
    time: "02:00 PM - 05:00 PM",
    location: "Virtual (Zoom Live Stream)",
    image:
      "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=800&h=500&fit=crop&auto=format",
    desc: "An orientation for prospective young public servants covering fellowship eligibility, interview prep, and placements.",
  },
  {
    id: 4,
    title: "Women in Governance Roundtable: Breaking Ceilings",
    category: "EPL Hosted",
    date: "05 December 2026",
    time: "11:00 AM - 02:30 PM",
    location: "Civil Service Training Centre, Accra",
    image:
      "https://images.unsplash.com/photo-1573497019236-d22bce4b7c9f?w=800&h=500&fit=crop&auto=format",
    desc: "An interactive dialogue celebrating the leadership journeys of women leading critical ministries and civil service departments.",
  },
];

const newsAndBlogs = [
  {
    id: 1,
    type: "News",
    title:
      "EPL Ghana Inducts Largest Cohort to Date Across 15 Public Institutions",
    date: "12 August 2026",
    author: "EPL Communications",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop&auto=format",
    excerpt:
      "Emerging Public Leaders of Ghana formally placed over 60 exceptional young public servants into key government directorates.",
  },
  {
    id: 2,
    type: "Blog",
    title:
      "Why Ethics and Digital Competence Are the Twins of Modern Public Service",
    date: "28 July 2026",
    author: "Dr. Naa Adjei-Mensah",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop&auto=format",
    excerpt:
      "Examining how modern governance systems in West Africa require leaders who balance moral conviction with technological proficiency.",
  },
  {
    id: 3,
    type: "News",
    title:
      "Cohort 8 Fellows Complete Regional Waste & Water Audit in Greater Accra",
    date: "15 July 2026",
    author: "EPL Policy Desk",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit=crop&auto=format",
    excerpt:
      "Fellows stationed across municipal assemblies presented actionable policy frameworks to streamline regional sanitation oversight.",
  },
  {
    id: 4,
    type: "Blog",
    title:
      "The Power of Mentorship: From Recent Graduate to Civil Service Leader",
    date: "02 June 2026",
    author: "Kwame Asante (Cohort 7)",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&auto=format",
    excerpt:
      "A personal reflection on how dedicated executive coaching bridges the gap between academic theory and complex civil service dynamics.",
  },
];

function NewsInsightsPage({
  setPage,
}: {
  setPage: (p: Page) => void;
}) {
  const [eventFilter, setEventFilter] = useState("All Events");
  const [opportunityModal, setOpportunityModal] = useState<
    string | null
  >(null);

  const eventCategories = [
    "All Events",
    "EPL Ghana Hosted",
    "Partnered Event",
    "Upcoming Event",
  ];

  const filteredEvents =
    eventFilter === "All Events"
      ? eventsData
      : eventsData.filter((e) => e.category === eventFilter);

  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      <section className="relative min-h-[48vh] flex items-center overflow-hidden bg-[#0f1630]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#4150A3] opacity-85" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                  Updates &amp; Engagement
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                News &amp; Insights
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                Stay updated with our public sector events,
                fellow recruitment opportunities, and thought
                leadership pieces.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="events"
        className="py-16 md:py-24 bg-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                    Convenings &amp; Forums
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                  Events &amp; Summits
                </h2>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {eventCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setEventFilter(cat)}
                    className={`px-4 py-2 text-xs font-bold whitespace-nowrap uppercase transition-colors border cursor-pointer ${
                      eventFilter === cat
                        ? "bg-[#4150A3] text-white border-[#4150A3]"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredEvents.map((evt, i) => (
              <Reveal key={evt.id} delay={i * 0.08}>
                <div className="bg-gray-50 border border-gray-200 overflow-hidden flex flex-col justify-between h-full hover:border-[#4150A3] hover:shadow-md transition-all">
                  <div className="relative aspect-[16/9] bg-gray-200 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                      style={{
                        backgroundImage: `url(${evt.image})`,
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#F4BD12] text-black text-[9px] font-black tracking-widest uppercase px-3 py-1.5 shadow-sm">
                        {evt.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-black text-gray-900 text-lg md:text-xl leading-snug mb-3">
                        {evt.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                        {evt.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200/80 space-y-2 text-xs text-gray-600">
                      <div className="flex items-center gap-2 font-medium">
                        <span className="text-[#4150A3] font-bold uppercase text-[10px]">
                          Date:
                        </span>
                        <span>
                          {evt.date} · {evt.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={13}
                          className="text-[#F4BD12] flex-shrink-0"
                        />
                        <span className="truncate">
                          {evt.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="opportunities"
        className="py-20 bg-gray-50 border-y border-gray-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                  Join The Movement
                </span>
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Opportunities at EPL Ghana
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Whether launching your public service career or
                contributing your skills as a community
                volunteer, discover open pathways below.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Reveal delay={0.08}>
              <div className="bg-white border-2 border-gray-200 p-8 flex flex-col justify-between h-full hover:border-[#4150A3] hover:shadow-lg transition-all">
                <div>
                  <div className="w-10 h-10 bg-[#4150A3] text-white flex items-center justify-center mb-5 font-black text-sm">
                    01
                  </div>
                  <div className="text-[#F4BD12] text-[10px] font-black tracking-widest uppercase mb-1">
                    Recruitment Open
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    Apply to be a Fellow
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    A competitive 12-month public service
                    leadership program placing high-achieving
                    university graduates directly inside Ghana's
                    government ministries, departments, and
                    regional agencies.
                  </p>

                  <ul className="space-y-2 mb-8 text-xs text-gray-600 font-medium">
                    <li className="flex items-center gap-2">
                      ✓ Full monthly stipend &amp; placement
                      coverage
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ 1-on-1 executive mentoring from senior
                      public leaders
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Intensive public administration &amp;
                      ethics curriculum
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() =>
                    setOpportunityModal(
                      "Fellowship Application",
                    )
                  }
                  className="w-full bg-[#4150A3] text-white font-black text-[10px] tracking-[0.2em] uppercase py-3.5 hover:bg-[#F4BD12] hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Apply for Fellowship</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="bg-white border-2 border-gray-200 p-8 flex flex-col justify-between h-full hover:border-[#4150A3] hover:shadow-lg transition-all">
                <div>
                  <div className="w-10 h-10 bg-[#F4BD12] text-black flex items-center justify-center mb-5 font-black text-sm">
                    02
                  </div>
                  <div className="text-[#4150A3] text-[10px] font-black tracking-widest uppercase mb-1">
                    Community Action
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    Volunteer with EPL Ghana
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    Lend your technical, organizational, or
                    creative skills to support public service
                    forums, community audits, field surveys, and
                    fellow training hackathons across the
                    country.
                  </p>

                  <ul className="space-y-2 mb-8 text-xs text-gray-600 font-medium">
                    <li className="flex items-center gap-2">
                      ✓ Event coordination &amp; logistics
                      support
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Research assistance &amp; community data
                      collection
                    </li>
                    <li className="flex items-center gap-2">
                      ✓ Media, photojournalism &amp;
                      storytelling tasks
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() =>
                    setOpportunityModal("Volunteer Application")
                  }
                  className="w-full border-2 border-[#4150A3] text-[#4150A3] font-black text-[10px] tracking-[0.2em] uppercase py-3.5 hover:bg-[#4150A3] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Register as Volunteer</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="blogs"
        className="py-20 md:py-28 bg-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                Articles &amp; Thought Leadership
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">
              News &amp; Blog Posts
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsAndBlogs.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.08}>
                <div className="bg-gray-50 border border-gray-200 flex flex-col justify-between h-full group hover:border-[#4150A3] hover:bg-white hover:shadow-md transition-all">
                  <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${post.image})`,
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-1 ${
                          post.type === "News"
                            ? "bg-[#4150A3] text-white"
                            : "bg-[#F4BD12] text-black"
                        }`}
                      >
                        {post.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                        {post.date} · {post.author}
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-snug mb-2.5 group-hover:text-[#4150A3] transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-200 text-[#4150A3] text-[10px] font-black tracking-widest uppercase flex items-center gap-1">
                      <span>Read Full Story</span>
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {opportunityModal && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setOpportunityModal(null)}
        >
          <div
            className="bg-white max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#4150A3] p-6 text-white relative">
              <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-1">
                EPL Ghana Opportunities
              </div>
              <h3 className="text-2xl font-black text-white leading-tight">
                {opportunityModal}
              </h3>
              <button
                onClick={() => setOpportunityModal(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/30 p-1.5 rounded-full transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                Fill in your details below to begin your
                expression of interest for the{" "}
                {opportunityModal}.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    `Thank you! Your ${opportunityModal} has been submitted.`,
                  );
                  setOpportunityModal(null);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] font-black tracking-wider uppercase text-gray-500 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abena Mensah"
                    className="w-full border border-gray-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#4150A3]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-wider uppercase text-gray-500 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full border border-gray-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#4150A3]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-wider uppercase text-gray-500 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+233 ..."
                    className="w-full border border-gray-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#4150A3]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-wider uppercase text-gray-500 block mb-1">
                    Brief Statement of Motivation
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us why you would like to join EPL..."
                    className="w-full border border-gray-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#4150A3] resize-none"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.2em] uppercase py-3.5 hover:bg-[#4150A3] hover:text-white transition-all cursor-pointer text-center"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpportunityModal(null)}
                    className="border border-gray-300 px-4 py-3.5 text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Projects Page ────────────────────────────────────────────────────────────

function ProjectsPage({ setPage }: { setPage: (p: Page) => void }) {
 
const handleProjectClick = (title: string) => {
  const t = title.toLowerCase();

  if (t.includes("Emerging Public Leaders Fellowship")) {
    setPage("fellowship");
  } else if (t.includes("women on the rise")) {
    setPage("wotr");
  } else if (t.includes("p.e.a.c.e")) {
    setPage("peace");
  } else if (
    t.includes("epl in maritime") ||
    t.includes("eplim")
  ) {
    setPage("eplim");
  }
};




      {/* INTRODUCTION */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* IMAGE */}
            <Reveal>
              <div
                className="aspect-[4/3] bg-gray-100 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&h=900&fit=crop&auto=format)",
                }}
              />
            </Reveal>

            {/* TEXT */}
            <Reveal delay={0.12}>
              <div>
                <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                  EPLIM
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-7">
                  EPL in Maritime
                </h2>

                <p className="text-gray-500 text-lg leading-relaxed mb-6">
                  EPL in Maritime (EPLIM) is a leadership initiative
                  focused on developing the next generation of ethical,
                  capable and innovative leaders within Ghana's maritime
                  sector.
                </p>

                <p className="text-gray-500 text-lg leading-relaxed">
                  The programme creates opportunities for emerging leaders
                  to build practical leadership skills, strengthen their
                  understanding of the maritime industry and connect with
                  professionals and institutions contributing to Ghana's
                  maritime development.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>


      {/* LEADERSHIP SECTION */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="grid lg:grid-cols-2 gap-0">

            <Reveal>
              <div className="bg-[#4150A3] p-10 lg:p-16 h-full">
                <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                  Leadership
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                  Preparing Leaders for the Maritime Future
                </h2>

                <p className="text-white/70 text-lg leading-relaxed">
                  EPLIM seeks to strengthen leadership capacity within
                  Ghana's maritime space by equipping participants with
                  the confidence, knowledge and practical skills needed
                  to contribute meaningfully to the sector.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div
                className="min-h-[360px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=1200&h=800&fit=crop&auto=format)",
                }}
              />
            </Reveal>

          </div>
        </div>
      </section>


      {/* WHAT EPLIM DOES */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                The Programme
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Building Maritime Leaders
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">

            <Reveal>
              <div className="border border-gray-200 p-8 h-full">
                <div className="text-[#4150A3] text-3xl font-black mb-5">
                  01
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-4">
                  Leadership Development
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  Developing leadership capabilities that enable emerging
                  professionals to lead with integrity, confidence and
                  purpose.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border border-gray-200 p-8 h-full">
                <div className="text-[#4150A3] text-3xl font-black mb-5">
                  02
                </div>
              
                <h3 className="text-xl font-black text-gray-900 mb-4">
                  Industry Exposure
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  Creating opportunities to understand Ghana's maritime
                  ecosystem and engage with professionals and institutions
                  within the sector.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="border border-gray-200 p-8 h-full">
                <div className="text-[#4150A3] text-3xl font-black mb-5">
                  03
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-4">
                  Professional Growth
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  Supporting participants to develop the networks,
                  knowledge and professional confidence needed to make
                  a lasting contribution.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>


function EplimPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* ─── HERO & PREVIOUS SECTIONS HERE ─── */}

      {/* ─── FINAL IMAGE + MESSAGE ─── */}
      <section className="py-20 md:py-28 bg-[#0f1630]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <Reveal>
              <div
                className="aspect-[4/3] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1530053969600-caed2596d242?w=1200&h=800&fit=crop&auto=format)",
                }}
              />
            </Reveal>

            <Reveal delay={0.12}>
              <div>
                <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                  Our Impact
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                  Shaping the Future of Maritime Leadership
                </h2>

                <p className="text-white/65 text-lg leading-relaxed">
                  EPLIM is part of EPL Ghana's broader commitment to developing
                  leaders who can strengthen institutions, drive innovation and
                  contribute to national development.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </div>
  );
}

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative min-h-[52vh] flex items-center bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#0f1630]/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-28">
          <Reveal>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                Our Program
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight max-w-2xl">
              Projects That Move Public Service Forward
            </h1>
          </Reveal>
        </div>
      </section>

   <section className="py-20 md:py-28">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid lg:grid-cols-2 gap-6">

      {projects.map((project, i) => (
        <Reveal key={project.id} delay={i * 0.08}>
          <div className="bg-gray-50 flex flex-col h-full">

            <div
              className="aspect-[4/3] bg-gray-100 bg-cover bg-center"
              style={{
                backgroundImage: `url(${project.image})`,
              }}
            />

            <div className="p-8 lg:p-10 flex flex-col flex-1">

              <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                {project.category}
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">
                {project.title}
              </h2>

              <p className="text-gray-500 leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex items-center gap-3 text-[#4150A3] text-sm font-bold tracking-wide mb-7">
                <Award
                  size={16}
                  className="text-[#F4BD12] flex-shrink-0"
                />
                {project.impact}
              </div>

              <button
                onClick={() => handleProjectClick(project.title)}
                className="self-start flex items-center gap-3 bg-[#4150A3] text-white font-black text-[10px] tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-[#F4BD12] hover:text-black transition-all group cursor-pointer mt-auto"
              >
                See More
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

            </div>
          </div>
        </Reveal>
      ))}

    </div>
  </div>
</section>

      {/* ─── BE PART OF OUR WORK CTA ─── */}
      <section className="py-20 md:py-28 bg-[#0f1630] border-t-4 border-[#F4BD12] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase">
                Get Connected
              </span>
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Be Part of Our Work
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Whether you are an aspiring young leader, a public institution looking to host talent, or a strategic partner, there is a place for you in the EPL Ghana community.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setPage("community")}
                className="bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.22em] uppercase px-9 py-4 hover:bg-white transition-colors cursor-pointer shadow-sm"
              >
                Become a Fellow
              </button>
              <button
                onClick={() => setPage("partner")}
                className="border border-white/35 text-white font-black text-[10px] tracking-[0.22em] uppercase px-9 py-4 hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                Partner With Us
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// ─── EPLAN (Alumni Network) Page ──────────────────────────────────────────────

function EplanPage({ setPage }: { setPage: (p: Page) => void }) {
  const eplanPillars = [
    {
      number: "01",
      title: "Lifelong Professional Development",
      desc: "Continuous executive masterclasses, public policy certificates, and specialized governance workshops tailored for mid-career civil servants.",
    },
    {
      number: "02",
      title: "Alumni-to-Fellow Mentorship",
      desc: "Graduated Fellows give back by mentoring incoming cohorts, sharing practical institutional navigation tactics, and providing placement guidance.",
    },
    {
      number: "03",
      title: "Cross-Sector Working Groups",
      desc: "Alumni collaborate across health, finance, agriculture, and local government to co-author policy briefs and solve inter-agency bottlenecks.",
    },
    {
      number: "04",
      title: "Regional & Institutional Chapters",
      desc: "Decentralized alumni chapters operating across regional assemblies and key ministries in Accra, Kumasi, Tamale, and Sekondi-Takoradi.",
    },
  ];

  const highlights = [
    {
      tag: "Recent Convening",
      title: "Annual End-of-Year Fellows Gathering",
      desc: "Flagship reunion bringing alumni together in strategic dialogue on public sector innovation, peer accountability, and policy milestones.",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&auto=format",
    },
    {
      tag: "Success Story",
      title: "Pioneering Municipal Health Data Systems",
      desc: "EPLAN alumni stationed at regional health directorates modernized digital record-keeping, reducing patient wait times across 8 local clinics.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format",
    },
    {
      tag: "Policy Impact",
      title: "Cross-Ministerial Civil Service Working Group",
      desc: "Alumni across the Ministry of Finance and Ministry of Local Government published recommendations for digitized municipal revenue oversight.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&auto=format",
    },
  ];

  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* ─── HERO HEADER ─── */}
      <section className="relative min-h-[58vh] flex items-center overflow-hidden bg-[#0f1630]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#4150A3]/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                  Alumni Community
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                Emerging Public Leaders Alumni Network (EPLAN)
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                A lifelong fraternity of public service professionals advancing institutional excellence, integrity, and ethical governance across Ghana.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setPage("community")}
                  className="bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white transition-colors cursor-pointer"
                >
                  Browse Alumni Directory
                </button>
                <button
                  onClick={() => {
                    setPage("donate");
                    setTimeout(() => {
                      const el = document.getElementById("ways-to-give");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 150);
                  }}
                  className="border border-white/40 text-white font-black text-[10px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-all cursor-pointer"
                >
                  Sponsor EPLAN
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── STATS RIBBON ─── */}
      <section className="bg-[#0f1630] py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#F4BD12] mb-1">500+</div>
              <div className="text-white/70 text-xs uppercase font-bold tracking-wider">Active Alumni</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">8</div>
              <div className="text-white/70 text-xs uppercase font-bold tracking-wider">Graduated Cohorts</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#F4BD12] mb-1">85%</div>
              <div className="text-white/70 text-xs uppercase font-bold tracking-wider">Promoted / Retained</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">15+</div>
              <div className="text-white/70 text-xs uppercase font-bold tracking-wider">Public Institutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EPLAN VISION SECTION ─── */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                Our Driving Vision
              </span>
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-8">
              &ldquo;To be a network of ethical public servants committed to excellence; who act as catalysts to drive systemic change in Africa&apos;s public sector.&rdquo;
            </h2>
            <div className="w-16 h-1 bg-[#F4BD12] mx-auto mb-6" />
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Established following the inaugural cohort of the "Emerging Public Leaders Fellowship, EPLAN sustains momentum beyond graduation by uniting young leaders committed to critical thinking, ethical action, and meaningful public service reform.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── NETWORK OVERVIEW & PILLARS ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                    Beyond The Fellowship
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                  Sustaining Impact Throughout a Public Service Career
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
                  Graduation from the 12-month Fellowship is only the beginning. EPLAN provides the platform, peer accountability, and ongoing institutional support needed to turn early-career momentum into lifelong systemic change.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  From senior policy analysts in the Ministry of Finance to planners in district assemblies, EPLAN members form a critical mass of reform-minded public leaders.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div
                className="aspect-[4/3] bg-gray-100 bg-cover bg-center shadow-md border border-gray-200"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&h=675&fit=crop&auto=format)",
                }}
              />
            </Reveal>
          </div>

          {/* Pillars Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eplanPillars.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-gray-50 border border-gray-200 p-6 h-full flex flex-col justify-between hover:border-[#4150A3] transition-all">
                  <div>
                    <div className="text-[#F4BD12] font-black text-xl mb-2">
                      {p.number}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2.5">
                      {p.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EPLAN HIGHLIGHTS & SUCCESS STORIES ─── */}
      <section className="py-20 md:py-28 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                    Network Spotlight
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                  Recent Highlights &amp; Success Stories
                </h2>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm max-w-md leading-relaxed">
                Snapshots of alumni impact, regional convenings, and transformative initiatives carried out by EPLAN members across Ghana.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="bg-white border border-gray-200 overflow-hidden flex flex-col justify-between h-full hover:border-[#4150A3] hover:shadow-md transition-all group">
                  <div>
                    <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#0f1630] text-[#F4BD12] text-[9px] font-black tracking-widest uppercase px-2.5 py-1">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-gray-900 text-base leading-snug mb-2.5 group-hover:text-[#4150A3] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Sponsoring / Giving CTA */}
          <div className="mt-14 text-center">
            <button
              onClick={() => {
                setPage("donate");
                setTimeout(() => {
                  const el = document.getElementById("ways-to-give");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 150);
              }}
              className="bg-[#4150A3] text-white font-black text-[10px] tracking-[0.2em] uppercase px-9 py-4 hover:bg-[#F4BD12] hover:text-black transition-all cursor-pointer shadow-sm"
            >
              Support EPLAN
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


// ─── EPL in Maritime (EPLIM) Page ─────────────────────────────────────────────

function EplimPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[52vh] flex items-center overflow-hidden bg-[#0f1630]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#0f1630]/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                  Maritime Leadership
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                EPL in Maritime (EPLIM)
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
                Developing the next generation of ethical, capable and innovative leaders within Ghana&apos;s maritime and blue economy sectors.
              </p>
              <button
                onClick={() => setPage("partner")}
                className="bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white transition-colors cursor-pointer"
              >
                Partner on Maritime Leadership
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── INTRODUCTION ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div
                className="aspect-[4/3] bg-gray-100 bg-cover bg-center shadow-md border border-gray-200"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&h=900&fit=crop&auto=format)",
                }}
              />
            </Reveal>

            <Reveal delay={0.12}>
              <div>
                <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                  EPLIM Overview
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-7">
                  Strengthening Ghana&apos;s Maritime Future
                </h2>

                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  EPL in Maritime (EPLIM) is a leadership initiative focused on developing emerging professionals who will steward Ghana&apos;s maritime resources, port authorities, shipping lanes, and coastal development policies.
                </p>

                <p className="text-gray-500 text-sm leading-relaxed">
                  The programme creates opportunities for participants to build practical leadership skills, gain first-hand exposure to the maritime ecosystem, and connect with seasoned institutional leaders driving blue economy sustainability.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP & STRATEGY ─── */}
      <section className="py-20 md:py-28 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-0 overflow-hidden shadow-sm">
            <Reveal>
              <div className="bg-[#4150A3] p-10 lg:p-16 h-full flex flex-col justify-center">
                <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                  Capacity Building
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                  Preparing Leaders for the Maritime Frontier
                </h2>

                <p className="text-white/75 text-sm md:text-base leading-relaxed">
                  EPLIM equips participants with the analytical confidence, ethical principles, and regulatory understanding required to resolve complex supply-chain, security, and trade bottlenecks across maritime agencies.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div
                className="min-h-[360px] h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=1200&h=800&fit=crop&auto=format)",
                }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── PILLARS ─── */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                Core Focus Areas
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                Building Maritime Excellence
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <Reveal>
              <div className="bg-gray-50 border border-gray-200 p-8 h-full flex flex-col justify-between hover:border-[#4150A3] transition-all">
                <div>
                  <div className="text-[#4150A3] text-3xl font-black mb-5">
                    01
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    Leadership Development
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Instilling values-based leadership that enables emerging maritime professionals to operate with integrity, accountability, and strategic foresight.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="bg-gray-50 border border-gray-200 p-8 h-full flex flex-col justify-between hover:border-[#4150A3] transition-all">
                <div>
                  <div className="text-[#4150A3] text-3xl font-black mb-5">
                    02
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    Industry Exposure
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Direct on-site immersion across major commercial ports, logistics hubs, maritime safety authorities, and national shipping agencies.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="bg-gray-50 border border-gray-200 p-8 h-full flex flex-col justify-between hover:border-[#4150A3] transition-all">
                <div>
                  <div className="text-[#4150A3] text-3xl font-black mb-5">
                    03
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    Policy &amp; Network Growth
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Connecting young practitioners with maritime executives, environmental scientists, and public policy working groups across West Africa.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FINAL IMAGE + MESSAGE ─── */}
      <section className="py-20 md:py-28 bg-[#0f1630]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div
                className="aspect-[4/3] bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1530053969600-caed2596d242?w=1200&h=800&fit=crop&auto=format)",
                }}
              />
            </Reveal>

            <Reveal delay={0.12}>
              <div>
                <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                  Our Impact
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                  Shaping the Future of Maritime Leadership
                </h2>

                <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8">
                  EPLIM is part of EPL Ghana&apos;s broader commitment to developing leaders who can strengthen institutions, drive innovation, and contribute to national sustainable development.
                </p>

                <button
                  onClick={() => setPage("partner")}
                  className="bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-white transition-all cursor-pointer"
                >
                  Join the Initiative
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── The Fellowship Page ──────────────────────────────────────────────────────

function FellowshipPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState<"structure" | "eligibility" | "process">("structure");
  const [applyModal, setApplyModal] = useState(false);

  const structureSteps = [
    { number: "01", title: "Recruitment & Screening", desc: "Identify, assess, and welcome aspiring public service leaders committed to transforming Ghana's public sector." },
    { number: "02", title: "Orientation & Onboarding", desc: "Foundational grounding in public service values, civil service structure, ethics, and professional expectations." },
    { number: "03", title: "12-Month Work Placement", desc: "Hands-on experience assigned to key government ministries, departments, and metropolitan assemblies." },
    { number: "04", title: "Employability & Leadership Training", desc: "Deep-dive workshops building policy analysis, project management, and critical governance skills." },
    { number: "05", title: "Mentor-Mentee Engagement", desc: "Paired 1-on-1 with senior civil servants and executive leaders for continuous career guidance." },
    { number: "06", title: "Community Immersion Project", desc: "Applied civic project addressing real community needs and promoting local social accountability." },
    { number: "07", title: "Performance Management", desc: "Regular quarterly reviews ensuring accountability, professional growth, and institutional alignment." },
    { number: "08", title: "Inauguration Ceremony", desc: "Graduation celebrating Fellows' accomplishments and ushering them into the permanent Public Service Network." },
  ];

  const eligibilityCriteria = [
    "Ghanaian National with a valid National ID (Ghana Card).",
    "Must be a full-time resident in Ghana.",
    "Aged between 22 – 32 years.",
    "Possess a recognized Undergraduate Degree.",
    "Completed National Service with a valid NSS Certificate.",
    "Demonstrate innovation, problem-solving, and professional integrity.",
    "Active professional presence on LinkedIn.",
    "Committed to serving in Ghana's Public Service for at least 3 years post-fellowship.",
    "Proficient in Microsoft Office (Word, Excel, PowerPoint) and excellent English communication.",
    "Ready to produce a Police Clearance Certificate if shortlisted.",
  ];

  const requiredDocuments = [
    "Undergraduate Degree Certificate",
    "National Service Scheme (NSS) Certificate / ID",
    "Curriculum Vitae (Strictly 2 pages or less)",
    "Copy of Ghana Card",
    "Passport-sized Photograph",
  ];

  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* ─── HERO HEADER ─── */}
      <section className="relative min-h-[58vh] flex items-center overflow-hidden bg-[#0f1630]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#4150A3]/88" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                  Flagship Programme
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                The Emerging Public Leaders Fellowship
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                A thoughtfully crafted 12-month work scholarship cultivating Ghana&apos;s next generation of ethical, sector-strengthening public sector leaders.
              </p>
              <button
                onClick={() => setApplyModal(true)}
                className="bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white transition-colors cursor-pointer"
              >
                Apply for Fellowship
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── NAVIGATION TABS ─── */}
      <section className="bg-gray-50 border-b border-gray-200 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-4 sm:gap-8 py-4 overflow-x-auto no-scrollbar">
            {[
              { id: "structure", label: "Programme Structure" },
              { id: "eligibility", label: "Eligibility & Requirements" },
              { id: "process", label: "Application Process" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs font-black tracking-wider uppercase whitespace-nowrap py-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#4150A3] text-[#4150A3]"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TAB 1: PROGRAMME STRUCTURE ─── */}
      {activeTab === "structure" && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-14">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                    12-Month Journey
                  </span>
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  Flagship Programme Structure
                </h2>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  Our comprehensive model equips Fellows with hands-on institutional experience, executive mentorship, and accredited leadership training.
                </p>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {structureSteps.map((step, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="bg-gray-50 border border-gray-200 p-6 h-full flex flex-col justify-between hover:border-[#4150A3] transition-all">
                    <div>
                      <div className="text-[#F4BD12] font-black text-2xl mb-2">
                        {step.number}
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mb-2.5">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── TAB 2: ELIGIBILITY & DOCUMENTS ─── */}
      {activeTab === "eligibility" && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-[2px] bg-[#F4BD12]" />
                    <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                      Who Can Apply
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-8">
                    Eligibility Criteria
                  </h2>
                  <div className="space-y-3.5">
                    {eligibilityCriteria.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 border border-gray-100">
                        <div className="w-5 h-5 rounded-full bg-[#4150A3] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                          ✓
                        </div>
                        <p className="text-gray-700 text-xs sm:text-sm font-medium leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal delay={0.12}>
                  <div className="bg-[#0f1630] text-white p-8 border-t-4 border-[#F4BD12]">
                    <div className="text-[#F4BD12] text-[10px] font-black tracking-widest uppercase mb-2">
                      Application Checklist
                    </div>
                    <h3 className="text-2xl font-black text-white mb-6">
                      Required Documents
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed mb-6">
                      Ensure you have scanned digital copies of the following documents ready prior to initiating your online application:
                    </p>
                    <ul className="space-y-3 text-xs sm:text-sm font-medium mb-8">
                      {requiredDocuments.map((doc, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/90">
                          <span className="w-2 h-2 bg-[#F4BD12] rounded-full" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setApplyModal(true)}
                      className="w-full bg-[#F4BD12] text-black font-black text-[10px] tracking-widest uppercase py-3.5 hover:bg-white transition-colors cursor-pointer text-center"
                    >
                      Start Application
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── TAB 3: APPLICATION PROCESS ─── */}
      {activeTab === "process" && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Reveal>
              <div className="text-center mb-14">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                    Selection Pipeline
                  </span>
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  How Selection Works
                </h2>
              </div>
            </Reveal>

            <div className="space-y-6">
              {[
                { step: "01", title: "Online Application Form", desc: "Submit essay responses, academic transcripts, NSS verification, and professional references." },
                { step: "02", title: "Initial Merit Screening", desc: "Independent selection committee evaluates applications based on academic record, leadership potential, and public service interest." },
                { step: "03", title: "Assessment Center", desc: "Shortlisted candidates participate in collaborative group exercises, policy case studies, and aptitude evaluations." },
                { step: "04", title: "Final Panel Interview", desc: "Individual interview with senior civil service heads, government advisors, and EPL leadership." },
                { step: "05", title: "Offer & Onboarding", desc: "Successful candidates receive formal fellowship offers and commence orientation in Accra." },
              ].map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex gap-6 items-start bg-gray-50 p-6 border-l-4 border-[#4150A3] border-gray-200">
                    <div className="text-[#4150A3] font-black text-2xl tracking-tight">
                      {p.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">
                        {p.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setApplyModal(true)}
                className="bg-[#4150A3] text-white font-black text-[10px] tracking-[0.2em] uppercase px-9 py-4 hover:bg-[#F4BD12] hover:text-black transition-all cursor-pointer shadow-sm"
              >
                Apply for Fellowship Now
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ─── INLINE APPLICATION MODAL (No redirection error!) ─── */}
      {applyModal && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setApplyModal(false)}
        >
          <div
            className="bg-white max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#4150A3] p-6 text-white relative">
              <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-1">
                Emerging Public Leaders Fellowship
              </div>
              <h3 className="text-2xl font-black text-white leading-tight">
                Fellowship Application Portal
              </h3>
              <button
                onClick={() => setApplyModal(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/30 p-1.5 rounded-full transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Your Fellowship Application has been received. Our team will review your submission.");
                  setApplyModal(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] font-black tracking-wider uppercase text-gray-500 block mb-1">Full Name</label>
                  <input type="text" required placeholder="e.g. Kwame Mensah" className="w-full border border-gray-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#4150A3]" />
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-wider uppercase text-gray-500 block mb-1">Email Address</label>
                  <input type="email" required placeholder="you@domain.com" className="w-full border border-gray-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#4150A3]" />
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-wider uppercase text-gray-500 block mb-1">Phone Number (WhatsApp)</label>
                  <input type="tel" required placeholder="+233 ..." className="w-full border border-gray-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#4150A3]" />
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-wider uppercase text-gray-500 block mb-1">University / Undergraduate Degree</label>
                  <input type="text" required placeholder="e.g. University of Ghana, B.A. Political Science" className="w-full border border-gray-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#4150A3]" />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.2em] uppercase py-3.5 hover:bg-[#4150A3] hover:text-white transition-all cursor-pointer text-center"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplyModal(false)}
                    className="border border-gray-300 px-4 py-3.5 text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Women on the Rise Page ───────────────────────────────────────────────────

function WotrPage({ setPage }: { setPage: (p: Page) => void }) {
  const wotrStats = [
    { value: "80+", label: "Gender Desk Officers Trained" },
    { value: "7,000+", label: "Students Reached in Leadership Tours" },
    { value: "1,000+", label: "Participants in Equity Walks" },
    { value: "23", label: "Ministries with Mentorship Systems" },
    { value: "13", label: "Policy Briefs & Studies Published" },
    { value: "150+", label: "Stakeholders in RiWoCo Conferences" },
  ];

  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[58vh] flex items-center overflow-hidden bg-[#0f1630]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1573497019236-d22bce4b7c9f?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#4150A3]/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                  Gender Equity &amp; Inclusion
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                Women on the Rise 
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                Dismantling institutional barriers and empowering women leaders across Ghana&apos;s Civil Service.
              </p>
              <button
                onClick={() => setPage("partner")}
                className="bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white transition-colors cursor-pointer"
              >
                Partner on Gender Initiatives
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Impact Numbers Bar */}
      <section className="bg-[#0f1630] py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {wotrStats.map((s, i) => (
              <div key={i} className="p-3">
                <div className="text-2xl sm:text-3xl font-black text-[#F4BD12] mb-1">
                  {s.value}
                </div>
                <div className="text-white/70 text-[10px] font-bold tracking-wider uppercase leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview & Key Pillars */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                    Institutional Transformation
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                  Strengthening Gender Responsiveness in Public Service
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
                  Launched in 2024 with support from <strong>Co-Impact</strong> in partnership with the <strong>Office of the Head of Civil Service (OHCS)</strong>, Women on the Rise is a systemic reform initiative.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Through executive coaching, institutional gender mainstreaming SOPs, and cross-ministerial mentorship networks, Women on the Rise prepares women public servants to lead, influence policy, and occupy decision-making roles.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div
                className="aspect-[4/3] bg-gray-100 bg-cover bg-center shadow-md border border-gray-200"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1573497019236-d22bce4b7c9f?w=900&h=675&fit=crop&auto=format)",
                }}
              />
            </Reveal>
          </div>

          {/* Pillars */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "National Gender Diversity Taskforce",
                desc: "Inaugurated in October 2024 and chaired by the Head of Civil Service with representation from MoGCSP, MoF, MoH, and MoE to advocate for gender-inclusive civil service policies.",
              },
              {
                title: "Rise Women Conference (RiWoCo)",
                desc: "Annual strategic convening bringing together civil service heads, civil society, academia, and development partners for gender-inclusive policy dialogue.",
              },
              {
                title: "Youth Leadership & Empowerment Tour",
                desc: "Supported by Ghana Education Service to reach 7,000+ secondary students, encouraging girls and students with disabilities to champion equity.",
              },
            ].map((pillar, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-gray-50 border border-gray-200 p-8 h-full flex flex-col justify-between hover:border-[#4150A3] transition-all">
                  <div>
                    <div className="text-[#F4BD12] font-black text-xs tracking-widest uppercase mb-2">
                      Pillar 0{i + 1}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── P.E.A.C.E. Page ─────────────────────────────────────────────────────────

function PeacePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[58vh] flex items-center overflow-hidden bg-[#0f1630]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#0f1630]/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                  Civic Security &amp; Peacebuilding
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                P.E.A.C.E. Fellowship Project
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                <strong>Professionals Engaged Against Conflict &amp; Endangerment</strong> — equipping security services and local government leaders in Northern Ghana for lasting peace.
              </p>
              <button
                onClick={() => setPage("partner")}
                className="bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white transition-colors cursor-pointer"
              >
                Partner on P.E.A.C.E
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Program Details & Grant Partnership */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                    Supported by the U.S. Embassy in Ghana
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                  Strengthening Civilian-Security Relations in At-Risk Communities
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
                  The P.E.A.C.E Fellows Project is a 12-month initiative that engages and trains <strong>100 public sector and security professionals</strong> via online symposiums in early warning, conflict de-escalation, and situational leadership.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  From the broader cohort, <strong>25 high-performing entry-level professionals</strong> (at least 50% women) working in the Ministry of Defense, Ministry of Interior, Ministry of Local Government, and border agencies are selected for practical in-person human security training.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.12}>
                <div className="bg-[#0f1630] text-white p-8 border-t-4 border-[#F4BD12]">
                  <div className="text-[#F4BD12] text-[10px] font-black tracking-widest uppercase mb-2">
                    Model Highlights
                  </div>
                  <h3 className="text-2xl font-black text-white mb-6">
                    Each-One-To-Reach-Five
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed mb-6">
                    To scale reach across municipalities in Northern Ghana, P.E.A.C.E Fellows adopt a cascading peer-training technique where each trained professional mentors five additional local community leaders.
                  </p>
                  <div className="p-4 bg-white/10 border border-white/15 text-xs text-white/90 space-y-2">
                    <div className="font-bold text-[#F4BD12]">Key Target Agencies:</div>
                    <div>• Ministry of Interior &amp; Local Defense</div>
                    <div>• Border Security &amp; Immigration Agencies</div>
                    <div>• Municipal Assembly Peace Committees</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Testimonials Data ────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    quote:
      "The EPL Fellows assigned to our directorate brought a level of technical rigor and proactivity that dramatically expedited our quarterly fiscal policy reviews.",
    name: "Dr. K. Boateng",
    role: "Director of Budget & Economic Planning",
    institution: "Ministry of Finance",
    category: "Supervisors",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 2,
    quote:
      "Mentoring these emerging public servants has been inspiring. They are grounded in ethics, committed to institutional reform, and eager to serve the public good.",
    name: "Prof. Naa Adjei-Mensah",
    role: "Senior Governance Advisor & Fellow Mentor",
    institution: "Civil Service Training Institute",
    category: "Mentors",
    image:
      "https://images.unsplash.com/photo-1573497019236-d22bce4b7c9f?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 3,
    quote:
      "Partnering with EPL has enabled our assembly to build sustainable local health data systems. The calibre of talent and commitment is second to none.",
    name: "Hon. Alfred Tagoe",
    role: "Municipal Chief Executive",
    institution: "Accra Metropolitan Assembly",
    category: "Partnered Institutions",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 4,
    quote:
      "EPL Fellows demonstrate exemplary work ethic and public integrity. They consistently go beyond routine duties to solve complex administrative bottlenecks.",
    name: "Eunice Sarpong",
    role: "Head of Human Resource Development",
    institution: "Ghana Health Service",
    category: "Supervisors",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 5,
    quote:
      "Our institutional collaboration with EPL continues to yield measurable results in environmental governance and community sensitization across coastal regions.",
    name: "Dr. Mensah Osei",
    role: "Country Programme Director",
    institution: "UNDP Ghana",
    category: "Partnered Institutions",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format",
  },
  {
    id: 6,
    quote:
      "Guiding young leaders through real-world civil service challenges has shown me that Ghana's public sector future is in capable, principled hands.",
    name: "Kwesi Appiah-Danquah",
    role: "Executive Coach & Public Policy Mentor",
    institution: "EPL Mentorship Network",
    category: "Mentors",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&auto=format",
  },
];

// ─── Impact Page ──────────────────────────────────────────────────────────────

function ImpactPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState<string>("All");

  const impactStats = [
    {
      Icon: Users,
      value: 500,
      suffix: "+",
      label: "Fellows Developed",
      description:
        "Young public servants trained and placed in institutions across Ghana",
    },
    {
      Icon: Building2,
      value: 12,
      suffix: "+",
      label: "Public Institutions",
      description:
        "Government ministries, agencies and metropolitan assemblies engaged",
    },
    {
      Icon: Award,
      value: 8,
      suffix: "",
      label: "Cohorts Completed",
      description:
        "Successive cycles of leadership development since inception",
    },
    {
      Icon: TrendingUp,
      value: 85,
      suffix: "%",
      label: "Career Advancement",
      description:
        "Fellows who report meaningful career growth post-fellowship",
    },
  ];

  const testimonialCategories = [
    "All",
    "Supervisors",
    "Mentors",
    "Partnered Institutions",
  ];

  const filteredTestimonials =
    activeTab === "All"
      ? testimonials
      : testimonials.filter((t) => t.category === activeTab);

  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* ─── HERO HEADER ─── */}
      <section className="relative min-h-[52vh] flex items-center overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4150A3]/95 to-[#4150A3]/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-28">
          <Reveal>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                Our Impact
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Our Impact
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/75 text-lg md:text-xl max-w-xl leading-relaxed">
              See how leadership development contributes to stronger people,
              stronger institutions and meaningful public service.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 1: STATS OVERVIEW ─── */}
      <section id="impact-overview" className="py-20 md:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-14">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                Impact at a Glance
              </span>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {impactStats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <div className="border-t-2 border-[#F4BD12] pt-7">
                  <stat.Icon
                    size={26}
                    className="text-[#4150A3] mb-5"
                  />
                  <div className="text-5xl font-black text-gray-900 leading-none mb-3">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="font-black text-gray-900 mb-2 text-lg">
                    {stat.label}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: SUCCESS STORIES (FELLOW SPOTLIGHTS) ─── */}
      <section id="impact-stories" className="py-20 md:py-28 bg-gray-50 border-t border-gray-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                Success Stories
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">
              Real People. Real Impact.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {fellows.slice(0, 3).map((fellow, i) => (
              <Reveal key={fellow.id} delay={i * 0.09}>
                <div className="bg-white border border-gray-200 group cursor-pointer hover:shadow-md hover:border-[#4150A3]/40 transition-all">
                  <div
                    className="aspect-video bg-cover bg-center overflow-hidden bg-gray-200"
                    style={{
                      backgroundImage: `url(${fellow.image})`,
                    }}
                  />
                  <div className="p-7">
                    <div className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase mb-2">
                      {fellow.cohort}
                    </div>
                    <h4 className="font-black text-gray-900 text-lg mb-1 group-hover:text-[#4150A3] transition-colors">
                      {fellow.name}
                    </h4>
                    <div className="text-gray-400 text-sm mb-4">
                      {fellow.institution}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {fellow.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: COMMUNITY STORIES (4 COMMUNITIES + SEE MORE) ─── */}
      <section id="community-stories" className="py-20 md:py-28 bg-white border-t border-gray-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                    Grassroots Stories
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                  Community Stories &amp; Interventions
                </h2>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm max-w-md leading-relaxed">
                Highlights from municipal assemblies where Fellows turned national public policies into localized community impact.
              </p>
            </div>
          </Reveal>

          {/* 4 Featured Communities */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 1,
                name: "Kpone Katamanso",
                region: "Greater Accra Region",
                focus: "Water Sanitation & Waste Audits",
                desc: "Audited local drain networks and eliminated unauthorized dumpsites with assembly heads.",
                image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop&auto=format",
              },
              {
                id: 2,
                name: "Asokore Mampong",
                region: "Ashanti Region",
                focus: "Primary Health Clinic Logistics",
                desc: "Modernized patient registration workflows to cut health record wait times by 40%.",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop&auto=format",
              },
              {
                id: 3,
                name: "Tamale Metropolis",
                region: "Northern Region",
                focus: "Smallholder Farmer Market Access",
                desc: "Connected 1,200+ grain and shea producers with extension officers and trade desks.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=500&fit=crop&auto=format",
              },
              {
                id: 4,
                name: "Cape Coast",
                region: "Central Region",
                focus: "Basic Education Literacy Tracking",
                desc: "Instituted classroom resource distribution tracking across 18 public primary schools.",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop&auto=format",
              },
            ].map((comm, i) => (
              <Reveal key={comm.id} delay={i * 0.07}>
                <div className="bg-gray-50 border border-gray-200 overflow-hidden flex flex-col justify-between h-full hover:border-[#4150A3] hover:shadow-md transition-all group">
                  <div>
                    <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${comm.image})` }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#0f1630] text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1">
                          0{i + 1}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1 text-[#4150A3] text-[10px] font-bold uppercase mb-1">
                        <MapPin size={11} className="text-[#F4BD12]" />
                        <span>{comm.region}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-base mb-1.5 group-hover:text-[#4150A3] transition-colors">
                        {comm.name}
                      </h4>
                      <div className="text-[10px] font-bold text-amber-700 bg-amber-100 inline-block px-2 py-0.5 mb-2.5 uppercase">
                        {comm.focus}
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {comm.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* See More Button leading to dedicated communities page */}
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                setPage("communities");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 px-8 py-3.5 border-2 border-[#4150A3] text-[#4150A3] text-xs font-black tracking-widest uppercase hover:bg-[#4150A3] hover:text-white transition-all cursor-pointer shadow-xs"
            >
              <span>See More Communities</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: TESTIMONIALS ─── */}
      <section
        id="testimonials"
        className="py-20 md:py-28 bg-gray-50 border-t border-gray-200 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                  Institutional Voices
                </span>
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                What Our Partners &amp; Mentors Say
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Perspectives from the supervisors, leadership mentors, and public institutions collaborating with EPL Fellows.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
              {testimonialCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-2 text-xs font-bold tracking-wide uppercase transition-colors border cursor-pointer ${
                    activeTab === cat
                      ? "bg-[#4150A3] text-white border-[#4150A3] shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <div className="bg-white border border-gray-200 p-8 flex flex-col justify-between h-full shadow-xs hover:border-[#4150A3]/50 hover:shadow-md transition-all">
                  <div>
                    <div className="text-[#F4BD12] text-3xl font-serif leading-none mb-4">
                      “
                    </div>
                    <blockquote className="text-gray-700 text-sm md:text-base leading-relaxed italic mb-8">
                      {item.quote}
                    </blockquote>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200 flex-shrink-0"
                    />
                    <div>
                      <div className="font-black text-gray-900 text-sm leading-snug">
                        {item.name}
                      </div>
                      <div className="text-[#4150A3] text-xs font-bold mt-0.5 leading-snug">
                        {item.role}
                      </div>
                      <div className="text-gray-400 text-[11px] mt-0.5">
                        {item.institution}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: ANNUAL REPORTS & RESEARCH ─── */}
      <section id="impact-reports" className="py-20 md:py-28 bg-white border-t border-gray-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                  Reports &amp; Publications
                </span>
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Knowledge, Accountability &amp; Research
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Access our official governance reports, policy whitepapers, and applied research on public sector leadership in Ghana.
              </p>
            </div>
          </Reveal>

          {/* 1. Annual Reports */}
          <div className="mb-16">
            <Reveal delay={0.06}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-[2px] bg-[#4150A3]" />
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                  Annual Accountability Reports
                </h3>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { year: "2025", title: "2025 Annual Impact Report", desc: "Scaling Public Sector Transformation Across 12 Institutions" },
                { year: "2024", title: "2024 Annual Impact Report", desc: "Gender Inclusion & Leadership Development Milestones" },
                { year: "2023", title: "2023 Annual Impact Report", desc: "Cohort Expansion & Decentralized Assembly Placements" },
                { year: "2022", title: "2022 Annual Impact Report", desc: "Foundational Outcomes & Fellow Career Retention" },
              ].map((report, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col justify-between h-full hover:border-[#4150A3] hover:bg-white hover:shadow-md transition-all group">
                    <div>
                      <div className="text-[#F4BD12] text-xs font-black tracking-widest uppercase mb-1">
                        {report.year} Edition
                      </div>
                      <h4 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-[#4150A3] transition-colors">
                        {report.title}
                      </h4>
                      <p className="text-gray-500 text-xs leading-relaxed mb-6">
                        {report.desc}
                      </p>
                    </div>
                    <button className="flex items-center justify-between text-[#4150A3] text-xs font-bold pt-3 border-t border-gray-200/80 cursor-pointer">
                      <span>Download PDF</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* 2. Research & Policy Publications */}
          <div>
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-[2px] bg-[#F4BD12]" />
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                  Research Studies &amp; Policy Briefs
                </h3>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  tag: "Policy Paper",
                  title: "Ethical Leadership & Institutional Integrity in Ghana's Civil Service",
                  author: "EPL Research Desk · 2026",
                  desc: "A qualitative and quantitative assessment on how early-career public servant placement transforms compliance and work ethic.",
                },
                {
                  tag: "Gender Study",
                  title: "Women on the Rise: Barriers to Senior Administrative Roles in Public Sector",
                  author: "In Partnership with Co-Impact · 2025",
                  desc: "Investigating organizational policies and mentorship gaps affecting female career progression across 8 key ministries.",
                },
                {
                  tag: "Field Framework",
                  title: "Local Government Decentralization & Public Service Delivery in Greater Accra",
                  author: "EPL Policy Fellows Working Group · 2024",
                  desc: "Actionable frameworks for municipal assemblies on digital revenue collection, sanitation audits, and citizen engagement.",
                },
              ].map((pub, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="bg-gray-50 border border-gray-200 p-7 flex flex-col justify-between h-full hover:border-[#4150A3] hover:bg-white hover:shadow-md transition-all group">
                    <div>
                      <span className="inline-block bg-[#4150A3]/10 text-[#4150A3] text-[9px] font-black tracking-widest uppercase px-2.5 py-1 mb-3">
                        {pub.tag}
                      </span>
                      <h4 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-[#4150A3] transition-colors">
                        {pub.title}
                      </h4>
                      <div className="text-[11px] text-gray-400 font-medium mb-3">
                        {pub.author}
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-6">
                        {pub.desc}
                      </p>
                    </div>
                    <button className="flex items-center gap-2 text-[#4150A3] text-xs font-black tracking-wider uppercase pt-4 border-t border-gray-200 cursor-pointer">
                      <span>Read Publication</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


// ─── Community Page ───────────────────────────────────────────────────────────

function CommunityPage({
  setPage,
}: {
  setPage?: (p: Page) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterCohort, setFilterCohort] = useState("Current Cohort");
  const [filterSector, setFilterSector] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedFellow, setSelectedFellow] = useState<
    (typeof fellows)[0] | null
  >(null);

  const cohortTabs = [
    { label: "Current Cohort", value: "Current Cohort" },
    { label: "C7", value: "Cohort 7" },
    { label: "C6", value: "Cohort 6" },
    { label: "C5", value: "Cohort 5" },
    { label: "C4", value: "Cohort 4" },
    { label: "C3", value: "Cohort 3" },
    { label: "C2", value: "Cohort 2" },
    { label: "C1", value: "Cohort 1" },
  ];

  const sectors = [
    "All",
    "Public Finance",
    "Health",
    "Local Government",
    "Agriculture",
    "Education",
    "Infrastructure",
    "Social Development",
    "Environment",
  ];

  const filtered = fellows.filter((f) => {
    const nameMatch = (f.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const institutionMatch = (f.institution || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSearch = nameMatch || institutionMatch;

    const matchesCohort =
      filterCohort === "All" || filterCohort === "Current Cohort"
        ? true
        : f.cohort === filterCohort;

    const matchesSector =
      filterSector === "All" || f.sector === filterSector;

    return matchesSearch && matchesCohort && matchesSector;
  });

  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-[#0f1630]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#4150A3] opacity-85" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-18 md:py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                The EPL Ghana Community
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
              Current Cohort &amp; Network
            </h1>
            <p className="text-white/80 text-base md:text-lg font-normal leading-relaxed mb-8">
              Discover our active Fellows currently driving public administration across ministries and learn about our 500+ strong alumni body (EPLAN).
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/20">
              <div>
                <div className="text-3xl md:text-4xl font-black text-white">8</div>
                <div className="text-[10px] md:text-xs font-bold text-white/60 tracking-[0.15em] uppercase mt-1">
                  Cohorts
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-white">500+</div>
                <div className="text-[10px] md:text-xs font-bold text-white/60 tracking-[0.15em] uppercase mt-1">
                  Fellows
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-white">12+</div>
                <div className="text-[10px] md:text-xs font-bold text-white/60 tracking-[0.15em] uppercase mt-1">
                  Institutions
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 1. CURRENT FELLOWS DIRECTORY & SEARCH ─── */}
      <section id="community-directory" className="py-14 md:py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-100">
            {cohortTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setFilterCohort(tab.value);
                  setVisibleCount(6);
                }}
                className={`px-3.5 py-1.5 text-xs font-bold tracking-wide whitespace-nowrap transition-colors border cursor-pointer ${
                  filterCohort === tab.value
                    ? "bg-[#4150A3] text-white border-[#4150A3]"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Find a fellow
            </span>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by name, role, or institution..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(6);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#4150A3] transition-colors"
                />
              </div>
              <div className="relative">
                <Filter
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <select
                  value={filterSector}
                  onChange={(e) => {
                    setFilterSector(e.target.value);
                    setVisibleCount(6);
                  }}
                  className="w-full sm:w-auto pl-8 pr-8 py-2.5 border border-gray-200 text-xs font-medium text-gray-700 bg-white focus:outline-none focus:border-[#4150A3] cursor-pointer"
                >
                  {sectors.map((s) => (
                    <option key={s} value={s}>
                      {s === "All" ? "Filter by Sector" : s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filtered.slice(0, visibleCount).map((fellow) => (
              <div
                key={fellow.id}
                className="group cursor-pointer bg-gray-50 border border-gray-100 p-2 hover:border-[#4150A3] hover:shadow-md transition-all duration-200"
                onClick={() => setSelectedFellow(fellow)}
              >
                <div className="relative overflow-hidden aspect-square bg-gray-200 mb-2.5">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${fellow.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4150A3] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="text-[#F4BD12] text-[9px] font-bold truncate">
                      {fellow.cohort}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-gray-900 group-hover:text-[#4150A3] text-xs md:text-sm truncate transition-colors">
                  {fellow.name}
                </div>
                <div className="text-[#4150A3] text-[10px] font-semibold truncate mt-0.5">
                  {fellow.role}
                </div>
                <div className="text-gray-400 text-[10px] truncate mt-0.5">
                  {fellow.institution}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Users
                size={32}
                className="mx-auto mb-2 opacity-40"
              />
              <p className="text-sm font-medium">
                No fellows found matching your criteria.
              </p>
            </div>
          )}

          {filtered.length > visibleCount && (
            <div className="mt-10 text-center">
              <button
                onClick={() =>
                  setVisibleCount((prev) => prev + 6)
                }
                className="px-8 py-3 border-2 border-[#4150A3] text-[#4150A3] text-xs font-black tracking-widest uppercase hover:bg-[#4150A3] hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
              >
                See More ({filtered.length - visibleCount} Remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── 2. EPLAN ALUMNI NETWORK INTEGRATION ─── */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#0f1630] text-white p-8 md:p-14 relative overflow-hidden shadow-xl border-t-4 border-[#F4BD12]">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#F4BD12] text-[10px] font-black tracking-widest uppercase">
                    Lifelong Leadership
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                  Emerging Public Leaders Alumni Network (EPLAN)
                </h2>
                <p className="text-white/75 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                  Graduation from the fellowship marks the transition into EPLAN, a lifelong community of 500+ public sector reformers collaborating across ministries to co-author policy, mentor incoming cohorts, and champion good governance.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15 max-w-lg">
                  <div>
                    <div className="text-2xl font-black text-[#F4BD12]">500+</div>
                    <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">8</div>
                    <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Cohorts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#F4BD12]">85%</div>
                    <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Retained</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  onClick={() => setPage && setPage("eplan")}
                  className="w-full bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.2em] uppercase py-4 px-6 hover:bg-white transition-all cursor-pointer text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Explore EPLAN Hub</span>
                  <ArrowRight size={14} />
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. GET INVOLVED / DONATE ─── */}
      <section id="community-get-involved" className="bg-white text-gray-900 py-20 px-4 sm:px-6 border-t border-gray-100 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-9 h-[2px] bg-[#F4BD12]" />
            <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
              Get Involved
            </span>
            <div className="w-9 h-[2px] bg-[#F4BD12]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Join Us in Building Change Agents
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-9">
            We invite you to join us; to support our efforts by donating, or collaborating on exciting projects building change agents in our communities and countries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setPage && setPage("donate")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4150A3] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#F4BD12] hover:text-black transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Make a Donation</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setPage && setPage("partner")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-[#4150A3] text-[#4150A3] font-bold text-xs uppercase tracking-widest hover:bg-[#4150A3] hover:text-white transition-all duration-200 cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* ─── FELLOW DETAIL MODAL ─── */}
      {selectedFellow && (
        <div
          className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4"
          onClick={() => setSelectedFellow(null)}
        >
          <div
            className="bg-white max-w-md w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="aspect-video bg-cover bg-center bg-gray-200"
              style={{
                backgroundImage: `url(${selectedFellow.image})`,
              }}
            />
            <div className="p-8">
              <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-3">
                {selectedFellow.cohort}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-1">
                {selectedFellow.name}
              </h3>
              <div className="text-[#4150A3] font-bold mb-1">
                {selectedFellow.role}
              </div>
              <div className="text-gray-400 text-sm mb-5 flex items-center gap-2">
                <Building2 size={13} /> {selectedFellow.institution}
              </div>
              <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                {selectedFellow.bio}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin size={13} /> {selectedFellow.location}
                </div>
                <button
                  onClick={() => setSelectedFellow(null)}
                  className="ml-auto flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <X size={13} /> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Impacted Communities Data ────────────────────────────────────────────────

const impactedCommunitiesData = [
  {
    id: 1,
    name: "Kpone Katamanso Municipal Assembly",
    region: "Greater Accra Region",
    focus: "Water Sanitation & Waste Protocol Reform",
    description:
      "Fellows collaborated with assembly directors and community chiefs to audit local drain networks, eliminate unauthorized dumpsites, and enact sustainable resource guidelines.",
    stats: "5 Districts Impacted · 14,000+ Residents",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Asokore Mampong Municipal District",
    region: "Ashanti Region",
    focus: "Primary Healthcare Clinic Resource Allocation",
    description:
      "Fellows assigned to regional health directorates modernized patient registration workflows, cutting health record wait times and ensuring maternal clinics received essential supplies.",
    stats: "8 Clinics Supported · 40% Wait Reduction",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Tamale Metropolitan District",
    region: "Northern Region",
    focus: "Agricultural Extension & Smallholder Market Access",
    description:
      "Assisting smallholder grain and shea producers to link with agricultural extension officers, access grain storage facilities, and participate in municipal trade dialogues.",
    stats: "1,200+ Farmers Engaged · 6 Farming Belts",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Cape Coast Metropolis",
    region: "Central Region",
    focus: "Basic Education Literacy & Resource Coordination",
    description:
      "Working alongside the Ghana Education Service (GES) district desk to audit educational resource shortages and institute learning progress tracking systems.",
    stats: "18 Public Primary Schools · 3,400 Pupils",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 5,
    name: "Sekondi-Takoradi Metropolitan Assembly",
    region: "Western Region",
    focus: "Municipal Revenue Digitization & Market Governance",
    description:
      "Designed and deployed digitized revenue collection frameworks for informal market stalls, enhancing assembly accountability and municipal funding for public works.",
    stats: "4 Main Market Hubs · +32% Collection Transparency",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 6,
    name: "Ho Municipal District",
    region: "Volta Region",
    focus: "Youth Civic Leadership & Civic Education",
    description:
      "Hosted community leadership clinics and democratic accountability roundtables connecting youth leaders with local assembly members and regional planners.",
    stats: "950+ Youth Leaders Trained",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 7,
    name: "Ga East (Abokobi)",
    region: "Greater Accra Region",
    focus: "Urban Planning & Public Records Digitization",
    description:
      "Digitized physical zoning and municipal land records to expedite building permit approvals and minimize boundary disputes between neighboring wards.",
    stats: "10,000+ Records Digitized",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=500&fit=crop&auto=format",
  },
];

// ─── Impacted Communities Page ────────────────────────────────────────────────

function ImpactedCommunitiesPage({
  setPage,
}: {
  setPage: (p: Page) => void;
}) {
  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative min-h-[52vh] flex items-center overflow-hidden bg-[#0f1630]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#4150A3]/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                  Grassroots Impact
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                Impacted Communities
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
                Explore the municipal districts and local communities where EPL Fellows have spearheaded policy reform, infrastructure digitization, healthcare improvements, and civic empowerment.
              </p>
              <button
                onClick={() => setPage("partner")}
                className="bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white transition-colors cursor-pointer"
              >
                Partner on a Community Project
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Grid of 7 Communities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                  7 Active Locales
                </span>
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Where Leadership Meets Public Need
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                EPL Ghana Fellows are placed directly inside local assemblies to turn high-level national policy into tangible community transformation.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactedCommunitiesData.map((comm, i) => (
              <Reveal key={comm.id} delay={i * 0.07}>
                <div className="bg-gray-50 border border-gray-200 overflow-hidden flex flex-col justify-between h-full hover:border-[#4150A3] hover:shadow-lg transition-all group">
                  <div>
                    <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${comm.image})` }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#0f1630] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 shadow-sm">
                          Community 0{i + 1}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-[#4150A3] text-[10px] font-bold uppercase mb-2">
                        <MapPin size={13} className="text-[#F4BD12]" />
                        <span>{comm.region}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg leading-snug mb-3 group-hover:text-[#4150A3] transition-colors">
                        {comm.name}
                      </h3>
                      <div className="inline-block text-[11px] font-black text-[#F4BD12] bg-[#0f1630] px-2.5 py-1 mb-4 uppercase tracking-wider">
                        {comm.focus}
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                        {comm.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs font-bold text-gray-700">
                      <span className="text-[10px] uppercase text-gray-400 font-medium">Outcome Metric</span>
                      <span className="text-[#4150A3] font-black">{comm.stats}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA Strip */}
          <div className="mt-16 text-center">
            <button
              onClick={() => setPage("donate")}
              className="bg-[#4150A3] text-white font-black text-[10px] tracking-[0.2em] uppercase px-9 py-4 hover:bg-[#F4BD12] hover:text-black transition-all cursor-pointer shadow-sm"
            >
              Support Community Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}



// ─── Donate Page ──────────────────────────────────────────────────────────────

function DonatePage({
  setPage,
}: {
  setPage: (p: Page) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    amount: "",
    date: "",
    method: "Bank Transfer",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [customAmountInput, setCustomAmountInput] = useState("");
  const [bankCurrency, setBankCurrency] = useState<"GHS" | "USD">("GHS");

  const levels = [
    {
      label: "1,000",
      desc: "Supports leadership training for one Fellow",
      isCustom: false,
    },
    {
      label: "2,000",
      desc: "Helps fund a mentorship programme",
      isCustom: false,
    },
    {
      label: "5,000",
      desc: "Contributes to research and publications",
      isCustom: false,
    },
    {
      label: "10,000",
      desc: "Supports programme delivery for a cohort",
      isCustom: false,
    },
    {
      label: "Custom",
      desc: "Give any amount to support public service leadership",
      isCustom: true,
    },
  ];

  const f = (key: string, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const currentDisplayAmount =
    activeLevel !== null
      ? levels[activeLevel].isCustom
        ? customAmountInput || "Custom Amount"
        : `GHS ${levels[activeLevel].label}`
      : "";

  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative min-h-[58vh] flex items-center overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1630]/96 via-[#0f1630]/82 to-[#4150A3]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-28">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                  Support EPL Ghana
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                Support Stronger Public Leadership
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10">
                Your contribution helps EPL develop ethical, capable public
                leaders who strengthen Ghana's institutions and serve the public
                good.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: WHY SUPPORT MATTERS ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                Why Support Matters
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-14 max-w-2xl leading-tight">
              Why Your Support Matters
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                Icon: Award,
                title: "Leadership Development",
                desc: "Funding the training, workshops and mentorship that develop Fellows' capabilities",
              },
              {
                Icon: Users,
                title: "Fellow Support",
                desc: "Enabling Fellows to focus fully on their public service placements",
              },
              {
                Icon: Globe,
                title: "Community & Networks",
                desc: "Building the peer networks and alumni connections that amplify impact",
              },
              {
                Icon: BookOpen,
                title: "Research & Knowledge",
                desc: "Generating insights that improve public service across Ghana",
              },
              {
                Icon: Building2,
                title: "Programme Delivery",
                desc: "Supporting end-to-end delivery of EPL's flagship fellowship",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="border-t-2 border-[#F4BD12] pt-7">
                  <item.Icon size={24} className="text-[#4150A3] mb-5" />
                  <h3 className="font-black text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WAYS TO GIVE (BANK TRANSFER, MOMO, CARD PAYMENT) ─── */}
      <section className="py-20 md:py-28 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                Ways to Give
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">
              Direct Channels for Giving
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Bank Transfer (Ecobank GHS & USD Dollar Accounts) */}
            <Reveal delay={0.08}>
              <div className="bg-white p-7 md:p-8 border border-gray-200 h-full flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase">
                      01 · Bank Transfer
                    </span>
                    {/* Currency Switcher */}
                    <div className="flex bg-gray-100 p-0.5 border border-gray-200">
                      <button
                        onClick={() => setBankCurrency("GHS")}
                        className={`px-2 py-0.5 text-[9px] font-black tracking-wider cursor-pointer transition-colors ${
                          bankCurrency === "GHS"
                            ? "bg-[#4150A3] text-white"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        GHS
                      </button>
                      <button
                        onClick={() => setBankCurrency("USD")}
                        className={`px-2 py-0.5 text-[9px] font-black tracking-wider cursor-pointer transition-colors ${
                          bankCurrency === "USD"
                            ? "bg-[#4150A3] text-white"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        USD ($)
                      </button>
                    </div>
                  </div>

                  <h3 className="font-black text-gray-900 text-xl mb-3">
                    Ecobank Ghana {bankCurrency === "USD" && "(USD Account)"}
                  </h3>
                  <p className="text-gray-500 mb-5 leading-relaxed text-xs sm:text-sm">
                    {bankCurrency === "GHS"
                      ? "Direct local bank transfer or domestic wire in Ghana Cedis."
                      : "Direct foreign currency transfer & international wire in US Dollars ($)."}
                  </p>

                  {bankCurrency === "GHS" ? (
                    <div className="bg-gray-50 border border-gray-200 p-4 space-y-2 text-xs font-mono text-gray-700">
                      <div>
                        <span className="text-gray-400 block font-sans text-[10px] uppercase font-bold">
                          Account Name
                        </span>
                        Emerging Public Leaders Ghana
                      </div>
                      <div>
                        <span className="text-gray-400 block font-sans text-[10px] uppercase font-bold">
                          Account Number (GHS)
                        </span>
                        <strong className="text-gray-900 font-black tracking-wider text-sm">
                          1441002345678
                        </strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-sans text-[10px] uppercase font-bold">
                          Branch
                        </span>
                        Ecobank Silver Star Tower, Accra
                      </div>
                      <div>
                        <span className="text-gray-400 block font-sans text-[10px] uppercase font-bold">
                          SWIFT / BIC
                        </span>
                        ECOCGHAC
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 p-4 space-y-2 text-xs font-mono text-gray-700">
                      <div>
                        <span className="text-gray-400 block font-sans text-[10px] uppercase font-bold">
                          Account Name
                        </span>
                        Emerging Public Leaders Ghana
                      </div>
                      <div>
                        <span className="text-gray-400 block font-sans text-[10px] uppercase font-bold">
                          USD Dollar Account No. ($)
                        </span>
                        <strong className="text-gray-900 font-black tracking-wider text-sm">
                          1441009876543
                        </strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-sans text-[10px] uppercase font-bold">
                          Bank &amp; Branch
                        </span>
                        Ecobank Ghana PLC, Head Office Accra
                      </div>
                      <div>
                        <span className="text-gray-400 block font-sans text-[10px] uppercase font-bold">
                          SWIFT / BIC
                        </span>
                        ECOCGHAC
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-[10px] text-gray-400 italic">
                  *Please use your name or pledge as the transfer reference.
                </div>
              </div>
            </Reveal>

            {/* Card 2: Mobile Money (MTN, Telecel, AT) */}
            <Reveal delay={0.14}>
              <div className="bg-white p-7 md:p-8 border border-gray-200 h-full flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                    02 · Mobile Money
                  </div>
                  <h3 className="font-black text-gray-900 text-xl mb-3">
                    MTN · Telecel · AT
                  </h3>
                  <p className="text-gray-500 mb-5 leading-relaxed text-xs sm:text-sm">
                    Fast, secure mobile wallet payments across all major Ghanaian networks.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 p-4 space-y-3 text-xs text-gray-700 font-mono">
                    <div className="border-b border-gray-200 pb-2">
                      <div className="flex items-center justify-between font-sans">
                        <span className="font-bold text-gray-900">MTN MoMo</span>
                        <span className="text-[10px] bg-[#F4BD12]/20 text-gray-800 px-1.5 py-0.5 font-black uppercase">
                          Merchant
                        </span>
                      </div>
                      <div className="text-sm font-black text-gray-900 mt-1">
                        Merchant ID: 624190
                      </div>
                      <div className="text-[10px] text-gray-500 font-sans">
                        Prompt: &quot;EPL GHANA&quot;
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-2">
                      <div className="flex items-center justify-between font-sans">
                        <span className="font-bold text-gray-900">Telecel Cash</span>
                        <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 font-black uppercase">
                          Till
                        </span>
                      </div>
                      <div className="text-sm font-black text-gray-900 mt-1">
                        Till No: 881204
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between font-sans">
                        <span className="font-bold text-gray-900">AT Money / Direct</span>
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 font-black uppercase">
                          Direct
                        </span>
                      </div>
                      <div className="text-sm font-black text-gray-900 mt-1">
                        026 555 1234
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-[10px] text-gray-400 italic">
                  *Always confirm recipient shows &quot;EPL GHANA&quot; before authorizing PIN.
                </div>
              </div>
            </Reveal>

            {/* Card 3: Online Card Payment (Replaces Endowment) */}
            <Reveal delay={0.2}>
              <div className="bg-white p-7 md:p-8 border border-gray-200 h-full flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                    03 · Online Card Payment
                  </div>
                  <h3 className="font-black text-gray-900 text-xl mb-3">
                    Debit &amp; Credit Card
                  </h3>
                  <p className="text-gray-500 mb-5 leading-relaxed text-xs sm:text-sm">
                    Instant, 256-bit encrypted checkout supporting Visa, Mastercard, GHLink &amp; International cards.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 p-4 space-y-2.5 text-xs text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-bold text-gray-900">Secure Instant Checkout</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">
                        Accepted Cards
                      </span>
                      Visa, Mastercard, GHLink, Apple Pay
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">
                        Currencies Accepted
                      </span>
                      GHS (Ghana Cedis), USD ($), GBP (£), EUR (€)
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href="#tiers"
                    className="w-full block text-center bg-[#4150A3] text-white text-[10px] font-black tracking-widest uppercase py-3 hover:bg-[#F4BD12] hover:text-black transition-all cursor-pointer shadow-xs"
                  >
                    Pay by Card
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: THE IMPACT OF YOUR SUPPORT & GIVING MODAL ─── */}
      <section id="tiers" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                Support Tiers
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              The Impact of Your Support
            </h2>
            <p className="text-gray-500 mb-12 max-w-xl text-sm md:text-base">
              Select an amount below or enter a customized gift to view payment options.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {levels.map((level, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div
                  onClick={() => {
                    setActiveLevel(i);
                    if (!level.isCustom) {
                      setForm((p) => ({
                        ...p,
                        amount: level.label.replace(",", ""),
                      }));
                    }
                  }}
                  className={`group cursor-pointer p-6 sm:p-7 transition-all border flex flex-col justify-between h-full ${
                    activeLevel === i
                      ? "bg-[#4150A3] text-white border-[#4150A3] shadow-lg scale-102"
                      : "bg-gray-50 text-gray-900 border-gray-200 hover:border-[#4150A3] hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div>
                    <div
                      className={`text-[10px] font-black tracking-widest uppercase mb-2 ${
                        activeLevel === i ? "text-[#F4BD12]" : "text-[#4150A3]"
                      }`}
                    >
                      {level.isCustom ? "ANY AMOUNT" : "USD"}
                    </div>
                    <div
                      className={`text-2xl sm:text-3xl font-black mb-2.5 ${
                        activeLevel === i
                          ? "text-white"
                          : "text-gray-900 group-hover:text-[#4150A3]"
                      }`}
                    >
                      {level.label}
                    </div>
                    <div
                      className={`text-xs leading-relaxed mb-6 ${
                        activeLevel === i ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {level.desc}
                    </div>
                  </div>

                  <div
                    className={`text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 pt-4 border-t ${
                      activeLevel === i
                        ? "text-[#F4BD12] border-white/20"
                        : "text-[#4150A3] border-gray-200"
                    }`}
                  >
                    <span>{level.isCustom ? "Custom Gift" : `Give $ ${level.label}`}</span>
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ─── PAYMENT OPTIONS POPUP MODAL ─── */}
        {activeLevel !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveLevel(null)}
          >
            <div
              className="bg-white max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#4150A3] p-6 text-white relative">
                <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-1">
                  Selected Contribution
                </div>
                <div className="text-3xl font-black text-white flex items-baseline gap-2">
                  <span>{currentDisplayAmount}</span>
                </div>
                <p className="text-white/75 text-xs mt-1">
                  {levels[activeLevel].desc}
                </p>
                <button
                  onClick={() => setActiveLevel(null)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/30 p-1.5 rounded-full transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8">
                {/* Customized Amount Field if user picked 'Custom' */}
                {levels[activeLevel].isCustom && (
                  <div className="mb-6 bg-[#4150A3]/5 border border-[#4150A3]/20 p-4">
                    <label className="text-[10px] font-black tracking-[0.2em] uppercase text-[#4150A3] block mb-2">
                      Enter Your Custom Amount (GHS / USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-sm">
                        GHS
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="e.g. 750"
                        value={customAmountInput}
                        onChange={(e) => {
                          setCustomAmountInput(e.target.value);
                          setForm((p) => ({ ...p, amount: e.target.value }));
                        }}
                        className="w-full pl-14 pr-4 py-2.5 bg-white border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#4150A3]"
                      />
                    </div>
                  </div>
                )}

                <label className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-500 block mb-3">
                  Select How You Want to Give
                </label>

                {/* Channel Selector Tabs (Card Payment, Bank Transfer, MoMo) */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[
                    {
                      key: "Card Payment",
                      label: "Card",
                      sub: "Visa / Master",
                    },
                    {
                      key: "Bank Transfer",
                      label: "Bank",
                      sub: "GHS / USD",
                    },
                    {
                      key: "Mobile Money",
                      label: "MoMo",
                      sub: "MTN / Telecel",
                    },
                  ].map((method) => (
                    <button
                      key={method.key}
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          method: method.key,
                        }))
                      }
                      className={`p-3 text-left border cursor-pointer transition-all ${
                        form.method === method.key
                          ? "border-[#4150A3] bg-[#4150A3]/5 shadow-xs"
                          : "border-gray-200 hover:border-gray-300 bg-gray-50"
                      }`}
                    >
                      <div
                        className={`text-xs font-bold ${
                          form.method === method.key
                            ? "text-[#4150A3]"
                            : "text-gray-800"
                        }`}
                      >
                        {method.label}
                      </div>
                      <div className="text-[9px] text-gray-400 mt-0.5 truncate">
                        {method.sub}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Method 1: Online Card Payment */}
                {form.method === "Card Payment" && (
                  <div className="bg-gray-50 border border-gray-200 p-4 space-y-3 mb-6">
                    <div className="text-xs text-gray-700 leading-relaxed">
                      You will be directed to our secure 256-bit encrypted checkout to complete your gift of{" "}
                      <strong>{currentDisplayAmount}</strong> using Visa, Mastercard, or Apple Pay.
                    </div>
                    <div className="p-3 bg-white border border-gray-200 text-[11px] text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Instant receipt &amp; automated tax-deductible confirmation.</span>
                    </div>
                  </div>
                )}

                {/* Method 2: Ecobank GHS & USD Details */}
                {form.method === "Bank Transfer" && (
                  <div className="bg-gray-50 border border-gray-200 p-4 space-y-3 text-xs text-gray-700 font-mono mb-6">
                    <div className="flex gap-2 font-sans border-b border-gray-200 pb-2">
                      <button
                        onClick={() => setBankCurrency("GHS")}
                        className={`text-[10px] font-bold px-2 py-1 ${
                          bankCurrency === "GHS"
                            ? "bg-[#4150A3] text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        GHS Account
                      </button>
                      <button
                        onClick={() => setBankCurrency("USD")}
                        className={`text-[10px] font-bold px-2 py-1 ${
                          bankCurrency === "USD"
                            ? "bg-[#4150A3] text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        USD Account ($)
                      </button>
                    </div>

                    <div>
                      <span className="text-gray-400 block font-sans text-[10px] uppercase font-bold">
                        Account Name
                      </span>
                      Emerging Public Leaders Ghana
                    </div>

                    <div>
                      <span className="text-gray-400 block font-sans text-[10px] uppercase font-bold">
                        {bankCurrency === "GHS" ? "Account Number (GHS)" : "USD Account Number ($)"}
                      </span>
                      <strong className="text-gray-900 font-black text-sm tracking-wider">
                        {bankCurrency === "GHS" ? "1441002345678" : "1441009876543"}
                      </strong>
                    </div>

                    <div>
                      <span className="text-gray-400 block font-sans text-[10px] uppercase font-bold">
                        Bank / SWIFT
                      </span>
                      Ecobank Ghana PLC · SWIFT: <strong>ECOCGHAC</strong>
                    </div>
                  </div>
                )}

                {/* Method 3: Mobile Money Details */}
                {form.method === "Mobile Money" && (
                  <div className="bg-gray-50 border border-gray-200 p-4 space-y-3 text-xs text-gray-700 font-mono mb-6">
                    <div className="border-b border-gray-200 pb-2">
                      <div className="flex items-center justify-between font-sans">
                        <span className="font-bold text-gray-900">MTN MoMo (Merchant)</span>
                        <span className="text-[9px] bg-[#F4BD12]/30 text-gray-900 px-1.5 py-0.5 font-bold uppercase">
                          Merchant ID
                        </span>
                      </div>
                      <div className="text-sm font-black text-gray-900 mt-0.5">624190</div>
                      <div className="text-[10px] text-gray-500 font-sans mt-0.5">
                        Confirm Name: <strong>EPL GHANA</strong>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between font-sans">
                        <span className="font-bold text-gray-900">Telecel Cash</span>
                        <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 font-bold uppercase">
                          Till
                        </span>
                      </div>
                      <div className="text-sm font-black text-gray-900 mt-0.5">881204</div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#pledge"
                    onClick={() => setActiveLevel(null)}
                    className="flex-1 bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.2em] uppercase py-3.5 px-4 hover:bg-[#4150A3] hover:text-white transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Record Pledge ({currentDisplayAmount})</span>
                    <ArrowRight size={13} />
                  </a>
                  <button
                    onClick={() => setActiveLevel(null)}
                    className="border border-gray-300 text-gray-600 font-bold text-[10px] tracking-widest uppercase py-3.5 px-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── SECTION 5: PLEDGE FORM ─── */}
      <section
        id="pledge"
        className="py-20 md:py-28 bg-gray-50 border-t border-gray-200 scroll-mt-20"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                  Pledge Form
                </span>
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Make a Pledge
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                Complete the form below and our team will follow up to facilitate receipt confirmation.
              </p>
            </div>
          </Reveal>

          {submitted ? (
            <Reveal>
              <div className="bg-white border border-gray-200 p-14 text-center shadow-sm">
                <div className="w-16 h-16 bg-[#F4BD12] flex items-center justify-center mx-auto mb-7">
                  <Heart size={28} className="text-black" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  Thank You for Your Support
                </h3>
                <p className="text-gray-500 leading-relaxed max-w-md mx-auto">
                  Your pledge has been received. Our team will be in touch within 48 hours to confirm the details and next steps.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="bg-white border border-gray-200 p-8 md:p-12 space-y-5 shadow-sm"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    {
                      label: "Full Name",
                      key: "name",
                      placeholder: "Your full name",
                      type: "text",
                    },
                    {
                      label: "Email",
                      key: "email",
                      placeholder: "your@email.com",
                      type: "email",
                    },
                    {
                      label: "Phone",
                      key: "phone",
                      placeholder: "+233 ...",
                      type: "tel",
                    },
                    {
                      label: "Country",
                      key: "country",
                      placeholder: "Ghana",
                      type: "text",
                    },
                    {
                      label: "Pledge Amount (GHS / USD)",
                      key: "amount",
                      placeholder: "e.g. 1000",
                      type: "number",
                    },
                    {
                      label: "Pledge Date",
                      key: "date",
                      placeholder: "",
                      type: "date",
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-600 block mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => f(field.key, e.target.value)}
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#4150A3] transition-colors bg-white"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-600 block mb-2">
                    Preferred Giving Channel
                  </label>
                  <select
                    value={form.method}
                    onChange={(e) => f("method", e.target.value)}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#4150A3] bg-white cursor-pointer"
                  >
                    <option>Debit / Credit Card (Online)</option>
                    <option>Bank Transfer (Ecobank GHS)</option>
                    <option>Bank Transfer (Ecobank USD $)</option>
                    <option>MTN MoMo</option>
                    <option>Telecel Cash</option>
                    <option>AT Money</option>
                    <option>Cheque / In-Person</option>
                    <option>International Wire</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#4150A3] text-white font-black text-[10px] tracking-[0.22em] uppercase py-4 hover:bg-[#F4BD12] hover:text-black transition-all cursor-pointer shadow-sm"
                >
                  Submit Pledge
                </button>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Partner Page ─────────────────────────────────────────────────────────────

function PartnerPage({
  setPage,
}: {
  setPage?: (p: Page) => void;
}) {
  const [selectedPartner, setSelectedPartner] = useState<{
    title: string;
    desc: string;
    image: string;
    ways: string[];
  } | null>(null);

  const [form, setForm] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    orgType: "Government & Public Institutions",
    interest: "Host & Place Fellows",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = [
  {
    title: "Government & Public Institutions",
    desc: "Ministries, departments, agencies, and regional assemblies building institutional capacity.",
    image:
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=1200&fit=crop&auto=format",
    ways: [
      "Host & place exceptional EPL Fellows within your directorates",
      "Co-design specialized public service leadership curriculums",
      "Partner on institutional reform and service delivery projects",
    ],
  },
  {
    title: "Development Partners",
    desc: "International agencies driving good governance, civic leadership, and systemic growth.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=1200&fit=crop&auto=format",
    ways: [
      "Co-fund regional public service leadership cohorts",
      "Collaborate on governance policy frameworks and technical research",
      "Support monitoring, evaluation, and institutional learning programs",
    ],
  },
  {
    title: "Private Sector",
    desc: "Corporate entities investing in ethical governance, workforce innovation, and youth potential.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=1200&fit=crop&auto=format",
    ways: [
      "Sponsor fellow stipends and leadership development tracks",
      "Provide executive mentorship and public-private sector cross-learning",
      "Co-host national dialogues and governance forums",
    ],
  },
  {
    title: "Foundations & Philanthropies",
    desc: "Grantmakers and philanthropists funding sustainable civic leadership across Ghana.",
    image:
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=1200&fit=crop&auto=format",
    ways: [
      "Award multi-year programmatic grants for fellowship expansion",
      "Fund women's leadership initiatives (e.g., Women on the Rise)",
      "Underwrite applied public sector research and publications",
    ],
  },
  {
    title: "Civil Society & Media",
    desc: "Community organisations advancing public accountability, equity, and civic participation.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=1200&fit=crop&auto=format",
    ways: [
      "Partner on grassroots community impact and citizen engagement initiatives",
      "Co-create ethical civic leadership and social accountability tools",
      "Facilitate direct community immersion for EPL Fellows",
    ],
  },
  {
    title: "Academic & Research Institutions",
    desc: "Universities and research bodies leading evidence-based public service improvement.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=1200&fit=crop&auto=format",
    ways: [
      "Collaborate on governance case studies and public policy papers",
      "Deliver specialized academic modules and certified masterclasses",
      "Establish graduate fellowship pipelines for high-potential talent",
    ],
  },
];
  const fi = (key: string, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      <section className="relative min-h-[58vh] flex items-center overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1573497019236-d22bce4b7c9f?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1630]/97 via-[#0f1630]/80 to-[#0f1630]/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-28">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                  Partner With EPL Ghana
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                Partner With EPL Ghana
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10">
                Together, we can strengthen the people and
                institutions shaping Ghana's public service.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href="#enquiry"
                className="inline-flex items-center gap-3 bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.22em] uppercase px-9 py-4 hover:bg-white transition-colors"
              >
                Start a Conversation <ArrowRight size={15} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── WHY PARTNER WITH US ─── */}
      <section className="py-20 md:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* ── Left Column: Value Pillars ── */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                    Strategic Collaboration
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-6">
                  Invest in the Architects of Ghana&apos;s Public Sector
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                  Public institutions only transform when the people inside them possess the tools, ethics, and vision to lead. Partnering with EPL directly places top-tier Ghanaian talent at the forefront of policy reform, digital innovation, and civic governance.
                </p>
              </Reveal>

              {/* ── Feature Cards Grid ── */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    tag: "Direct Pipeline",
                    title: "Access 500+ Reformers",
                    desc: "Engage vetted, high-performing public servants across 15+ ministries and regional assemblies.",
                  },
                  {
                    tag: "Systemic Growth",
                    title: "Institutional Impact",
                    desc: "Co-create actionable solutions that streamline service delivery and public accountability.",
                  },
                  {
                    tag: "Co-Design",
                    title: "Sector-Specific Curricula",
                    desc: "Tailor specialized training tracks that tackle exact bottlenecks in your domain.",
                  },
                  {
                    tag: "Visibility",
                    title: "National Leadership Reach",
                    desc: "Position your brand at high-level civil service convenings, policy roundtables, and annual summits.",
                  },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="bg-gray-50 border border-gray-200/80 p-5 hover:bg-white hover:border-[#4150A3] hover:shadow-md transition-all group h-full flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-black tracking-widest uppercase text-[#4150A3] bg-[#4150A3]/10 px-2 py-0.5 inline-block mb-2.5">
                          {item.tag}
                        </span>
                        <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#4150A3] transition-colors mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* ── Right Column: Visual Showcase + Floating Stat Badge ── */}
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="relative">
                  {/* Main Image */}
                  <div
                    className="aspect-[4/5] bg-gray-100 bg-cover bg-center shadow-lg border border-gray-200"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&h=1100&fit=crop&auto=format)",
                    }}
                  />

                  {/* Floating Metric Card */}
                  <div className="absolute -bottom-6 -left-6 bg-[#0f1630] text-white p-6 shadow-xl border-l-4 border-[#F4BD12] max-w-xs hidden sm:block">
                    <div className="text-3xl font-black text-[#F4BD12] mb-1">
                      85%
                    </div>
                    <div className="font-bold text-xs text-white leading-snug mb-1">
                      Career Retention Rate
                    </div>
                    <p className="text-white/60 text-[11px] leading-relaxed">
                      Fellows transition directly into permanent leadership and technical advisory roles in public service.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-50 border-t border-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <Reveal>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-[2px] bg-[#F4BD12]" />

        <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
          Partnership Ecosystem
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
        Who Can Partner With Us
      </h2>

      <p className="text-gray-500 mb-12 max-w-xl">
        Click any category to explore tailored ways we can
        work together.
      </p>
    </Reveal>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <div
            onClick={() => setSelectedPartner(cat)}
            className="group relative overflow-hidden aspect-square shadow-sm cursor-pointer border border-gray-200"
          >
            {/* BACKGROUND IMAGE */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url(${cat.image})`,
              }}
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1630] via-[#0f1630]/75 to-transparent group-hover:from-[#4150A3]/95 group-hover:via-[#0f1630]/85 transition-all duration-300" />

            {/* TEXT CONTENT */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              
              {/* FIXED NUMBER + TITLE AREA */}
              <div className="h-[90px] flex flex-col justify-end">
                
                <div className="h-[20px] flex items-end">
                  <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase">
                    0{i + 1}
                  </div>
                </div>

                <div className="h-[64px] flex items-start">
                  <h3 className="font-black text-white text-xl md:text-2xl leading-tight">
                    {cat.title}
                  </h3>
                </div>

              </div>

              {/* DESCRIPTION */}
              <p className="text-white/80 text-xs md:text-sm leading-relaxed mt-2.5 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-400 overflow-hidden">
                {cat.desc}
              </p>

              {/* LEARN MORE */}
              <div className="mt-3 h-[18px] flex items-center gap-2 text-[#F4BD12] text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn More</span>

                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>

            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>

      {selectedPartner && (
        <div
          className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4"
          onClick={() => setSelectedPartner(null)}
        >
          <div
            className="bg-white max-w-lg w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-44 bg-cover bg-center relative flex items-end p-6"
              style={{
                backgroundImage: `url(${selectedPartner.image})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1630] via-[#0f1630]/70 to-transparent" />
              <div className="relative z-10">
                <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-1">
                  Partnership Opportunity
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedPartner.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/40 p-1.5 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {selectedPartner.desc}
              </p>

              <div className="mb-8">
                <div className="text-[10px] font-black tracking-[0.2em] text-[#4150A3] uppercase mb-3">
                  Ways We Can Work Together
                </div>
                <div className="space-y-2.5">
                  {selectedPartner.ways.map((way, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#F4BD12]/20 text-[#4150A3] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">
                        ✓
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm leading-snug">
                        {way}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setSelectedPartner(null);
                    if (setPage) setPage("donate");
                  }}
                  className="flex-1 bg-[#F4BD12] text-black font-black text-[10px] tracking-[0.2em] uppercase py-3 px-4 hover:bg-[#4150A3] hover:text-white transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  Donate to EPL Ghana <ArrowRight size={13} />
                </button>
                <a
                  href="#enquiry"
                  onClick={() => setSelectedPartner(null)}
                  className="flex-1 border-2 border-[#4150A3] text-[#4150A3] font-black text-[10px] tracking-[0.2em] uppercase py-3 px-4 hover:bg-[#4150A3] hover:text-white transition-all text-center flex items-center justify-center cursor-pointer"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Our Partners &amp; Supporters
              </h2>
              <p className="text-gray-400 text-sm md:text-base">
                The organisations who make the EPL Ghana mission
                possible.
              </p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                "Government of Ghana",
                "Civil Service Authority",
                "UNDP Ghana",
                "US Embassy Accra",
                "European Union",
                "British Council",
                "GIZ Ghana",
                "UN Women Ghana",
                "World Bank Ghana",
                "Ford Foundation",
                "STAR-Ghana",
                "Mastercard Foundation",
              ].map((partner, i) => (
                <div
                  key={i}
                  className="bg-gray-50 h-20 flex items-center justify-center p-4 group hover:bg-[#4150A3] transition-colors cursor-pointer border border-gray-100"
                >
                  <span className="text-[9px] font-bold text-gray-400 group-hover:text-white text-center leading-tight transition-colors">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="enquiry"
        className="py-20 md:py-28 bg-gray-50 border-t border-gray-200"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                  Get In Touch
                </span>
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                Complete the form and our partnerships team will
                be in touch.
              </p>
            </div>
          </Reveal>

          {submitted ? (
            <Reveal>
              <div className="bg-white border border-gray-200 p-14 text-center shadow-sm">
                <div className="w-16 h-16 bg-[#F4BD12] flex items-center justify-center mx-auto mb-7">
                  <Handshake size={28} className="text-black" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  Thank You. Your Enquiry Has Been Received.
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Our partnerships team will review your enquiry
                  and respond within 3 working days.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="bg-white border border-gray-200 p-8 md:p-12 space-y-5 shadow-sm"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    {
                      label: "Name",
                      key: "name",
                      placeholder: "Your full name",
                    },
                    {
                      label: "Organisation",
                      key: "organisation",
                      placeholder: "Organisation name",
                    },
                    {
                      label: "Email",
                      key: "email",
                      placeholder: "your@organisation.com",
                    },
                    {
                      label: "Phone",
                      key: "phone",
                      placeholder: "+233 ...",
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-600 block mb-2">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={
                          form[field.key as keyof typeof form]
                        }
                        onChange={(e) =>
                          fi(field.key, e.target.value)
                        }
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#4150A3] transition-colors"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-600 block mb-2">
                    Organisation Type
                  </label>
                  <select
                    value={form.orgType}
                    onChange={(e) =>
                      fi("orgType", e.target.value)
                    }
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#4150A3] bg-white cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.title} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-600 block mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us about your interest in partnering with EPL..."
                    value={form.message}
                    onChange={(e) =>
                      fi("message", e.target.value)
                    }
                    rows={4}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#4150A3] transition-colors resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#4150A3] text-white font-black text-[10px] tracking-[0.22em] uppercase py-4 hover:bg-[#F4BD12] hover:text-black transition-all cursor-pointer shadow-sm"
                >
                  Send Enquiry
                </button>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Gallery Page ─────────────────────────────────────────────────────────────

const galleryImages = [
  {
    id: 1,
    title: "Cohort 8 Induction & Welcome Ceremony",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1000&h=700&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Public Sector Leadership Workshop",
    category: "Training",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&h=700&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Women on the Rise Networking Session",
    category: "Programmes",
    image:
      "https://images.unsplash.com/photo-1573497019236-d22bce4b7c9f?w=1000&h=700&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "Regional Assembly Field Placement",
    category: "Fellows community engagement",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&h=700&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "EPL Annual Policy Hackathon",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=1000&h=700&fit=crop&auto=format",
  },
  {
    id: 6,
    title: "Mentorship Circle & Peer Exchange",
    category: "Training",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&h=700&fit=crop&auto=format",
  },
  {
    id: 7,
    title: "Community Outreach & Sanitation Audit",
    category: "Fellows community engagment",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000&h=700&fit=crop&auto=format",
  },
  {
    id: 8,
    title: "Alumni Dinner & Recognition Night",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&h=700&fit=crop&auto=format",
  },
  {
    id: 9,
    title: "Civil Service Masterclass in Ethics",
    category: "Training",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&h=700&fit=crop&auto=format",
  },
];

function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [activeImg, setActiveImg] = useState<
    (typeof galleryImages)[0] | null
  >(null);

  const categories = [
    "All",
    "Events",
    "Training",
    "Programmes",
    "Fellows community engagement",
  ];

  const filteredImages =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-[#0f1630]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#4150A3] opacity-85" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                Media &amp; Memories
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
              Photo Gallery
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Moments from our fellowship cohorts, leadership
              training, community interventions, and annual
              gatherings across Ghana.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-bold tracking-wide uppercase transition-colors border cursor-pointer ${
                  filter === cat
                    ? "bg-[#4150A3] text-white border-[#4150A3]"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImg(item)}
                className="group relative overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer shadow-sm border border-gray-200"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[#F4BD12] text-[10px] font-black tracking-widest uppercase block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-white font-bold text-base md:text-lg leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeImg && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setActiveImg(null)}
        >
          <div
            className="bg-white max-w-3xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="aspect-video bg-cover bg-center"
              style={{
                backgroundImage: `url(${activeImg.image})`,
              }}
            />
            <div className="p-6 flex items-center justify-between">
              <div>
                <span className="text-[#4150A3] text-[10px] font-black tracking-widest uppercase block mb-1">
                  {activeImg.category}
                </span>
                <h3 className="text-xl font-black text-gray-900 leading-tight">
                  {activeImg.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveImg(null)}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2 cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-[#4150A3] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          {/* Column 1: Logo & Socials */}
          <div>
            <EPLLogo light />
            <p className="text-white/50 text-sm leading-relaxed mt-5">
              Developing ethical, critical-thinking and change-driven public
              leaders to strengthen public service institutions across Ghana.
            </p>
            <div className="flex gap-3 mt-6">
              {/* X (formerly Twitter) */}
              <a
                href="#"
                aria-label="X (Twitter)"
                className="w-8 h-8 border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#4150A3] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#4150A3] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#4150A3] transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#4150A3] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="#"
                aria-label="TikTok"
                className="w-8 h-8 border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#4150A3] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.95-4.52V8.06a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.95.51z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.22em] uppercase mb-6">
              Explore
            </div>
            <ul className="space-y-3">
              {(
                [
                  "about",
                  "projects",
                  "impact",
                  "community",
                ] as Page[]
              ).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => setPage(page)}
                    className="text-white/55 text-sm hover:text-white transition-colors capitalize cursor-pointer"
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Engage */}
          <div>
            <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.22em] uppercase mb-6">
              Engage
            </div>
            <ul className="space-y-3">
              {[
                {
                  label: "News & Insights",
                  page: "news" as Page,
                },
                {
                  label: "Get Involved",
                  page: "community" as Page,
                },
                {
                  label: "Partner With Us",
                  page: "partner" as Page,
                },
                { label: "Donate", page: "donate" as Page },
                { label: "Contact Us", page: "contact" as Page },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setPage(link.page)}
                    className="text-white/55 text-sm hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected */}
          <div>
            <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.22em] uppercase mb-6">
              Stay Connected
            </div>
            <p className="text-white/50 text-sm mb-5 leading-relaxed">
              Stay connected with EPL Ghana.
            </p>
            <p className="text-white/50 text-sm mb-5 leading-relaxed">
              Updates on programmes, Fellows and events.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-3 text-[#F4BD12] text-sm font-semibold">
                <div className="w-4 h-4 bg-[#F4BD12] flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>
                You&apos;re subscribed. Thank you!
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
                className="flex"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/50"
                />
                <button
                  type="submit"
                  className="bg-[#F4BD12] text-black text-[9px] font-black tracking-[0.18em] uppercase px-4 py-2.5 hover:bg-white transition-colors flex-shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
            <div className="flex items-center gap-2 mt-5">
              <Mail size={13} className="text-white/35" />
              <span className="text-white/40 text-xs">
                info@eplghana.org
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © 2026 Emerging Public Leaders of Ghana. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">Accra, Ghana</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Contact Us Page ──────────────────────────────────────────────────────────

function ContactPage({ setPage }: { setPage: (p: Page) => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative min-h-[48vh] flex items-center overflow-hidden bg-[#0f1630]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1573497019236-d22bce4b7c9f?w=1600&h=900&fit=crop&auto=format)",
          }}
        />
        <div className="absolute inset-0 bg-[#4150A3]/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.28em] uppercase">
                  Get In Touch
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                Contact Us
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                Have questions regarding our Fellowship, institutional partnerships, alumni network, or donations? We would love to hear from you.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Content & Form Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Contact Info Box */}
            <div className="lg:col-span-5 bg-[#0f1630] text-white p-8 md:p-10 border-t-4 border-[#F4BD12] shadow-xl">
              <div className="text-[#F4BD12] text-[10px] font-black tracking-widest uppercase mb-2">
                Reach Out Directly
              </div>
              <h3 className="text-2xl font-black text-white mb-8">
                EPL Ghana Headquarters
              </h3>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#F4BD12] flex-shrink-0 mt-1" size={18} />
                  <div>
                    <div className="font-bold text-white text-xs uppercase tracking-wider">Office Location</div>
                    <p className="text-white/70 text-xs mt-1 leading-relaxed">
                      No.1 Justice Sarkodee Addo Avenue,East Legon
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-[#F4BD12] flex-shrink-0 mt-1" size={18} />
                  <div>
                    <div className="font-bold text-white text-xs uppercase tracking-wider">Email Address</div>
                    <a
                      href="mailto:info@eplghana.org"
                      className="text-white/70 text-xs mt-1 hover:text-[#F4BD12] transition-colors block"
                    >
                      info@eplghana.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-[#F4BD12] flex-shrink-0 mt-1" size={18} />
                  <div>
                    <div className="font-bold text-white text-xs uppercase tracking-wider">Phone / WhatsApp</div>
                    <p className="text-white/70 text-xs mt-1">
                      +233 246 064 766
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/15 text-xs text-white/60 leading-relaxed">
                <div className="font-bold text-white mb-1">Working Hours:</div>
                Monday – Friday: 8:30 AM – 5:00 PM GMT
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-gray-50 border border-gray-200 p-8 md:p-12 shadow-sm">
              {submitted ? (
                <Reveal>
                  <div className="text-center py-12">
                    <div className="w-14 h-14 bg-[#F4BD12] text-black rounded-full flex items-center justify-center mx-auto mb-5 font-black text-xl">
                      ✓
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">
                      Thank You for Contacting Us
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto mb-8">
                      Your message has been successfully received. A member of the EPL Ghana team will respond to your email within 24 to 48 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="border border-gray-300 text-gray-700 font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </Reveal>
              ) : (
                <Reveal>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                      Send Us a Message
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-8">
                      Fill out the form below and our team will get back to you promptly.
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="space-y-5"
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] font-black tracking-wider uppercase text-gray-600 block mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Kwame Mensah"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-white border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-[#4150A3] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black tracking-wider uppercase text-gray-600 block mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="you@domain.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full bg-white border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-[#4150A3] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] font-black tracking-wider uppercase text-gray-600 block mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+233 ..."
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full bg-white border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-[#4150A3] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black tracking-wider uppercase text-gray-600 block mb-1.5">
                            Subject / Topic
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Fellowship Enquiry / Media"
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            className="w-full bg-white border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-[#4150A3] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black tracking-wider uppercase text-gray-600 block mb-1.5">
                          Your Message
                        </label>
                        <textarea
                          rows={5}
                          required
                          placeholder="How can we help you?"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full bg-white border border-gray-200 p-4 text-xs focus:outline-none focus:border-[#4150A3] transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#4150A3] text-white font-black text-[10px] tracking-[0.22em] uppercase py-4 hover:bg-[#F4BD12] hover:text-black transition-all cursor-pointer shadow-sm"
                      >
                        Submit Inquiry
                      </button>
                    </form>
                  </div>
                </Reveal>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("news");
  const [menuOpen, setMenuOpen] = useState(false);

  const setPage = (page: Page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <AboutPage setPage={setPage} />;
      case "projects":
        return <ProjectsPage setPage={setPage} />;
      case "impact":
        return <ImpactPage setPage={setPage} />;
      case "community":
        return <CommunityPage setPage={setPage} />;
      case "news":
        return <NewsInsightsPage setPage={setPage} />;
      case "donate":
        return <DonatePage setPage={setPage} />;
      case "gallery":
        return <GalleryPage />;
      case "partner":
        return <PartnerPage setPage={setPage} />;
      case "fellowship":
        return <FellowshipPage setPage={setPage} />;
      case "wotr":                                    
      return <WotrPage setPage={setPage} />;
      case "peace":                                   
        return <PeacePage setPage={setPage} />;
      case "eplan":
        return <EplanPage setPage={setPage} />;
      case "eplim":
        return <EplimPage setPage={setPage} />
      case "contact":
        return <ContactPage setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-['Montserrat',sans-serif]">
      <Header
        currentPage={currentPage}
        setPage={setPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <MegaMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        setPage={setPage}
      />

      <motion.main
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {renderPage()}
      </motion.main>

      <Footer setPage={setPage} />
    </div>
  );
}