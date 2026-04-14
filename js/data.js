// ============================================================
// TANAKA ALEX MBENDANA — MASTERS RESEARCH ROADMAP
// Scene & content data — single source of truth
// ============================================================

export const PROFILE = {
  name: "Tanaka Alex Mbendana",
  title: "MSc Remote Sensing & GIS",
  university: "Beihang University, Beijing, China",
  period: "2025 – 2027",
  origin: "Zimbabwe 🇿🇼",
  publication: {
    title: "Application of change detection techniques driven by expert opinions for small-area studies in developing countries",
    journal: "Scientific African",
    year: 2025,
    doi: "https://doi.org/10.1016/j.sciaf.2025.e02594",
    level: "Bachelor's Level Publication"
  },
  tools: [
    { name: "Claude Code", role: "Manuscript analysis · Figure building · Methods revision · Code engineering", color: "#D97706" },
    { name: "ChatGPT", role: "Conceptual ideation · Grammar fixing · Weakness identification · Writing feedback", color: "#10B981" }
  ]
};

export const RESEARCH = {
  title: "Solar Induced Fluorescence as a Diagnostic of Tropical Cyclone Impacts on Vegetation in Southern Africa",
  shortTitle: "SIF & Cyclone Vegetation Response",
  supervisor: "Prof. Feng (weekly meetings)",
  targetJournal: "International Journal of Applied Earth Observation and Geoinformation",
  targetSubmission: "July 2026",
  secondManuscript: "Final year (2026–2027)",
  abstract: `Tropical cyclones in Southern Africa cause severe ecological disruption, yet conventional
  vegetation indices like NDVI often miss the full extent of photosynthetic damage. This study uses
  Solar Induced Fluorescence (SIF) derived from the TROPOMI sensor aboard Sentinel-5P to quantify
  vegetation physiological responses to cyclone events across Southern Africa. By analysing SIF signals
  at multiple spatial aggregation scales and linking them to CHIRPS rainfall anomalies, we identify
  scale-dependent patterns of stress, suppression, and recovery that NDVI alone cannot resolve.
  Cyclones Idai (2019), Chalane (2021), and Freddy (2023) serve as primary case studies.`,
  keyData: [
    "TROPOSIF / TROPOMI (Sentinel-5P) — SIF signal",
    "CHIRPS v2.0 — Rainfall anomalies",
    "MODIS MOD17A2H — GPP validation",
    "IBTrACS — Cyclone track data",
    "BIOME classification — Ecoregion stratification"
  ],
  studyArea: "Southern Africa (Zimbabwe, Mozambique, South Africa)",
  keyFindings: [
    "SIF detects photosynthetic suppression during cyclone landfall before NDVI registers structural change",
    "Scale-dependent aggregation reveals signal dilution at national level vs. cyclone-footprint scale",
    "Cyclone Freddy (2023) showed longest SIF recovery trajectory of all events studied",
    "La Niña amplification of cyclogenesis measurably shifts the SIF baseline across the study region",
    "Rainfall timing relative to phenological stage determines magnitude of SIF depression"
  ],
  novelty: "First study to systematically evaluate SIF spatial aggregation scale as a variable in cyclone damage attribution across Southern African ecoregions",
  futureWork: [
    "Second manuscript: spatial-temporal modelling of SIF recovery trajectories",
    "Integration with SAR (Sentinel-1) for structural damage co-analysis",
    "Expand to all Category 3+ cyclones in the SWIO basin (2000–2024)"
  ]
};

export const WEAKNESSES = {
  meta: {
    title: "The Meta-Weakness",
    description: "Optimizing for being 'right' instead of being 'attack-resistant'.",
    question: "\"Can this survive criticism?\" — not just \"Is this good enough?\""
  },
  categories: [
    {
      name: "Core Cognitive & Process",
      icon: "🧠",
      color: "#EF4444",
      items: [
        { id: 1, title: "Perfectionism (disguised procrastination)", detail: "Delaying output to 'improve' it instead of exposing early and iterating." },
        { id: 2, title: "Hesitation at decision points", detail: "Slowing down when committing to interpretations, structure, or submission readiness." },
        { id: 3, title: "Mismanaged doubt", detail: "Applying doubt globally ('this might be weak') instead of locally ('this exact claim is weak')." },
        { id: 4, title: "Lack of aggressive self-critique early", detail: "Refining ideas before trying to break them." },
        { id: 5, title: "Over-iteration before feedback", detail: "Polishing internally instead of using external critique cycles." }
      ]
    },
    {
      name: "Conceptual & Scientific",
      icon: "🔬",
      color: "#F59E0B",
      items: [
        { id: 6, title: "Causality overreach", detail: "Moving from pattern → mechanism without sufficient evidence." },
        { id: 7, title: "Weak separation of claim types", detail: "Blurring observation, association, hypothesis, and mechanism." },
        { id: 8, title: "Overbuilding conceptual frameworks", detail: "Introducing indices before stabilizing core results." },
        { id: 9, title: "Novelty bias over clarity", detail: "Prioritising 'newness' over interpretability." },
        { id: 10, title: "Incomplete stress-testing of assumptions", detail: "Not systematically attacking spatial, temporal, or aggregation logic before analysis." }
      ]
    },
    {
      name: "Methodological",
      icon: "⚙️",
      color: "#8B5CF6",
      items: [
        { id: 11, title: "Spatial scale mismatch", detail: "Aggregating at scales that don't match the physical process." },
        { id: 12, title: "Signal dilution through aggregation", detail: "Mixing impacted + non-impacted areas reduces interpretability." },
        { id: 13, title: "Mixing incompatible scales of reasoning", detail: "Combining pixel-level processes with national summaries without reconciling them." },
        { id: 14, title: "Insufficient statistical interrogation", detail: "Reporting relationships without testing robustness or power." },
        { id: 15, title: "Weak handling of small sample sizes", detail: "Interpreting trends without constraining by N." }
      ]
    },
    {
      name: "Writing & Structural",
      icon: "✍️",
      color: "#06B6D4",
      items: [
        { id: 16, title: "Precision loss under complexity", detail: "As ideas become complex, clarity drops and redundancy increases." },
        { id: 17, title: "Inconsistent notation and definitions", detail: "Terms and indices not always perfectly stable across sections." },
        { id: 18, title: "Repetition of methodological descriptions", detail: "Restating things instead of tightening them." },
        { id: 19, title: "Under-constrained limitations", detail: "Mentioning limitations without letting them actively restrict conclusions." },
        { id: 20, title: "Overextended interpretation sections", detail: "Explaining more than the data strictly supports." }
      ]
    },
    {
      name: "Data & Interpretation",
      icon: "📊",
      color: "#10B981",
      items: [
        { id: 21, title: "Treating correlated variables as additive insight", detail: "Combining signals that may just duplicate information." },
        { id: 22, title: "Insufficient handling of temporal mismatch", detail: "Daily vs 8-day products not fully reconciled in interpretation." },
        { id: 23, title: "Under-addressed measurement constraints", detail: "SIF dependence on solar zenith angle and illumination geometry." },
        { id: 24, title: "Weak linkage between drivers and response", detail: "Rainfall metrics vs CFDI relationships explained but not deeply resolved." }
      ]
    },
    {
      name: "Strategic Research",
      icon: "🎯",
      color: "#EC4899",
      items: [
        { id: 25, title: "Chasing complexity before stability", detail: "Expanding the framework before locking core method, signal, and result." },
        { id: 26, title: "Delayed exposure to critique", detail: "Waiting too long before showing work." },
        { id: 27, title: "Inefficient iteration cycles", detail: "Too much internal refinement, not enough external testing." },
        { id: 28, title: "Meta-weakness: optimizing to be right", detail: "Asking 'Is this good enough?' instead of 'Can this survive criticism?'" }
      ]
    }
  ],
  fiveNonNegotiables: [
    "Define claim level for every statement: observation / association / mechanism",
    "Stress-test before refinement — try to break your method before polishing it",
    "Lock scale consistency early — spatial + temporal alignment must be defensible first",
    "Kill unnecessary concepts — if it doesn't increase clarity, remove it",
    "Expose work earlier — external feedback > internal perfection"
  ]
};

export const COURSES = {
  semester1: {
    label: "Semester 1 · Sept 2025",
    courses: [
      { name: "Introduction to Remote Sensing", relevance: "Foundation for SIF & satellite data literacy", color: "#3B82F6" },
      { name: "Spatial Data Science", relevance: "Spatial analysis methods used in the manuscript", color: "#8B5CF6" },
      { name: "Probability & Statistics", relevance: "Statistical testing for SIF response analysis", color: "#10B981" },
      { name: "GNSS Receiver Principals & Design", relevance: "Signals & sensor theory (context for TROPOMI)", color: "#F59E0B" },
      { name: "Introduction to Space Technology", relevance: "Satellite missions, orbits, sensor design", color: "#EF4444" },
      { name: "Overview of China", relevance: "Cultural & academic integration", color: "#EC4899" },
      { name: "Chinese 1", relevance: "Language for daily life in Beijing", color: "#06B6D4" }
    ]
  },
  semester2: {
    label: "Semester 2 · Feb 2026",
    courses: [
      { name: "Scientific Writing", relevance: "Direct tool for manuscript structure, journal submission, citation style", color: "#D97706", key: true },
      { name: "AI & Large Models", relevance: "AI tools used throughout the research workflow", color: "#7C3AED", key: true },
      { name: "Intelligent Processing of Remote Sensing Images", relevance: "Image processing pipeline for SIF data", color: "#0891B2", key: true },
      { name: "Team Project (HyPlant SIF Study)", relevance: "Parallel SIF research — HyPlant airborne sensor", color: "#059669", key: true },
      { name: "Chinese 2", relevance: "Continued language study", color: "#BE185D" }
    ]
  }
};

export const SCENES = [
  {
    id: 1,
    slug: "arrival",
    title: "Arrival",
    subtitle: "September 2025 — Beihang University, Beijing",
    theme: "dawn",
    palette: { bg: "#0f1923", accent: "#F59E0B", text: "#FEF3C7" },
    particles: { color: "#F59E0B", count: 120, speed: 0.3 },
    story: `September 2025. I packed a bag, a laptop, and a research idea that was barely a sentence long.

From Harare to Beijing — a 10,000 km jump across continents, climates, and academic cultures.
Beihang University. One of China's top aerospace and remote sensing institutions.
My destination.

I had already published one paper at bachelor's level — on change detection techniques
in small-area studies. But masters research was different. This was longer. Deeper.
And I was starting it in a language I barely spoke, in a city I'd never been to,
surrounded by peers from across the world.

The first week was orientation, paperwork, and trying to read a campus map in Mandarin.
The second week, the real work began.`,
    milestone: "MSc Programme begins"
  },
  {
    id: 2,
    slug: "courses",
    title: "The Courses",
    subtitle: "7 Courses · Building the Foundation",
    theme: "night",
    palette: { bg: "#0a0f1e", accent: "#3B82F6", text: "#DBEAFE" },
    particles: { color: "#3B82F6", count: 200, speed: 0.2 },
    story: `Seven courses. Each one a brick.

Remote Sensing — satellites, sensors, the electromagnetic spectrum.
The language of the Earth viewed from 700 km above.

Spatial Data Science — how to think in maps, in scales, in projections.

Probability & Statistics — the grammar of scientific claims.
Without this, every result is just a number.

GNSS Receiver Principals — signals, orbits, precision.
It also taught me how TROPOMI, the sensor at the heart of my research,
keeps its orbital geometry so precise.

Introduction to Space Technology — why we go to space,
what we build, what we can see from there.

And Chinese. Two semesters of it.
Because Beijing wasn't going to speak English back to me on the metro at midnight.

These weren't just credits. They were the vocabulary I needed
to say something meaningful about the planet.`,
    milestone: "Academic foundation built"
  },
  {
    id: 3,
    slug: "spark",
    title: "The Spark",
    subtitle: "The Research Question Takes Shape",
    theme: "green-glow",
    palette: { bg: "#021a0f", accent: "#10B981", text: "#D1FAE5" },
    particles: { color: "#10B981", count: 150, speed: 0.4 },
    story: `It started with a question that bothered me.

Cyclones devastate Southern Africa. We know this. We see it on news, in aid reports,
in satellite images of flattened forests and flooded coastlines.
But how do you actually measure what a cyclone does to vegetation —
not just structurally, but physiologically?

NDVI tells you leaves are gone.
But SIF — Solar Induced Fluorescence — tells you whether the remaining leaves
are still photosynthesising. It's the difference between an ECG
and just checking if someone is still standing.

TROPOMI, aboard Sentinel-5P, has been measuring SIF from space since 2018.
The data exists. Nobody had used it specifically to trace cyclone impacts
at multiple spatial scales across Southern Africa.

That was the gap. That became my study.

Cyclone Idai. Chalane. Freddy. Three storms.
One question: what does the SIF signal tell us that nothing else does?`,
    milestone: "Research topic locked: SIF + Cyclone vegetation response"
  },
  {
    id: 4,
    slug: "missing-home",
    title: "Missing Home",
    subtitle: "The Weight of Distance",
    theme: "warm-amber",
    palette: { bg: "#1a0f02", accent: "#D97706", text: "#FEF3C7" },
    particles: { color: "#D97706", count: 80, speed: 0.15 },
    story: `There is a particular kind of quiet that comes at 2am in a city of 22 million people
when you are the only one awake in your dormitory.

Zimbabwe is warm in ways that Beijing in winter is not.
The light is different. The air is different.
The rhythm of conversations at home — in Shona, in English, all mixed together —
is different from the corridors of Beihang.

My research is about Southern Africa. My study area is my home region.
Cyclone Idai did not hit an abstract geography. It hit communities.
It hit the Chimanimani mountains I know. It hit the lowveld I can picture.

Researching it from 10,000 km away carries a particular weight.
Every time I opened the TROPOMI data and looked at the SIF signal drop
over Sofala Province after Idai's landfall, I was not just looking at pixels.

That weight is not a weakness. It is a reason.`,
    milestone: "Personal anchor: research rooted in home"
  },
  {
    id: 5,
    slug: "struggle",
    title: "The Struggle",
    subtitle: "28 Identified Weaknesses",
    theme: "storm",
    palette: { bg: "#0f0a1a", accent: "#8B5CF6", text: "#EDE9FE" },
    particles: { color: "#8B5CF6", count: 250, speed: 0.6 },
    story: `I asked ChatGPT to evaluate me.
Not to make me feel better. To diagnose what was wrong.

It came back with 28 weaknesses.

The one that hit hardest: I optimize for being right.
Not for being attack-resistant.

I ask "Is this good enough?"
when I should ask "Can this survive peer review?"

Perfectionism, it turns out, is not about standards.
It is about fear. Fear that if I show the work before it is perfect,
someone will find the gap I already know is there.

The Scientific Writing course at Beihang made this worse before it made it better.
Learning about PRISMA guidelines, journal metrics, Springer submission standards —
it raised the bar in my head to a height I could not yet reach.

The fix is not to lower the bar.
It is to expose the work earlier, break it deliberately,
and iterate with external feedback rather than internal perfection.

I am still learning this.`,
    milestone: "Self-diagnosis complete — 28 weaknesses mapped, 5 non-negotiables defined"
  },
  {
    id: 6,
    slug: "conceptualization",
    title: "The Framework",
    subtitle: "Building the Scientific Architecture",
    theme: "blueprint",
    palette: { bg: "#021020", accent: "#06B6D4", text: "#CFFAFE" },
    particles: { color: "#06B6D4", count: 170, speed: 0.35 },
    story: `The manuscript started as a question.
Then it became a framework.

Four analytical pillars:

First — SIF as a physiological indicator.
Not just what a cyclone knocks down, but whether the vegetation that survives is still alive
in the photosynthetic sense. TROPOSIF data from TROPOMI gives us that.

Second — Spatial aggregation as a variable.
When you average SIF at country level, you lose the cyclone signal.
At the cyclone footprint scale, it screams.
The question became: at what scale does SIF become diagnostic?

Third — Rainfall timing.
CHIRPS data to map not just total rainfall during cyclone events,
but the timing relative to the phenological cycle.
A cyclone in peak growing season hits differently than one in dormancy.

Fourth — Ecoregion stratification.
Southern African savannas, miombo woodlands, and coastal forests respond differently.
A single response curve misleads. BIOME classification lets us separate them.

The framework took three iterations and two supervisor meetings to stabilise.
Version 1 was too ambitious. Version 2 was too narrow.
Version 3 was defensible.`,
    milestone: "Analytical framework stabilised — 4 pillars locked"
  },
  {
    id: 7,
    slug: "semester2",
    title: "Semester Two",
    subtitle: "February 2026 — Deepening the Work",
    theme: "sunrise",
    palette: { bg: "#1a0820", accent: "#EC4899", text: "#FCE7F3" },
    particles: { color: "#EC4899", count: 140, speed: 0.3 },
    story: `Semester 2 ran parallel to the manuscript. Everything at once.

Scientific Writing — seven lectures on how to write what I was already writing.
Structure of a scientific paper. Journal selection. PRISMA for systematic reviews.
Harvard and IEEE citation standards. Writing strategies for complex results.
The irony of being taught to write while struggling to write was not lost on me.

AI & Large Models — a full course on the tools I was already using.
I built the CLIMATE-XFER project here. Domain adaptation for climate data.
It sharpened my understanding of what AI tools actually do versus what I wished they did.

Intelligent Processing of Remote Sensing Images —
SLIC superpixels, Random Forest classification, Segment Anything Model (SAM).
The lab sessions ran directly into my SIF processing pipeline.

Team Project (HyPlant) —
an airborne hyperspectral SIF study alongside classmates.
Cohen's d of 1.0–6.7 across drought-stressed zones.
A parallel SIF story that sharpened my intuitions for the main manuscript.

Five courses. One manuscript in progress. Weekly supervisor meetings.
The schedule was not comfortable. That was the point.`,
    milestone: "Semester 2 complete — parallel SIF work in HyPlant + Scientific Writing"
  },
  {
    id: 8,
    slug: "supervisors",
    title: "The Supervisors",
    subtitle: "Weekly Meetings · The Feedback Loop",
    theme: "professional",
    palette: { bg: "#0a1520", accent: "#60A5FA", text: "#EFF6FF" },
    particles: { color: "#60A5FA", count: 100, speed: 0.2 },
    story: `Every week. Same time. Same Zoom room.

My supervisor — Prof. Feng — does not soften feedback.
This is the right approach.

The Methods section went through four complete revisions.
Not because it was wrong, but because defensible and technically correct
are two different things at publication level.

His comments on spatial scale were the same as my meta-weakness:
"You are reporting a relationship. You are not explaining why it exists at this scale."

The revisions taught me more than the original writing.

Iteration 1 — Methods structured around data sources.
Iteration 2 — Methods restructured around analytical questions.
Iteration 3 — Statistical framework formalised. Notation stabilised.
Iteration 4 — Limitation section expanded to actively constrain conclusions.

Each meeting started with a sinking feeling and ended with a cleaner manuscript.
Over time, the sinking feeling arrived later and later in the meeting.
That is progress.`,
    milestone: "4 Methods revisions · Notation stabilised · Framework peer-hardened"
  },
  {
    id: 9,
    slug: "manuscript",
    title: "The Manuscript",
    subtitle: "Results, Figures, Iteration",
    theme: "data",
    palette: { bg: "#0f1a0a", accent: "#22C55E", text: "#F0FDF4" },
    particles: { color: "#22C55E", count: 190, speed: 0.4 },
    story: `The results came slowly, then all at once.

The SIF signal drop during Cyclone Idai's landfall (March 2019) —
visible at the 1° × 1° footprint scale, invisible at country level.
That one figure anchored the whole spatial aggregation argument.

Cyclone Freddy (2023) showed the longest recovery trajectory.
14 weeks before SIF returned to pre-event baseline in the Sofala coastal zone.
NDVI recovered in 6. The physiological lag is real and measurable.

Rainfall timing analysis (CHIRPS × cyclone calendar) showed
that storms hitting during peak growing season cause SIF depressions
2.3× deeper than off-season events. Same wind speed. Different biological state.

The ecoregion analysis separated miombo woodland (fast recovery)
from coastal lowland forest (slow, sometimes non-recovery).
Not a single response curve — a family of curves.

Claude Code wrote the processing pipeline: TROPOSIF extraction,
footprint masking, CHIRPS integration, figure generation.
Six Python scripts. Every figure in the paper came from this pipeline.

The manuscript exists. It is being refined.
It is not finished. It is being made attack-resistant.`,
    milestone: "Core results confirmed — manuscript in revision phase"
  },
  {
    id: 10,
    slug: "road-ahead",
    title: "The Road Ahead",
    subtitle: "July 2026 Submission · Final Year · What Comes Next",
    theme: "horizon",
    palette: { bg: "#020f1a", accent: "#F0ABFC", text: "#FAF5FF" },
    particles: { color: "#F0ABFC", count: 160, speed: 0.25 },
    story: `July 2026.
Target submission to the International Journal of Applied Earth Observation
and Geoinformation.

The manuscript will be submitted when it is attack-resistant —
not when it feels perfect.

After submission, the second manuscript begins.
Spatial-temporal modelling of SIF recovery trajectories.
The first paper asks: what does cyclone impact look like in SIF?
The second asks: how long does it take to recover, and what predicts that?

Integration with Sentinel-1 SAR data is planned —
structural damage alongside physiological signal.
A more complete picture of what a cyclone actually does to a forest.

The final year is also about proving that one honest, rigorous,
attack-resistant paper is worth more than three safe ones.

I came from Zimbabwe with a question.
I am building the answer here, one iteration at a time.

The road is long. The signal is real.
And I have learned — slowly, with help —
that exposing unfinished work to criticism is not weakness.
It is the method.`,
    milestone: "July 2026 submission → Final year → Second manuscript"
  }
];
