export interface HeroData {
  badge: string;
  greeting: string;
  name: string;
  roles: string[];
  description: string;
  codeSnippet: {
    filename: string;
    lines: string[];
  };
  stats: {
    value: string;
    label: string;
  }[];
  socials: {
    platform: string;
    url: string;
  }[];
}

export interface WorkHistoryData {
  id: number;
  year: string;
  role: string;
  company: string;
  description: string;
}

export async function fetchHeroData(): Promise<HeroData> {
  // Simulate network delay (300ms)
  await new Promise((r) => setTimeout(r, 300));
  
  return {
    badge: "SYSTEMS ONLINE // V4.0.2",
    greeting: "Hi Everyone",
    name: "I am Rafi",
    roles: ["Mobile Ecosystems", "Web Scalability", "IoT Neural Networks"],
    description:
      "Multi-disciplinary developer specializing in Mobile Ecosystems, Web Scalability, and IoT Neural Networks. Turning raw data into kinetic experiences.",
    codeSnippet: {
      filename: "CORE_MODULE.SH",
      lines: [
        "class Developer {",
        "  constructor() {",
        '    this.stack = ["React", "C++", "MQTT"];',
        '    this.focus = "Embedded Systems";',
        "  }",
        "",
        "  async deploy(nodes) {",
        "    return await nodes.map(n => n.sync());",
        "  }",
        "}",
      ],
    },
    stats: [
      { value: "12ms", label: "AVG LATENCY" },
      { value: "99.9%", label: "UPTIME SCORE" },
    ],
    socials: [
      { platform: "instagram", url: "https://instagram.com/" },
      { platform: "youtube", url: "https://youtube.com/" },
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
    ],
  };
}

export async function fetchWorkHistory(): Promise<WorkHistoryData[]> {
  // Simulate network delay (500ms)
  await new Promise((r) => setTimeout(r, 500));

  return [
    {
      id: 1,
      year: "2022 — PRES",
      role: "LEAD SYSTEMS DESIGNER",
      company: "NEO-TOKYO DYNAMICS",
      description:
        "Orchestrating large-scale design systems for autonomous transit interfaces. Focused on high-contrast accessibility and real-time data visualization.",
    },
    {
      id: 2,
      year: "2020 — 2022",
      role: "SENIOR UI SPECIALIST",
      company: "VOID INTERACTIVE",
      description:
        "Developed the core visual language for award-winning industrial simulations. Managed a team of 12 designers across three continents.",
    },
    {
      id: 3,
      year: "2018 — 2020",
      role: "VISUAL DESIGNER",
      company: "MONOLITH STUDIO",
      description:
        "Early-stage product design and branding for hardware-integrated software solutions.",
    },
  ];
}

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  link: string;
}

export interface CertificationData {
  id: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export async function fetchProjects(): Promise<ProjectData[]> {
  await new Promise((r) => setTimeout(r, 400));
  return [
    {
      id: 1,
      title: "NEON WALLET",
      description: "A high-performance crypto-wallet built with React Native and Rust cores.",
      image: "/projects/wallet.png",
      category: "MOBILE APP",
      tags: ["REACT NATIVE", "RUST", "WEB3.JS"],
      link: "#",
    },
    {
      id: 2,
      title: "OBSIDIAN MESH",
      description: "Full-stack industrial monitoring platform connecting 500+ ESP32 nodes.",
      image: "/projects/mesh.png",
      category: "IOT / HARDWARE",
      tags: ["MQTT", "GO", "THREE.JS"],
      link: "#",
    },
    {
      id: 3,
      title: "QUBIT ENGINE",
      description: "A distributed computing framework optimized for ARM-based edge devices.",
      image: "/projects/engine.png",
      category: "SYSTEM DEV",
      tags: ["C++20", "ARM ASSEMBLY", "DOCKER"],
      link: "#",
    },
  ];
}

export async function fetchCertifications(): Promise<CertificationData[]> {
  await new Promise((r) => setTimeout(r, 400));
  return [
    {
      id: "952-UX",
      title: "GOOGLE UX PROFESSIONAL",
      description: "Advanced methodology and user-centric systems architecture.",
    },
    {
      id: "SEC-381",
      title: "ETHICAL DESIGN LEAD",
      description: "Certification in dark-pattern prevention and cognitive accessibility.",
    },
    {
      id: "DEV-X-1",
      title: "REACT ARCHITECTURE",
      description: "Mastery of component lifecycle and performance optimization.",
    },
  ];
}

export async function fetchSkills(): Promise<SkillCategory[]> {
  await new Promise((r) => setTimeout(r, 400));
  return [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Go", "PostgreSQL", "MQTT", "C++"],
    },
    {
      category: "Tools",
      items: ["Docker", "Git", "Framer Motion", "Unity", "Figma"],
    },
  ];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

export async function login(accessKey: string, encryptionPhrase: string): Promise<LoginResponse> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 1500));

  if (accessKey === "admin" && encryptionPhrase === "password123") {
    return {
      success: true,
      message: "IDENTITY VERIFIED. ACCESS GRANTED.",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    };
  }

  return {
    success: false,
    message: "ACCESS DENIED. INVALID CREDENTIALS.",
  };
}
