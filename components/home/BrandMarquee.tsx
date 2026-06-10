import { Leaf, Truck, Shield, Award, RefreshCw, Users } from "lucide-react";

const items = [
  { icon: <Leaf className="w-5 h-5" />, text: "Eco Friendly" },
  { icon: <Truck className="w-5 h-5" />, text: "Fast Shipping" },
  { icon: <Shield className="w-5 h-5" />, text: "Secure Payment" },
  { icon: <Award className="w-5 h-5" />, text: "Quality Certified" },
  { icon: <RefreshCw className="w-5 h-5" />, text: "Easy Returns" },
  { icon: <Users className="w-5 h-5" />, text: "10,000+ Customers" },
];

export default function BrandMarquee() {
  return (
    <div className="overflow-hidden bg-[#F5811F] py-3">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-white">
            {item.icon}
            <span className="text-sm font-semibold">{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
