"use client";

import React, { useEffect, useState } from "react";
import { fetchCertifications, CertificationData } from "@/data/mockApi";
import CertificationCard from "./CertificationCard";

export default function CertificationsSection() {
  const [certs, setCerts] = useState<CertificationData[]>([]);

  useEffect(() => {
    fetchCertifications().then(setCerts);
  }, []);

  return (
    <section id="certifications" className="py-24 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter uppercase inline-block border-b-2 border-[#81ECFF] pb-1">
            Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
