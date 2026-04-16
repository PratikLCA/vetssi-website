import Link from "next/link";

const footerLinks = [
  { href: "/protocols", label: "Protocols" },
  { href: "/videos", label: "Videos" },
  { href: "/the-system", label: "The System" },
  { href: "/contributors", label: "Contributors" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white no-print">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-serif text-3xl font-semibold tracking-widest mb-3" style={{ letterSpacing: "0.2em" }}>
              VETSSI
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              A global resource for veterinary surgical site infection prevention.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="nav-link text-white/40 mb-4">Navigation</p>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="nav-link text-white/40 mb-4">Contact</p>
            <p className="text-sm text-white/70">
              <a href="mailto:info@vetssi.com" className="hover:text-white transition-colors">
                info@vetssi.com
              </a>
            </p>
            <p className="text-sm text-white/50 mt-4 leading-relaxed">
              VETSSI is an independent educational platform. It is not affiliated with any commercial entity.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-white/40 leading-relaxed max-w-2xl">
            This platform provides educational content for veterinary professionals. Content is not a substitute for clinical judgment. All protocols should be evaluated in the context of individual patient needs and institutional guidelines.
          </p>
          <p className="text-xs text-white/30 whitespace-nowrap">
            © {new Date().getFullYear()} VETSSI
          </p>
        </div>
      </div>
    </footer>
  );
}
