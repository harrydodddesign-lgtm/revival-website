"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Hero background images for rotation
const heroImages = [
  "/projects/hero1.jpeg",
  "/projects/hero-2.jpeg",
  "/projects/hero-3.jpeg",
  "/projects/hero4.jpeg",
  "/projects/hero-image-5.jpeg",
];

// Service data
const services = [
  {
    title: "Servicing & Repairs",
    description: "Comprehensive maintenance for classic and modern vehicles—from suspension and drivetrain work to annual services.",
    image: "/projects/brake-repair.jpeg",
  },
  {
    title: "Welding & Fabrication",
    description: "Expert rust repair and custom fabrication to restore structural integrity and extend your vehicle's life.",
    image: "/projects/sill-repair.jpeg",
  },
  {
    title: "Electrical Diagnostics",
    description: "From vintage wiring to modern systems—we diagnose and resolve all electrical issues.",
    image: "/projects/engine-bay.jpeg",
  },
  {
    title: "Restorations",
    description: "Partial or full restorations undertaken with meticulous care and respect for originality.",
    image: "/projects/full-under-car-paint.jpeg",
  },
  {
    title: "Motorsport Preparation",
    description: "Fast road, track day, and rally prep—from weekend warriors to full race builds.",
    image: "/projects/engine-work.jpeg",
  },
];

// Gallery images
const galleryImages = [
  "/projects/ball-joint.jpeg",
  "/projects/brake-repair.jpeg",
  "/projects/break-clean.jpeg",
  "/projects/repaired-under-carriage.jpeg",
  "/projects/engine-bay-2.jpeg",
  "/projects/engine-bay-3.jpeg",
  "/projects/engine-block-spray.jpeg",
  "/projects/full-under-car-paint.jpeg",
  "/projects/image14.jpeg",
  "/projects/image19.jpeg",
  "/projects/image24.jpeg",
  "/projects/image9.jpeg",
];

// Testimonials data
const testimonials = [
  {
    name: "James Hartley",
    vehicle: "1967 Jaguar E-Type",
    quote: "Revival brought my E-Type back to its former glory. Their attention to detail is remarkable—every nut and bolt was treated with care."
  },
  {
    name: "Sarah Mitchell",
    vehicle: "1973 MGB GT",
    quote: "Trustworthy, knowledgeable, and genuinely passionate about classic cars. I wouldn't take my MGB anywhere else."
  },
  {
    name: "David Thompson",
    vehicle: "1965 Triumph TR4",
    quote: "From a full engine rebuild to perfect paint matching, the team exceeded all my expectations. True craftsmen."
  }
];



export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/info@revival-motorworks.co.uk", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  // Refs for GSAP animations
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroSubtextRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutTextRef = useRef<HTMLParagraphElement>(null);
  const servicesHeadingRef = useRef<HTMLHeadingElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const galleryHeadingRef = useRef<HTMLHeadingElement>(null);
  const gallerySubtextRef = useRef<HTMLParagraphElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);
  const testimonialsHeadingRef = useRef<HTMLHeadingElement>(null);
  const testimonialsGridRef = useRef<HTMLDivElement>(null);
  const contactHeadingRef = useRef<HTMLHeadingElement>(null);

  // Auto-hiding navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        setNavVisible(false); // Scrolling down
      } else if (currentScrollY < lastScrollY - 5) {
        setNavVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Rotate hero images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations (on load)
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (heroHeadingRef.current) {
        heroTl.fromTo(
          heroHeadingRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1 }
        );
      }

      if (heroSubtextRef.current) {
        heroTl.fromTo(
          heroSubtextRef.current,
          { yPercent: 50, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        );
      }

      if (heroButtonsRef.current) {
        heroTl.fromTo(
          heroButtonsRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
          "-=0.4"
        );
      }


      // About section
      if (aboutHeadingRef.current) {
        gsap.fromTo(
          aboutHeadingRef.current,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: aboutHeadingRef.current,
              start: "top 85%",
            }
          }
        );
      }

      if (aboutTextRef.current) {
        gsap.fromTo(
          aboutTextRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: aboutTextRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Services section
      if (servicesHeadingRef.current) {
        gsap.fromTo(
          servicesHeadingRef.current,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: servicesHeadingRef.current,
              start: "top 85%",
            }
          }
        );
      }

      if (servicesGridRef.current) {
        gsap.fromTo(
          servicesGridRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: servicesGridRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Gallery section
      if (galleryHeadingRef.current) {
        gsap.fromTo(
          galleryHeadingRef.current,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: galleryHeadingRef.current,
              start: "top 85%",
            }
          }
        );
      }

      if (gallerySubtextRef.current) {
        gsap.fromTo(
          gallerySubtextRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.15,
            scrollTrigger: {
              trigger: gallerySubtextRef.current,
              start: "top 85%",
            }
          }
        );
      }

      if (galleryGridRef.current) {
        gsap.fromTo(
          galleryGridRef.current.children,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: galleryGridRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Testimonials section
      if (testimonialsHeadingRef.current) {
        gsap.fromTo(
          testimonialsHeadingRef.current,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: testimonialsHeadingRef.current,
              start: "top 85%",
            }
          }
        );
      }

      if (testimonialsGridRef.current) {
        gsap.fromTo(
          testimonialsGridRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: testimonialsGridRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Contact section
      if (contactHeadingRef.current) {
        gsap.fromTo(
          contactHeadingRef.current,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: contactHeadingRef.current,
              start: "top 85%",
            }
          }
        );
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="industrial-noise min-h-screen font-body selection:bg-[var(--burgundy)] selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navVisible ? "translate-y-0" : "-translate-y-full"
          } ${scrolled
            ? "bg-[var(--off-white)]/95 backdrop-blur-sm shadow-sm"
            : "bg-[var(--off-white)]"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative h-16 w-16 overflow-hidden">
                <Image
                  src="/logo-cropped.png"
                  alt="Revival Motorworks Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-12">
              <div className="flex items-center gap-8">
                {["Home", "Services", "Gallery"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="font-ui text-sm font-medium uppercase tracking-wider text-[var(--charcoal)] transition-colors hover:text-[var(--burgundy)]"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                className="btn-primary rounded-[8px] px-6 py-2.5 font-ui text-xs font-bold uppercase tracking-widest shadow-sm"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span
                  className={`block h-0.5 w-6 bg-[var(--charcoal)] transition-transform ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                    }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-[var(--charcoal)] transition-opacity ${mobileMenuOpen ? "opacity-0" : ""
                    }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-[var(--charcoal)] transition-transform ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`overflow-hidden transition-all duration-300 md:hidden ${mobileMenuOpen ? "max-h-80 pb-6" : "max-h-0"
              }`}
          >
            <div className="flex flex-col gap-6 pt-4">
              {["Home", "Services", "Gallery"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-ui text-sm font-medium uppercase tracking-wider text-[var(--charcoal)]"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary inline-block w-fit rounded-[8px] px-6 py-3 font-ui text-xs font-bold uppercase tracking-widest"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section
        id="home"
        className="px-4 pb-4 pt-24"
      >
        <div className="relative flex h-[calc(100vh-7rem)] items-center justify-start overflow-hidden rounded-[40px]">
          {/* Background Images with Rotation */}
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
              >
                <Image
                  src={image}
                  alt={`Classic car ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%), radial-gradient(circle at bottom right, rgba(0,0,0,0.7) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
            <div className="overflow-hidden">
              <h1
                ref={heroHeadingRef}
                className="pb-2 font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-8xl max-w-4xl"
              >
                Classic & Vintage Specialists.
              </h1>
            </div>
            <div className="overflow-hidden">
              <p
                ref={heroSubtextRef}
                className="mt-6 max-w-xl font-body text-lg text-white/90 sm:text-xl"
              >
                Expert servicing, restoration, and motorsport preparation in the heart of Surrey.
              </p>
            </div>
            <div
              ref={heroButtonsRef}
              className="mt-10 flex flex-col items-start justify-start gap-8 sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className="btn-primary inline-flex items-center rounded-[8px] px-8 py-4 font-ui text-sm font-semibold uppercase tracking-wider"
              >
                Get a Quote
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 font-ui text-sm font-semibold uppercase tracking-wider text-white transition-all hover:text-[var(--cream)]"
              >
                View Our Work
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Frosted Glass Location Box */}
          <div className="absolute bottom-8 right-8 z-20 hidden md:block">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--burgundy)] text-white shadow-lg">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-8">
                    <p className="font-heading text-base font-bold text-white">Visit our Workshop</p>
                    <span className="font-body text-[10px] uppercase tracking-widest text-white/40">Open Now</span>
                  </div>
                  <p className="mt-1 font-body text-sm text-white/70">
                    30 minutes from Goodwood Motor Circuit
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section className="relative overflow-hidden bg-[var(--off-white)] py-28">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left Column - Image */}
            <div className="relative aspect-square overflow-hidden rounded-[40px] shadow-xl">
              <Image
                src="/projects/engine-bay-2.jpeg"
                alt="Classic vehicle restoration in progress at Revival Motorworks"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Column - Content */}
            <div className="text-left">
              <div className="overflow-hidden">
                <h2
                  ref={aboutHeadingRef}
                  className="font-heading text-3xl font-bold leading-tight text-[var(--charcoal)] sm:text-4xl md:text-5xl"
                >
                  Traditional Craftsmanship,<br />Modern Expertise
                </h2>
              </div>
              <p
                ref={aboutTextRef}
                className="mt-8 font-body text-lg leading-relaxed text-[var(--grey-medium)]"
              >
                We&apos;re a dedicated mechanical workshop on the Surrey-West Sussex
                border, specialising in classic, vintage, and modern vehicle care.
                With over 10 years of experience and a genuine passion for
                automotive excellence, we combine time-honoured craftsmanship with
                cutting-edge diagnostic tools. Whether you&apos;re a classic car
                enthusiast or an everyday driver, we deliver reliable, high-quality
                solutions with meticulous attention to detail.
              </p>

              <div className="mt-10">
                <a
                  href="#services"
                  className="btn-primary inline-flex items-center rounded-[8px] px-8 py-4 font-ui text-sm font-semibold uppercase tracking-wider"
                >
                  Explore Our Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="bg-grid-industrial bg-[var(--cream-light)] py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden text-left">
            <h2
              ref={servicesHeadingRef}
              className="font-heading text-3xl font-bold text-[var(--charcoal)] sm:text-4xl md:text-5xl"
            >
              Our Services
            </h2>
          </div>

          {/* Services Grid */}
          <div ref={servicesGridRef} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card ${expandedService === index ? 'is-expanded' : ''}`}
                onClick={() => setExpandedService(expandedService === index ? null : index)}
              >
                <div
                  className="service-card-image"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="service-card-overlay" />
                <div className="service-card-title font-heading">
                  {service.title}
                </div>
                <div className="service-card-description">
                  <p className="font-body text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
                {/* Plus icon indicator - Mobile only */}
                <div className="absolute bottom-6 right-6 z-20 lg:hidden">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 ${expandedService === index ? 'rotate-45' : ''}`}>
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Estimate Notice */}
          <div className="mt-12 flex justify-center">
            <div className="rounded bg-white px-6 py-4 shadow-sm">
              <span className="font-body text-sm text-[var(--charcoal)] sm:text-base">
                Free comprehensive estimates provided before work begins
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="bg-[var(--off-white)] py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden text-left">
            <h2
              ref={galleryHeadingRef}
              className="font-heading text-3xl font-bold text-[var(--charcoal)] sm:text-4xl md:text-5xl"
            >
              Recent Projects
            </h2>
          </div>
          <p
            ref={gallerySubtextRef}
            className="mt-6 max-w-2xl text-left font-body text-lg text-[var(--grey-medium)]"
          >
            A selection of our recent work showcasing restorations, fabrication,
            engine rebuilds, and motorsport preparation.
          </p>

          {/* Gallery Grid */}
          <div ref={galleryGridRef} className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square isolate overflow-hidden rounded-[40px] shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
              >
                <Image
                  src={image}
                  alt={`Project ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* Instagram Button */}
          <div className="mt-16 text-left">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 rounded-[8px] px-8 py-4 font-ui text-sm font-semibold uppercase tracking-wider"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              View More on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[var(--charcoal)] py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden text-left">
            <h2
              ref={testimonialsHeadingRef}
              className="font-heading text-3xl font-bold text-[var(--cream-light)] sm:text-4xl md:text-5xl"
            >
              What Our Clients Say
            </h2>
          </div>

          <div ref={testimonialsGridRef} className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-[40px] border border-[var(--cream)]/10 bg-[var(--charcoal)] p-10 transition-colors hover:border-[var(--cream)]/20 shadow-xl"
              >
                <div className="flex gap-1 text-[var(--cream)]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 font-body text-base leading-relaxed text-[var(--cream-light)]/80">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-heading text-lg font-semibold text-[var(--cream-light)]">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-sm text-[var(--cream-light)]/60">
                    {testimonial.vehicle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="relative overflow-hidden bg-[var(--charcoal)] px-4 py-16">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
            {/* Left Column - Info & Social */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:block lg:space-y-12">
                <div className="text-left">
                  <div className="relative mb-8 h-32 w-64">
                    <Image
                      src="/logo-transparent.png"
                      alt="Revival Motorworks Full Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-[var(--cream-light)]">
                    Revival Motorworks
                  </h3>
                  <p className="mt-2 font-body text-base text-[var(--cream-light)]/80">
                    Over 10 Years of Automotive Excellence
                  </p>
                  <p className="mt-1 font-body text-sm text-[var(--cream-light)]/60">
                    Surrey & West Sussex
                  </p>

                  <div className="mt-6 flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--cream-light)]/10 text-[var(--cream-light)] transition-all hover:bg-[var(--burgundy)] hover:scale-110"
                      aria-label="Instagram"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--cream-light)]/10 text-[var(--cream-light)] transition-all hover:bg-[var(--burgundy)] hover:scale-110"
                      aria-label="Facebook"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-left">
                  <h3 className="font-heading text-xl font-semibold text-[var(--cream-light)]">
                    Contact Details
                  </h3>

                  <address className="mt-4 font-body text-sm not-italic leading-relaxed text-[var(--cream-light)]/70">
                    Unit 8, Hurstfold Industrial Estate<br />
                    Fernhurst, Haslemere<br />
                    Surrey GU27 3JG
                  </address>

                  <div className="mt-4 space-y-1">
                    <p className="font-body text-sm text-[var(--cream-light)]/70">
                      <a href="tel:07886877194" className="transition-colors hover:text-[var(--cream)]">
                        07886 877194
                      </a>
                    </p>
                    <p className="font-body text-sm text-[var(--cream-light)]/70">
                      <a href="mailto:info@revival-motorworks.co.uk" className="transition-colors hover:text-[var(--cream)]">
                        info@revival-motorworks.co.uk
                      </a>
                    </p>
                  </div>

                  <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--burgundy)] text-white shadow-lg">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="grow">
                        <div className="flex items-center justify-between gap-4">
                          <h4 className="font-heading text-lg font-bold text-white">Opening Hours</h4>
                          <span className="font-body text-[10px] uppercase tracking-widest text-white/40">Verified</span>
                        </div>
                        <div className="mt-4 space-y-3 font-body text-sm font-medium">
                          <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-white/60">Mon – Thu</span>
                            <span className="text-white">9am – 6pm</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-white/60">Fri</span>
                            <span className="text-white">9am – 5pm</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Sat</span>
                            <span className="text-white">By Appointment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="hidden font-body text-sm text-[var(--cream-light)]/50 lg:block">
                &copy; 2026 Revival Motorworks. All rights reserved. Registered in England & Wales.
              </p>
            </div>

            {/* Right Column - Form */}
            <div id="contact" className="relative">
              <div className="overflow-hidden text-left">
                <h3
                  ref={contactHeadingRef}
                  className="font-heading text-2xl font-bold text-[var(--cream-light)]"
                >
                  Get in Touch
                </h3>
              </div>
              <p className="mt-2 font-body text-base text-[var(--cream-light)]/70">
                Tell us about your vehicle and what you need
              </p>

              {formStatus === "success" ? (
                <div className="mt-8 rounded-[40px] border border-white/20 bg-white/5 p-12 text-center backdrop-blur-sm animate-fade-in-up">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--burgundy)] text-white shadow-lg">
                    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="mt-8 font-heading text-2xl font-bold text-white">Message Sent!</h4>
                  <p className="mt-4 font-body text-[var(--cream-light)]/70">
                    Thank you for contacting Revival Motorworks. We&apos;ll be in touch regarding your vehicle shortly.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="mt-10 font-ui text-xs font-bold uppercase tracking-widest text-[var(--cream)] underline underline-offset-8 transition-colors hover:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="mt-8 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      className="w-full rounded-[8px] border border-[var(--cream-light)]/20 bg-white/5 px-4 py-3 font-body text-[var(--cream-light)] placeholder:text-[var(--cream-light)]/40 focus:border-[var(--burgundy)] focus:outline-none focus:ring-1 focus:ring-[var(--burgundy)]"
                    />
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      className="w-full rounded-[8px] border border-[var(--cream-light)]/20 bg-white/5 px-4 py-3 font-body text-[var(--cream-light)] placeholder:text-[var(--cream-light)]/40 focus:border-[var(--burgundy)] focus:outline-none focus:ring-1 focus:ring-[var(--burgundy)]"
                    />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Your Phone (optional)"
                    className="w-full rounded-[8px] border border-[var(--cream-light)]/20 bg-white/5 px-4 py-3 font-body text-[var(--cream-light)] placeholder:text-[var(--cream-light)]/40 focus:border-[var(--burgundy)] focus:outline-none focus:ring-1 focus:ring-[var(--burgundy)]"
                  />
                  <textarea
                    required
                    name="message"
                    placeholder="Tell us about your vehicle and what you need..."
                    rows={4}
                    className="w-full resize-none rounded-[8px] border border-[var(--cream-light)]/20 bg-white/5 px-4 py-3 font-body text-[var(--cream-light)] placeholder:text-[var(--cream-light)]/40 focus:border-[var(--burgundy)] focus:outline-none focus:ring-1 focus:ring-[var(--burgundy)]"
                  />
                  <button
                    disabled={formStatus === "submitting"}
                    type="submit"
                    className="btn-primary w-full rounded-[8px] px-6 py-4 font-ui text-sm font-semibold uppercase tracking-wider transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                  {formStatus === "error" && (
                    <p className="mt-4 text-center font-body text-sm text-red-400">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                </form>
              )}

              <p className="mt-12 text-center font-body text-sm text-[var(--cream-light)]/50 lg:hidden">
                &copy; 2026 Revival Motorworks. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
