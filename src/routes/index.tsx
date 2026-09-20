import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  CirclePlay,
  Languages,
  Mic2,
  Pause,
  Play,
  ScanFace,
  Sparkles,
  Users,
  Volume2,
  Waves,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Commmio — Understand how you communicate" },
      {
        name: "description",
        content:
          "AI-powered speech, voice, facial expression, and body language analysis with clear, actionable coaching.",
      },
      { property: "og:title", content: "Commmio — Understand how you communicate" },
      {
        property: "og:description",
        content: "See the signals behind every conversation and turn them into meaningful improvement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommmioPage,
});

type BuddyMood = "calm" | "excited" | "thinking" | "cheering" | "coaching";

const moodCopy: Record<BuddyMood, string> = {
  calm: "Ready to see how you communicate?",
  excited: "Let's find your strongest signal!",
  thinking: "Reading the rhythm behind your words…",
  cheering: "Nice improvement! Your pacing feels natural.",
  coaching: "Try looking toward the camera a little more.",
};

function Buddy({ mood = "calm", compact = false }: { mood?: BuddyMood; compact?: boolean }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      setPointer({
        x: Math.max(-5, Math.min(5, (event.clientX / window.innerWidth - 0.5) * 10)),
        y: Math.max(-4, Math.min(4, (event.clientY / window.innerHeight - 0.45) * 8)),
      });
    };
    const timer = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 150);
    }, 4200);
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className={cn("buddy-wrap", compact && "buddy-compact")} aria-label={`Communication Buddy is ${mood}`}>
      {!compact && <div className="buddy-bubble">{moodCopy[mood]}</div>}
      <div className={cn("buddy", `buddy-${mood}`)}>
        <div className="buddy-glow" />
        <div className="buddy-ear buddy-ear-left" />
        <div className="buddy-ear buddy-ear-right" />
        <div className="buddy-face">
          <div className="buddy-eyes" style={{ transform: `translate(${pointer.x}px, ${pointer.y}px)` }}>
            <span className={cn("buddy-eye", blink && "is-blinking")} />
            <span className={cn("buddy-eye", blink && "is-blinking")} />
          </div>
          <div className={cn("buddy-mouth", mood === "cheering" && "buddy-mouth-happy")} />
        </div>
        <div className="buddy-body-mark"><Waves aria-hidden="true" /></div>
      </div>
    </div>
  );
}

function WaveField() {
  return (
    <div className="wave-field" aria-hidden="true">
      <svg viewBox="0 0 1400 700" preserveAspectRatio="none">
        <path className="wave wave-one" d="M-80 420 C210 200 330 620 620 400 S1020 180 1500 410" />
        <path className="wave wave-two" d="M-100 510 C240 260 430 670 760 390 S1120 300 1480 300" />
        <path className="wave wave-three" d="M-100 310 C230 130 480 520 760 290 S1120 110 1480 230" />
      </svg>
    </div>
  );
}

const signals = [
  { name: "VOICE", number: "01", color: "cyan", title: "Hear beyond words.", text: "Tone, pitch, pace and vocal variation reveal the emotion carried in your voice.", icon: Mic2 },
  { name: "SPEECH", number: "02", color: "blue", title: "Make every idea land.", text: "Clarity, structure, language and word choice show how easily your message travels.", icon: Volume2 },
  { name: "FACE", number: "03", color: "violet", title: "See genuine connection.", text: "Expression, emotion and engagement uncover how your audience experiences you.", icon: ScanFace },
  { name: "BODY", number: "04", color: "coral", title: "Presence speaks too.", text: "Movement, posture and gesture create the confidence behind your message.", icon: Users },
];

const observations = [
  { at: 8, time: "00:08", title: "Strong opening", text: "Clear intent and steady eye contact", tone: "positive" },
  { at: 26, time: "00:26", title: "Pace increased", text: "Leave a short pause after the key idea", tone: "coach" },
  { at: 49, time: "00:49", title: "Natural emphasis", text: "Vocal variation reinforced your point", tone: "positive" },
  { at: 71, time: "01:11", title: "Attention shifted", text: "Bring your gaze back toward the camera", tone: "coach" },
  { at: 90, time: "01:30", title: "Confident close", text: "Warm expression matched your message", tone: "positive" },
];

const metrics = [
  ["Clarity", 91], ["Pacing", 76], ["Engagement", 88], ["Confidence", 84], ["Congruence", 93], ["Eye movement", 72],
] as const;

function AnalysisDemo() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(36);
  const active = observations.reduce((closest, item) => Math.abs(item.at - progress) < Math.abs(closest.at - progress) ? item : closest);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setProgress((current) => current >= 100 ? 0 : current + 0.5), 120);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <div className="analysis-console">
      <div className="video-stage">
        <div className="video-topline"><span><span className="live-dot" /> Session analysis</span><span>01:42</span></div>
        <div className="speaker-scene">
          <div className="speaker-halo" />
          <div className="speaker-head"><span /><span /></div>
          <div className="speaker-body" />
          <div className="tracking-point tp-one" /><div className="tracking-point tp-two" /><div className="tracking-point tp-three" />
        </div>
        <button className="play-control" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause analysis" : "Play analysis"}>
          {playing ? <Pause /> : <Play />}
        </button>
        <div className="video-caption">“The most memorable ideas are the ones we can feel.”</div>
      </div>
      <div className="analysis-panel">
        <div className="analysis-heading"><span>LIVE SIGNALS</span><span className="analysis-score">86 <small>/100</small></span></div>
        <div className="metric-grid">
          {metrics.map(([label, value], index) => (
            <div className="metric" key={label}>
              <div><span>{label}</span><strong>{value}</strong></div>
              <div className="metric-bar"><i style={{ width: `${value}%`, animationDelay: `${index * 100}ms` }} /></div>
            </div>
          ))}
        </div>
        <div className="active-insight">
          <Sparkles aria-hidden="true" />
          <div><span>{active.time} · AI OBSERVATION</span><strong>{active.title}</strong><p>{active.text}</p></div>
        </div>
      </div>
      <div className="timeline-shell">
        <div className="timeline-labels"><span>VOICE</span><span>SPEECH</span><span>FACE</span><span>BODY</span></div>
        <div className="timeline-tracks">
          {[0, 1, 2, 3].map((track) => <div className={`signal-track track-${track}`} key={track}><i /><i /><i /><i /></div>)}
          <div className="playhead" style={{ left: `${progress}%` }}><b /></div>
        </div>
        <Slider value={[progress]} max={100} step={1} onValueChange={([value]) => setProgress(value ?? 0)} aria-label="Analysis timeline" className="analysis-slider" />
        <div className="time-axis"><span>00:00</span><span>00:25</span><span>00:51</span><span>01:17</span><span>01:42</span></div>
      </div>
    </div>
  );
}

const drills = [
  { name: "Pacing drill", prompt: "Slow down for the key phrase.", result: "Your pauses improved by 18%.", icon: Waves },
  { name: "Eye contact trainer", prompt: "Hold your gaze for one complete thought.", result: "Great focus — 7 seconds sustained.", icon: ScanFace },
  { name: "Vocal variation", prompt: "Lift your energy on the final word.", result: "More contrast. The idea now feels intentional.", icon: Mic2 },
  { name: "Opening hook", prompt: "Open with the moment, not the context.", result: "Stronger start — attention increased to 92%.", icon: Zap },
];

function CoachingPlayground() {
  const [selected, setSelected] = useState(0);
  const [coaching, setCoaching] = useState(true);
  const [practiced, setPracticed] = useState(false);
  const drill = drills[selected] ?? drills[0];
  if (!drill) return null;
  const Icon = drill.icon;
  return (
    <div className="coach-layout">
      <div className="coach-list">
        {drills.map((item, index) => {
          const ItemIcon = item.icon;
          return <button key={item.name} onClick={() => { setSelected(index); setPracticed(false); }} className={cn("coach-option", selected === index && "active")}><ItemIcon /><span><b>0{index + 1}</b>{item.name}</span><ArrowRight /></button>;
        })}
      </div>
      <div className="coach-stage">
        <div className="coach-toolbar"><span>LIVE COACHING</span><Switch checked={coaching} onCheckedChange={setCoaching} aria-label="Toggle live coaching" /></div>
        <Buddy mood={!coaching ? "calm" : practiced ? "cheering" : "coaching"} compact />
        <div className="coach-message"><Icon /><span>{practiced ? drill.result : drill.prompt}</span></div>
        <div className="voice-orbit"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <Button size="lg" onClick={() => setPracticed(!practiced)} className="practice-button">{practiced ? <><Check /> Completed</> : <><Mic2 /> Start practice</>}</Button>
      </div>
    </div>
  );
}

function BilingualBridge() {
  const [arabic, setArabic] = useState(false);
  return (
    <div className="language-stage">
      <div className="language-copy">
        <span className="eyebrow light"><Languages /> GLOBAL INTELLIGENCE</span>
        <h2>Communication has<br />more than one rhythm.</h2>
        <p>Commmio understands meaning, tone, and cultural context across English and Arabic — not just translated words.</p>
        <div className="language-pills"><span>Dialect recognition</span><span>Phoneme analysis</span><span>Cultural resonance</span></div>
      </div>
      <div className="language-bridge">
        <div className="language-tabs">
          <button className={!arabic ? "active" : ""} onClick={() => setArabic(false)}>English</button>
          <button className={arabic ? "active" : ""} onClick={() => setArabic(true)}>العربية</button>
        </div>
        <div className="phrase-flow">
          <span className="phrase-label">INTENT · CONFIDENT WELCOME</span>
          <blockquote dir={arabic ? "rtl" : "ltr"}>{arabic ? "أهلاً بكم، يسعدني أن نبدأ هذه الرحلة معاً." : "Welcome — I’m glad we can begin this journey together."}</blockquote>
          <div className="phoneme-wave">{Array.from({ length: 36 }).map((_, i) => <i key={i} style={{ height: `${18 + ((i * 17) % 46)}px` }} />)}</div>
          <div className="linguistic-metrics"><span><b>94%</b> Tone match</span><span><b>Levantine</b> Dialect</span><span><b>Warm</b> Resonance</span></div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return <a href="#top" className="logo" aria-label="Commmio home"><span className="logo-mark"><i /><i /><i /></span>commmio</a>;
}

function CommmioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroMood, setHeroMood] = useState<BuddyMood>("calm");
  const nav = useMemo(() => [["Product", "#product"], ["Solutions", "#solutions"], ["How It Works", "#how"], ["Pricing", "#pricing"], ["Resources", "#resources"]], []);
  return (
    <main id="top" className="site-shell">
      <header className="site-nav">
        <Logo />
        <nav className={cn("nav-links", menuOpen && "is-open")} aria-label="Main navigation">
          {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="nav-actions"><a href="#login">Log in</a><Button asChild><a href="#pricing">Get started <ArrowRight /></a></Button></div>
        <Button variant="ghost" size="icon" className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><span /><span /></Button>
      </header>

      <section className="hero" onMouseEnter={() => setHeroMood("excited")} onMouseLeave={() => setHeroMood("calm")}>
        <WaveField />
        <div className="hero-grain" />
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles /> HUMAN INTELLIGENCE, AMPLIFIED</span>
          <h1>Understand how<br />you <em>communicate.</em></h1>
          <p>AI-powered analysis of speech, voice, facial expression, and body language — turning communication into clear, actionable feedback.</p>
          <div className="hero-actions"><Button size="lg" asChild><a href="#analysis">Try Commmio <ArrowRight /></a></Button><Button size="lg" variant="outline" asChild><a href="#product">Explore the platform</a></Button></div>
          <button className="quick-demo" onClick={() => document.querySelector("#analysis")?.scrollIntoView({ behavior: "smooth" })}><CirclePlay /> Watch the 45 sec experience</button>
        </div>
        <div className="hero-buddy"><Buddy mood={heroMood} /></div>
        <div className="signal-readout signal-left"><span>VOICE ENERGY</span><div><i /><i /><i /><i /><i /><i /></div><strong>84%</strong></div>
        <div className="signal-readout signal-right"><span>ENGAGEMENT</span><div className="mini-ring"><b>91</b></div><strong>Strong</strong></div>
        <a href="#how" className="scroll-cue"><ChevronDown /> SCROLL TO DISCOVER</a>
      </section>

      <section id="how" className="concept-flow section-light">
        <div className="section-intro centered"><span className="eyebrow dark">FROM MOMENT TO MOMENTUM</span><h2>Every signal tells part of the story.</h2><p>Commmio brings the whole conversation into focus — then shows you what to do next.</p></div>
        <div className="flow-line">
          {["Human", "Communication", "Signals", "AI Analysis", "Insight", "Improvement"].map((item, index) => <div className="flow-step" key={item}><span>{index + 1}</span><b>{item}</b>{index < 5 && <i />}</div>)}
        </div>
      </section>

      <section id="product" className="signals-section section-light">
        <div className="section-intro"><span className="eyebrow dark">THE WHOLE COMMUNICATION</span><h2>Four signals.<br /><em>One human story.</em></h2></div>
        <div className="signal-stack">
          {signals.map((signal) => {
            const Icon = signal.icon;
            return <article className={`signal-card signal-${signal.color}`} key={signal.name}><div className="signal-number">{signal.number}</div><div className="signal-icon"><Icon /></div><div><span>{signal.name}</span><h3>{signal.title}</h3><p>{signal.text}</p></div><div className="signal-visual"><div className="orbital"><i /><i /><i /></div><Icon /></div></article>;
          })}
        </div>
      </section>

      <section id="analysis" className="analysis-section">
        <WaveField />
        <div className="section-intro light"><span className="eyebrow">SEE THE SIGNALS</span><h2>One moment.<br />Every dimension.</h2><p>Replay the conversation with a synchronized view of what was said, how it sounded, and how it was expressed.</p></div>
        <AnalysisDemo />
      </section>

      <section className="coaching-section section-light">
        <div className="section-intro"><span className="eyebrow dark">PRACTICE WITH PURPOSE</span><h2>Turn insight into<br /><em>improvement.</em></h2><p>Targeted exercises transform feedback into lasting communication habits.</p></div>
        <CoachingPlayground />
      </section>

      <section className="bilingual-section"><BilingualBridge /></section>

      <section id="solutions" className="solutions-section section-light">
        <div className="section-intro centered"><span className="eyebrow dark">BUILT FOR REAL MOMENTS</span><h2>Clarity at every scale.</h2></div>
        <div className="use-case-grid">
          <article className="use-case education"><div className="case-tag"><BookOpen /> EDUCATION</div><h3>Make every lecture land.</h3><p>See classroom movement, engagement and vocal pacing on one continuous teaching timeline.</p><div className="lecture-chart"><div className="engagement-score"><b>87</b><span>engagement<br />index</span></div><svg viewBox="0 0 500 140"><path d="M0 110 C45 90 55 35 105 58 S165 118 210 70 S265 25 305 50 S390 110 500 32" /><path className="chart-fill" d="M0 110 C45 90 55 35 105 58 S165 118 210 70 S265 25 305 50 S390 110 500 32 L500 140 L0 140Z" /></svg><div className="lecture-labels"><span>Opening</span><span>Concept</span><span>Discussion</span><span>Close</span></div></div></article>
          <article className="use-case business"><div className="case-tag"><Building2 /> BUSINESS & TEAMS</div><h3>Grow communication together.</h3><p>Build custom scoring models, compare team benchmarks and track development without losing the human context.</p><div className="team-preview"><div className="team-row"><span>Leadership</span><i style={{ width: "88%" }} /><b>88</b></div><div className="team-row"><span>Sales</span><i style={{ width: "82%" }} /><b>82</b></div><div className="team-row"><span>Customer success</span><i style={{ width: "91%" }} /><b>91</b></div><div className="benchmark"><BarChart3 /> Team benchmark <strong>+12%</strong></div></div></article>
        </div>
      </section>

      <section id="pricing" className="pricing-section section-light">
        <div className="section-intro centered"><span className="eyebrow dark">CHOOSE YOUR PATH</span><h2>Start where you are.<br /><em>Grow from there.</em></h2></div>
        <div className="pricing-grid">
          {[
            { name: "Individual", price: "$0", note: "For personal practice", features: ["4 analyses each month", "Core communication scores", "Guided practice drills"] },
            { name: "Professional", price: "$24", note: "For ambitious communicators", features: ["Unlimited analyses", "Detailed signal timelines", "Personalized AI coaching"], featured: true },
            { name: "Business", price: "Let’s talk", note: "For teams and organizations", features: ["Team dashboards", "Custom scoring models", "Enterprise security & API"] },
          ].map((tier) => <article className={cn("price-card", tier.featured && "featured")} key={tier.name}>{tier.featured && <span className="popular">MOST POPULAR</span>}<span className="tier-name">{tier.name}</span><h3>{tier.price}{tier.price.startsWith("$") && <small>/month</small>}</h3><p>{tier.note}</p><ul>{tier.features.map((feature) => <li key={feature}><Check />{feature}</li>)}</ul><Button variant={tier.featured ? "default" : "outline"} className="tier-button">{tier.name === "Business" ? "Contact sales" : "Start now"}<ArrowRight /></Button></article>)}
        </div>
      </section>

      <section id="resources" className="closing-section">
        <div className="closing-buddy"><Buddy mood="cheering" compact /></div>
        <h2>Your next conversation<br />can feel <em>different.</em></h2>
        <p>See what others hear. Understand what they feel. Practice what comes next.</p>
        <Button size="lg" asChild><a href="#top">Start communicating better <ArrowRight /></a></Button>
      </section>

      <footer><Logo /><p>Human communication, made clearer.</p><div><a href="#product">Product</a><a href="#solutions">Solutions</a><a href="#pricing">Pricing</a><a href="#privacy">Privacy</a></div><span>© 2026 Commmio</span></footer>
    </main>
  );
}