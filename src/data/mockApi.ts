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

