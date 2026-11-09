import { useEffect, useRef, useState } from "react";
import logo from "./assets/Endloops_Infinity_Arrow_Logo.png";
import img1 from "./assets/Endloops1.png";
import img2 from "./assets/Endloops2.png";
import img3 from "./assets/Endloops3.png";
import img4 from "./assets/Endloops4.png";
 
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => 1 - Math.pow(1 - t, 3);
 
const NAV = [
  ["Home", "#home"],
  ["Solutions", "#solutions"],
  ["Tools", "#tools"],
  ["About", "#about"],
  ["Contact", "#contact"],
];
 
const END_TO_END = [
  "Budget Review",
  "Escrow Audit",
  "Financial Audit",
  "Interim Audit",
  "Budget Preparation for Property Management Companies",
];
const TOOLS = [
  "Purchase-Order Extraction",
  "Vouching Automation",
  "Expense Working Automation",
  "Financial Report Review",
  "Tender Verification",
  "Reconciliation",
];
const AUDIENCE = [
  { t: "Accountants", d: "Automate repetitive accounting tasks.", i: "A", c: "bg-[#12B76A]" },
  { t: "Auditors", d: "Streamline audit preparation and checks.", i: "Au", c: "bg-[#2F6BFF]" },
  { t: "Finance Teams", d: "Reduce manual financial workloads.", i: "F", c: "bg-[#7C4DFF]" },
  { t: "Property Managers", d: "Simplify property budgeting and financial workflows.", i: "P", c: "bg-[#0B1B3A]" },
];
 
/* Fade-up on scroll */
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.12 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}
 
function Navbar() {
  return (
    <nav className="fixed left-1/2 top-3.5 z-50 flex w-[min(1100px,calc(100%-24px))] -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-[#0B1B3A]/10 bg-white/80 py-2 pl-5 pr-2.5 shadow-[0_8px_30px_rgba(11,27,58,0.08)] backdrop-blur-xl">
      <a href="#home">
        <img src={logo} alt="Endloops" className="block h-[30px]" />
      </a>
      <ul className="hidden gap-7 text-sm font-semibold text-[#4B5B78] md:flex">
        {NAV.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="transition hover:text-[#0B1B3A]">
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="rounded-full bg-[#0B1B3A] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-px hover:bg-[#12B76A]"
      >
        Request a Demo
      </a>
    </nav>
  );
}
 
/* Scroll-driven hero: cards rise over the logo, then the headline builds in */
// Ordered back -> front: the last card sits on top of the pile and leaves first.
const CARDS = [
  { src: img4, x: -34, y: 22, r: -13 },
  { src: img3, x: 36, y: -16, r: 8 },
  { src: img2, x: -16, y: 12, r: -5 },
  { src: img1, x: 6, y: -4, r: 2 },
];
const HEADLINE = [
  { w: "Financial" },
  { w: "Work," },
  { w: "Automated.", g: true, br: true },
  { w: "Confidence," },
  { w: "Always" },
  { w: "Human.", g: true },
];
 
function Hero() {
  const hero = useRef(null);
  const logoRef = useRef(null);
  const cardRefs = useRef([]);
  const wordRefs = useRef([]);
  const subRef = useRef(null);
 
  useEffect(() => {
    let raf;
    const update = () => {
      const H = window.innerHeight;
      const W = window.innerWidth;
      const rect = hero.current.getBoundingClientRect();
      const p = clamp(-rect.top / (hero.current.offsetHeight - H));
      const sc = Math.min(1, W / 1200);
 
      // Top card leaves first, then the next one, revealing the pile beneath.
      cardRefs.current.forEach((el, i) => {
        const k = CARDS[i];
        const start = (CARDS.length - 1 - i) * 0.08;
        const t = ease(clamp((p - start) / 0.25));
        el.style.transform = `translate(-50%,-50%) translate(${k.x * sc * (1 + t)}px, ${
          k.y * sc - t * H * 0.95
        }px) rotate(${k.r * (1 - t * 0.6)}deg)`;
      });
 
      const lt = clamp((p - 0.4) / 0.25);
      logoRef.current.style.opacity = 1 - ease(lt);
      logoRef.current.style.transform = `translate(-50%,-50%) translateY(${-lt * 60}px) scale(${1 - lt * 0.15})`;
 
      wordRefs.current.forEach((el, i) => {
        const t = ease(clamp((p - 0.58 - i * 0.04) / 0.12));
        el.style.opacity = t;
        el.style.transform = `translateY(${(1 - t) * 40}px)`;
        el.style.filter = `blur(${(1 - t) * 8}px)`;
      });
 
      const st = ease(clamp((p - 0.8) / 0.15));
      subRef.current.style.opacity = st;
      subRef.current.style.transform = `translateY(${(1 - st) * 24}px)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
 
  return (
    <header id="home" ref={hero} className="relative h-[340vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[radial-gradient(60%_50%_at_50%_55%,#E9F8F0,#fff_70%)]">
        <img
          ref={logoRef}
          src={logo}
          alt="Endloops"
          className="absolute left-1/2 top-[54%] w-[min(1200px,92vw)] will-change-transform"
        />
        {CARDS.map((c, i) => (
          <img
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            src={c.src}
            alt=""
            className="absolute left-1/2 top-[46%] aspect-[3/4] w-[clamp(200px,24vw,340px)] rounded-[20px] border-4 border-white object-cover shadow-[0_24px_50px_rgba(11,27,58,0.22)] will-change-transform"
          />
        ))}
 
        <h1 className="absolute left-1/2 top-[40%] m-0 w-[min(1400px,96vw)] -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(28px,4.6vw,78px)] md:whitespace-nowrap font-extrabold leading-[1.04] tracking-[-0.03em] text-[#0B1B3A]">
          {HEADLINE.map((h, i) => (
            <span key={i}>
              <span
                ref={(el) => (wordRefs.current[i] = el)}
                className={`mr-[0.22em] inline-block opacity-0 will-change-transform ${
                  h.g ? "text-[#12B76A]" : ""
                }`}
              >
                {h.w}
              </span>
              {h.br && <br />}
            </span>
          ))}
        </h1>
 
        <div
          ref={subRef}
          className="absolute bottom-[6vh] left-6 max-w-[400px] text-[17px] text-[#4B5B78] opacity-0 md:bottom-[9vh] md:left-[5vw]"
        >
          Endloops builds intelligent automation solutions that help accounting, audit and finance
          teams eliminate repetitive work, reduce errors and focus on what matters most.
          <div>
            <a
              href="#contact"
              className="mt-[18px] inline-block rounded-full bg-[#0B1B3A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#12B76A]"
            >
              Request a Demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
 
function SectionHead({ eyebrow, title, lead }) {
  return (
    <Reveal>
      <div className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#7C4DFF]">{eyebrow}</div>
      <h2 className="mb-3.5 mt-2.5 text-[clamp(30px,4.4vw,52px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
        {title}
      </h2>
      {lead && <p className="mb-11 max-w-[640px] text-lg text-[#4B5B78]">{lead}</p>}
    </Reveal>
  );
}
 
function SolutionCard({ id, num, title, desc, items, alt }) {
  return (
    <Reveal>
      <div
        id={id}
        className={`relative h-full overflow-hidden rounded-[32px] border border-[#CFF0DE] p-8 md:p-10 md:min-h-[470px] ${
          alt ? "bg-gradient-to-br from-[#CFF0DE] to-[#E9F8F0]" : "bg-[#E9F8F0]"
        }`}
      >
        <div className="pointer-events-none absolute -right-[70px] -top-[70px] h-[230px] w-[230px] rounded-full bg-gradient-to-br from-[#2F6BFF] to-[#7C4DFF] opacity-15" />
        <div className="text-[15px] font-extrabold text-[#12B76A]">{num}</div>
        <h3 className="mb-2.5 mt-2 text-3xl font-bold tracking-tight">{title}</h3>
        <p className="mb-6 max-w-[420px] text-[#4B5B78]">{desc}</p>
        <ul className="flex flex-wrap gap-2.5">
          {items.map((it) => (
            <li
              key={it}
              className="flex items-center gap-2 rounded-2xl border border-[#CFF0DE] bg-white px-4 py-2.5 text-[15px] font-semibold"
            >
              <span className={`h-2 w-2 rounded-full ${alt ? "bg-[#2F6BFF]" : "bg-[#12B76A]"}`} />
              {it}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
 
function Solutions() {
  return (
    <section id="solutions" className="mx-auto max-w-[1160px] px-6 pb-28 pt-28">
      <SectionHead
        eyebrow="Our Solutions"
        title="Two ways to automate your financial work."
        lead="Choose a complete solution for an entire process, or a focused tool for one specific task."
      />
      <div className="grid gap-[22px] md:grid-cols-2">
        <SolutionCard
          num="01"
          title="End-to-End Solutions"
          desc="Complete software that handles an entire financial process from beginning to end."
          items={END_TO_END}
        />
        <SolutionCard
          id="tools"
          alt
          num="02"
          title="Standalone Tools"
          desc="Focused software tools designed to automate one specific financial task."
          items={TOOLS}
        />
      </div>
    </section>
  );
}
 
function Audience() {
  return (
    <section className="mx-auto max-w-[1160px] px-6 pb-28">
      <SectionHead
        eyebrow="Who We Serve"
        title="Built for the people behind the numbers."
        lead="Endloops supports the professionals who keep financial work accurate and on time."
      />
      <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {AUDIENCE.map((a) => (
          <Reveal key={a.t}>
            <div className="h-full rounded-3xl border border-[#0B1B3A]/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#CFF0DE] hover:bg-[#E9F8F0]">
              <div className={`mb-[18px] grid h-11 w-11 place-items-center rounded-[14px] font-extrabold text-white ${a.c}`}>
                {a.i}
              </div>
              <h3 className="mb-1.5 text-[21px] font-bold">{a.t}</h3>
              <p className="text-[15px] text-[#4B5B78]">{a.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
 
function About() {
  return (
    <section id="about" className="mx-auto max-w-[1160px] px-6 pb-28">
      <Reveal>
        <div className="grid gap-12 rounded-[36px] border border-[#CFF0DE] bg-[#E9F8F0] p-8 md:grid-cols-[1.1fr_1fr] md:p-16">
          <div>
            <div className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#7C4DFF]">About Endloops</div>
            <h2 className="mt-2.5 text-[clamp(30px,4.4vw,52px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
              Built from Financial Expertise. Designed for What’s Next.
            </h2>
          </div>
          <div className="space-y-4 text-[17px] text-[#4B5B78]">
            <p>Endloops originated from the technology department of Alkazim, an accounting and audit firm based in Dubai.</p>
            <p>
              With practical experience in financial workflows, Endloops is building automation software for
              accounting, auditing and property finance professionals.
            </p>
            <p>
              Its ambition is to become a trusted automation partner for financial teams across the GCC region and
              beyond.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
 
const field =
  "w-full rounded-[14px] border border-white/20 bg-white/[0.07] px-4 py-3.5 text-white placeholder:text-[#8EA0C2] focus:outline-none focus:ring-2 focus:ring-[#12B76A]";
 
function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    // TODO: send the form data to your backend / email service here.
    setSent(true);
    e.target.reset();
  };
  return (
    <section id="contact" className="mx-auto max-w-[1160px] px-6 pb-28">
      <Reveal>
        <div className="grid gap-12 rounded-[36px] bg-[#0B1B3A] p-8 text-white md:grid-cols-[1fr_1.1fr] md:p-14">
          <div>
            <div className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#A98BFF]">Contact</div>
            <h2 className="mb-3.5 mt-2.5 text-[clamp(30px,4.4vw,52px)] font-extrabold leading-[1.08] tracking-[-0.025em]">
              Request a Demo
            </h2>
            <p className="text-[#B8C4DC]">
              Tell us about your team and the process you’d like to automate. We’ll show you what Endloops can do.
            </p>
          </div>
          <form onSubmit={submit} className="grid gap-3.5">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <input required placeholder="Full name" className={field} />
              <input required type="email" placeholder="Work email" className={field} />
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <input placeholder="Company" className={field} />
              <select className={field}>
                {["Accountant", "Auditor", "Finance Team", "Property Manager"].map((o) => (
                  <option key={o} className="text-[#0B1B3A]">
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <textarea rows={4} placeholder="What would you like to automate?" className={field} />
            <button
              type="submit"
              className="rounded-full bg-[#12B76A] px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#0B1B3A]"
            >
              Request a Demo
            </button>
            {sent && <p className="text-[#7CE0B0]">Thank you — we’ll be in touch shortly.</p>}
          </form>
        </div>
      </Reveal>
    </section>
  );
}
 
function Footer() {
  return (
    <footer className="px-6 pb-14 pt-10 text-center text-sm text-[#4B5B78]">
      <img src={logo} alt="Endloops" className="mx-auto mb-3 block h-7" />© 2026 Endloops. All rights reserved.
    </footer>
  );
}
 
export default function Endloops() {
  return (
    <div className="overflow-x-clip bg-white font-[Manrope,system-ui,sans-serif] text-[#0B1B3A]">
      <Navbar />
      <Hero />
      <Solutions />
      <Audience />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}