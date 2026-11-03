import React from "react";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
          Client Care
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          Nooré Concierge
        </h1>
        <p className="text-sm text-muted">
          Our styling advisors are available daily for sizing assistance, custom tailored measurements, and delivery inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-surface border border-border shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-text">WhatsApp Concierge</h3>
              <p className="text-xs text-muted">Instant response (10:00 AM – 10:00 PM BST)</p>
            </div>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Need guidance choosing between abaya sizes or coordinating a three-piece set with accessories? Our senior stylists will assist with high-resolution video consultations.
          </p>

          <a
            href="https://wa.me/8801700000000?text=Hi%20Simply%20Noor%C3%A9%2C%20I'd%20like%20to%20consult%20with%20a%20stylist."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-widest font-semibold shadow-md hover:opacity-95 transition-all"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="p-8 rounded-2xl bg-surface border border-border shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent-ink/10 text-accent-ink flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-text">Dhaka Atelier</h3>
              <p className="text-xs text-muted">By appointment only</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-muted">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent-ink" />
              <span>House 14, Road 71, Gulshan-2, Dhaka 1212, Bangladesh</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent-ink" />
              <span>+880 1700 000000</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent-ink" />
              <span>concierge@simplynoore.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
