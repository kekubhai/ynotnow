"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12 md:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                YNOTNOW
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Turning startup ideas into reality through AI-powered analysis and community validation.
            </p>
            <div className="flex gap-4">
              {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                <Link key={social} href={`#${social}`} className="text-gray-500 hover:text-blue-400">
                  <span className="sr-only">{social}</span>
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="text-xs">{social[0].toUpperCase()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-200">Product</h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Testimonials", "FAQ", "Blog"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-400 hover:dark:text-blue-400">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-200">Company</h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Partners", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-400 hover:dark:text-blue-400">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-200">Subscribe</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Get the latest updates and news about YNOTNOW.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="rounded-l-none bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {currentYear} YNOTNOW. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}