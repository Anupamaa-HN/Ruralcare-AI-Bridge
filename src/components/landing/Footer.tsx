import { Heart, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer id="about" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold leading-tight">Swasthya Sathi</span>
                <p className="text-xs opacity-70 font-hindi">स्वास्थ्य साथी</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              AI-powered healthcare for rural India. Bridging the gap between villages and quality medical care.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#features" className="hover:opacity-100 transition-opacity">Features</a></li>
              <li><a href="#how-it-works" className="hover:opacity-100 transition-opacity">How It Works</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">For ASHA Workers</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">API Documentation</a></li>
            </ul>
          </div>

          {/* ABDM */}
          <div className="space-y-4">
            <h4 className="font-semibold">ABDM Integration</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="https://abdm.gov.in" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                  About ABDM <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://healthid.ndhm.gov.in" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                  Create ABHA ID <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Data Security</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>support@swasthyasathi.in</li>
              <li>Toll Free: 1800-XXX-XXXX</li>
              <li className="pt-2 font-hindi">
                हमसे संपर्क करें
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-70">
            © 2026 Swasthya Sathi. Built for India's Rural Healthcare.
          </p>
          <div className="flex items-center gap-2 text-sm opacity-70">
            <span>Powered by</span>
            <span className="font-semibold">ABDM Sandbox</span>
            <span>•</span>
            <span className="font-semibold">GenAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;