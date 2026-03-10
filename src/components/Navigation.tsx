"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/about", label: "About", icon: "🔭" },
  { href: "/planets", label: "Planets", icon: "🪐" },
  { href: "/dashboard", label: "Dashboard", icon: "📡" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic-900/80 backdrop-blur-md border-b border-cosmic-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-2xl">✨</span>
            <span className="bg-gradient-to-r from-nebula-purple to-neptune-blue bg-clip-text text-transparent">
              Cosmic Explorer
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-cosmic-700 text-star-white"
                      : "text-cosmic-300 hover:text-star-white hover:bg-cosmic-800"
                  }`}
                >
                  <span className="mr-1">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
