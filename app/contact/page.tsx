"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const contactInfo = [
  { icon: <Mail className="w-6 h-6" />, label: "Email", value: "support@homepicksdaily.com" },
  { icon: <Phone className="w-6 h-6" />, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: <MapPin className="w-6 h-6" />, label: "Location", value: "Austin, TX, USA" },
  { icon: <Clock className="w-6 h-6" />, label: "Hours", value: "Mon–Fri, 9am–6pm EST" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <>
      <section className="bg-[#1C1C2E] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/60">
            Have a question? We&apos;d love to hear from you. Send us a message and we&apos;ll respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#1C1C2E]">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1C1C2E] outline-none transition-all focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#1C1C2E]">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1C1C2E] outline-none transition-all focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#1C1C2E]">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#1C1C2E] outline-none transition-all focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF5722] px-8 py-3 font-bold text-white transition-all hover:bg-[#FF7043]"
              >
                <Send className="w-4 h-4" />
                {sent ? "Message Sent!" : "Send Message"}
              </button>
              {sent && (
                <p className="text-sm text-[#4CAF50] font-medium">
                  Thanks for reaching out! We&apos;ll get back to you soon.
                </p>
              )}
            </form>

            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4 rounded-2xl bg-[#1C1C2E] p-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#00BCD4]/20 text-[#00BCD4]">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/60">{info.label}</p>
                    <p className="font-semibold text-white">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
