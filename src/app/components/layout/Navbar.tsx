"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HangingRopeSign from "../pixel/HangingRopeSign";

/**
 * Navbar
 * Replaces the conventional static top bar with interactive, hanging pixel-art rope signs.
 *
 * Layout:
 * - Left: Player Identity Sign (Avatar, Name, LVL.67 MAGE) moved close to the left screen edge.
 * - Right: 4 individual, evenly-spaced hanging signs (About, Projects, Skills, Contact).
 * - Mobile: Responsive quest menu toggle that renders the 4 signs cleanly on smaller viewports.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";

  // Data-driven navigation items: 1 container per tab
  const navItems = [
    {
      href: "/about",
      label: "01 // ABOUT",
      isActive: pathname === "/about",
    },
    {
      href: "/projects",
      label: "02 // PROJECTS",
      isActive: pathname.startsWith("/projects"),
    },
    {
      href: "/skills",
      label: "03 // SKILLS",
      isActive: pathname === "/skills",
    },
    {
      href: "/contact",
      label: "04 // CONTACT",
      isActive: pathname === "/contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full pointer-events-none select-none">
      <div className="flex w-full items-start justify-between pl-2 pr-3 sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8">
        {/* ===================================================================
            Sign: Player Identity (Character Signboard - moved close to left)
           =================================================================== */}
        <HangingRopeSign
          variant="wood"
          ropeHeight={18}
          ropeInset={14}
          className="transition-transform active:scale-95"
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5 px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
            aria-label="Home - Popolocrois8 Character Profile"
          >
            {/* Retro Pixel Avatar Box */}
            <div className="flex h-7 w-7 items-center justify-center border-2 border-[#834227] bg-[#542813] font-pixel text-xs text-[#fffdeb] shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-colors group-hover:border-[#9f432a]">
              A
            </div>

            {/* Name & Class info */}
            <div className="flex flex-col text-left">
              <span
                className={`font-pixel text-[10px] tracking-wide transition-colors ${
                  isHome
                    ? "text-[#834227] font-bold"
                    : "text-[#3b1d0e] group-hover:text-[#9f432a]"
                }`}
              >
                Popolocrois8
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-none bg-emerald-600 animate-pulse" />
                <span className="font-pixel text-[7px] text-[#78432a]">
                  LVL.67 MAGE
                </span>
              </div>
            </div>
          </Link>
        </HangingRopeSign>

        {/* ===================================================================
            Desktop Navigation: 4 Individual, Evenly Spaced Hanging Signs
           =================================================================== */}
        <nav
          aria-label="Main Quest Navigation"
          className="hidden md:flex items-start gap-3 lg:gap-5"
        >
          {navItems.map((item) => (
            <HangingRopeSign
              key={item.href}
              variant="wood"
              ropeHeight={20}
              ropeInset={12}
            >
              <Link
                href={item.href}
                className={`group flex items-center gap-1 px-2.5 py-1 font-pixel text-[9px] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                  item.isActive
                    ? "text-[#9f432a] font-bold"
                    : "text-[#3b1d0e] hover:text-[#9f432a]"
                }`}
              >
                <span
                  className={`transition-opacity ${
                    item.isActive
                      ? "opacity-100 text-[#9f432a]"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  &gt;
                </span>
                <span>{item.label}</span>
              </Link>
            </HangingRopeSign>
          ))}
        </nav>

        {/* ===================================================================
            Mobile Navigation Toggle (Compact Hanging Sign)
           =================================================================== */}
        <div className="relative md:hidden pointer-events-auto">
          <HangingRopeSign variant="wood" ropeHeight={18} ropeInset={10}>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Quest Menu"
              className="flex items-center gap-1.5 px-2.5 py-1 font-pixel text-[9px] text-[#3b1d0e] hover:text-[#9f432a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary cursor-pointer"
            >
              <span>{mobileMenuOpen ? "✕" : "☰"}</span>
              <span>QUESTS</span>
            </button>
          </HangingRopeSign>

          {/* Mobile Collapsible Dropdown Sign */}
          {mobileMenuOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-48 z-50 pixelated shadow-xl pointer-events-auto"
              style={{
                borderStyle: "solid",
                borderWidth: "22px 10px 10px 10px",
                borderImageSource: "url(/assets/containers/board_wood.png)",
                borderImageSlice: "14 6 6 6 fill",
                borderImageRepeat: "repeat",
              }}
            >
              <nav
                aria-label="Mobile Quest Navigation"
                className="flex flex-col gap-1 p-1 text-[#3b1d0e] font-pixel text-[9px]"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#ebd5be]/50 transition-colors ${
                      item.isActive ? "text-[#9f432a] font-bold" : ""
                    }`}
                  >
                    <span>&gt;</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
