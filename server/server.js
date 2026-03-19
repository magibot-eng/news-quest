const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3457;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// ─── CATEGORIES ───────────────────────────────────────────────────────────
const categories = [
  { id: 1, name: 'Tech',     emoji: '💻', color: '#00d4ff' },
  { id: 2, name: 'World',    emoji: '🌍', color: '#ff6b6b' },
  { id: 3, name: 'Business', emoji: '💼', color: '#ffd700' },
  { id: 4, name: 'Sports',   emoji: '⚽', color: '#2ecc71' },
  { id: 5, name: 'Science',  emoji: '🔬', color: '#9b59b6' },
];

// ─── MOCK NEWS DATA ─────────────────────────────────────────────────────────
// Realistic, interesting headlines from late March 2026
const mockNews = {
  1: [ // Tech
    {
      id: 't1',
      headline: 'OpenAI Unveils GPT-5 with Breakthrough Logical Reasoning',
      teaser: 'The new model scores 40% higher on complex multi-step reasoning benchmarks, rivaling human experts in math and code generation.',
      source: 'The Verge',
      time: '1h ago',
      url: 'https://www.theverge.com'
    },
    {
      id: 't2',
      headline: 'Apple Vision Pro 2 Leaks: 30% Lighter, 18-Hour Battery',
      teaser: 'Supply chain documents reveal a major redesign with improved weight distribution and an external battery that lasts all day.',
      source: 'MacRumors',
      time: '3h ago',
      url: 'https://www.macrumors.com'
    },
    {
      id: 't3',
      headline: 'SpaceX Starship Completes First Full Orbital Mission',
      teaser: 'After four test flights, Starship successfully orbited Earth, deployed satellites, and returned to the launch site for a precision landing.',
      source: 'Ars Technica',
      time: '6h ago',
      url: 'https://arstechnica.com'
    },
    {
      id: 't4',
      headline: 'Google DeepMind\'s AlphaFold 3 Cracks Protein-Drug Interaction',
      teaser: 'Researchers can now predict how potential medicines bind to proteins with near-perfect accuracy, dramatically accelerating drug discovery.',
      source: 'MIT Technology Review',
      time: '8h ago',
      url: 'https://technologyreview.com'
    },
    {
      id: 't5',
      headline: 'Tesla Robotaxi Fleet Begins Driverless Rides in Austin',
      teaser: 'The Austin pilot zone covers 50 square miles with 200 vehicles. Musk calls it "the beginning of the end for car ownership."',
      source: 'Electrek',
      time: '10h ago',
      url: 'https://electrek.co'
    },
    {
      id: 't6',
      headline: 'Meta Releases Open-Source Llama 4 with 1 Trillion Parameters',
      teaser: 'The largest open-weight model to date matches GPT-5 on most benchmarks and runs on consumer hardware with quantized versions.',
      source: 'TechCrunch',
      time: '12h ago',
      url: 'https://techcrunch.com'
    },
  ],
  2: [ // World
    {
      id: 'w1',
      headline: 'G7 Leaders Agree on Historic AI Governance Framework',
      teaser: 'The first international treaty on artificial intelligence sets binding rules for military AI, deepfake disclosure, and algorithmic accountability.',
      source: 'Reuters',
      time: '2h ago',
      url: 'https://www.reuters.com'
    },
    {
      id: 'w2',
      headline: 'China-Taiwan Tensions Ease After Trade Agreement Signed',
      teaser: 'A surprise semiconductor trade deal reduces export restrictions on both sides, marking the first diplomatic thaw in three years.',
      source: 'BBC News',
      time: '4h ago',
      url: 'https://www.bbc.com/news'
    },
    {
      id: 'w3',
      headline: 'European Union Passes World\'s First Comprehensive Crypto Regulation',
      teaser: 'The MiCA framework forces stablecoin issuers to hold 1:1 reserves in Europe and bans algorithmic stablecoins entirely.',
      source: 'Financial Times',
      time: '7h ago',
      url: 'https://www.ft.com'
    },
    {
      id: 'w4',
      headline: 'India Surpasses China as World\'s Largest Economy by PPP',
      teaser: 'IMF data confirms India\'s purchasing power parity GDP crossed $23 trillion, edging past China for the first time in modern history.',
      source: 'The Economist',
      time: '9h ago',
      url: 'https://www.economist.com'
    },
    {
      id: 'w5',
      headline: 'Ukraine Reconstruction Bonds Raise $50B at Record Low Rates',
      teaser: 'Global investors show unprecedented confidence in Ukraine\'s recovery, with bonds oversubscribed 4x at near-zero yields.',
      source: 'Bloomberg',
      time: '11h ago',
      url: 'https://www.bloomberg.com'
    },
    {
      id: 'w6',
      headline: 'Arctic Sea Ice Hits Record Low for March Third Year Running',
      teaser: 'Scientists warn the Arctic may see its first ice-free summer by 2030 as polar temperatures continue to rise at twice the global average.',
      source: 'The Guardian',
      time: '14h ago',
      url: 'https://www.theguardian.com'
    },
  ],
  3: [ // Business
    {
      id: 'b1',
      headline: 'Fed Holds Rates Steady, Signals Two Cuts in Second Half of 2026',
      teaser: 'Jerome Powell cited cooling inflation and labor market stability, sending the S&P 500 up 1.8% in after-hours trading.',
      source: 'Wall Street Journal',
      time: '1h ago',
      url: 'https://www.wsj.com'
    },
    {
      id: 'b2',
      headline: 'Nvidia Surpasses $4 Trillion Market Cap on Data Center Boom',
      teaser: 'The chipmaker briefly became the most valuable company in history, driven by insatiable demand for H200 and Blackwell GPUs.',
      source: 'Bloomberg',
      time: '3h ago',
      url: 'https://www.bloomberg.com'
    },
    {
      id: 'b3',
      headline: 'Amazon Acquires Grocery Chain Whole Foods for Second Time',
      teaser: 'In a surprise move, Amazon re-acquires Whole Foods from Apollo Global at a 15% premium, reversing the 2025 divestiture.',
      source: 'CNBC',
      time: '5h ago',
      url: 'https://www.cnbc.com'
    },
    {
      id: 'b4',
      headline: 'TikTok US Revenue Hits $50B, Surpassing YouTube and Netflix',
      teaser: 'ByteDance\'s ad revenue in the US grew 60% YoY, driven by live shopping features that generated $12B in Q1 alone.',
      source: 'Business Insider',
      time: '8h ago',
      url: 'https://www.businessinsider.com'
    },
    {
      id: 'b5',
      headline: 'Startup Unicorn Retro Biosciences Valued at $5B After Series C',
      teaser: 'The longevity startup, founded by Sam Altman, announces results from its senolytics human trial showing 25% reduction in biological age markers.',
      source: 'Forbes',
      time: '10h ago',
      url: 'https://www.forbes.com'
    },
    {
      id: 'b6',
      headline: 'Walmart Announces Plan to Replace 30% of Store Staff with Robots',
      teaser: 'The retail giant will deploy autonomous restocking and checkout systems across 2,000 US locations by end of 2027.',
      source: 'Associated Press',
      time: '13h ago',
      url: 'https://apnews.com'
    },
  ],
  4: [ // Sports
    {
      id: 's1',
      headline: 'Champions League: Real Madrid Eliminated by Arsenal in Quarters',
      teaser: 'A 4-1 rout at the Bernabeu sends Arsenal through to the semi-finals for the first time since 2009. Bukayo Saka scores twice.',
      source: 'ESPN',
      time: '1h ago',
      url: 'https://www.espn.com'
    },
    {
      id: 's2',
      headline: 'NBA: Victor Wembanyama Drops 60 Points in Historic Performance',
      teaser: 'The Spurs star becomes the youngest player ever to score 60, hitting 8 three-pointers in a 132-128 overtime win over the Nuggets.',
      source: 'The Athletic',
      time: '3h ago',
      url: 'https://theathletic.com'
    },
    {
      id: 's3',
      headline: 'F1: McLaren Unveils Revolutionary Active Aero System for 2026',
      teaser: 'The MCL40 generates downforce without drag penalty at high speed, potentially solving F1\'s oldest aerodynamic trade-off.',
      source: 'Motorsport.com',
      time: '6h ago',
      url: 'https://www.motorsport.com'
    },
    {
      id: 's4',
      headline: 'Olympics 2028: Los Angeles Adds Breakdancing and Flag Football',
      teaser: 'The LA28 organizing committee confirms the return of some skateboarding events and introduces two new sports targeting Gen Z viewers.',
      source: 'Sports Illustrated',
      time: '9h ago',
      url: 'https://www.si.com'
    },
    {
      id: 's5',
      headline: 'Tennis: Jannik Sinner Receives 6-Month Doping Suspension',
      teaser: 'The world No. 1 accepted a reduced ban after trace amounts of a prohibited substance were found in a contaminated supplement.',
      source: 'BBC Sport',
      time: '11h ago',
      url: 'https://www.bbc.com/sport'
    },
    {
      id: 's6',
      headline: 'NFL Draft: Travis Hunter Selected First Overall by Jacksonville',
      teaser: 'The two-way Heisman winner goes to the Jaguars, who traded up with Cleveland to secure the most versatile athlete in draft history.',
      source: 'NFL.com',
      time: '14h ago',
      url: 'https://www.nfl.com/news'
    },
  ],
  5: [ // Science
    {
      id: 'sc1',
      headline: 'NASA\'s Europa Clipper Detects Complex Organic Molecules',
      teaser: 'Spectroscopic analysis reveals amino acid precursors in Europa\'s subsurface ocean plumes — the strongest evidence yet for potential life.',
      source: 'NASA JPL',
      time: '2h ago',
      url: 'https://www.jpl.nasa.gov'
    },
    {
      id: 'sc2',
      headline: 'CERN Confirms Discovery of Fifth Fundamental Force',
      teaser: 'The anomalies seen in B-meson decays have been confirmed at 5.2 sigma. A new boson, the "X5," may mediate a force beyond the Standard Model.',
      source: 'Nature',
      time: '5h ago',
      url: 'https://www.nature.com'
    },
    {
      id: 'sc3',
      headline: 'First Pig-to-Human Liver Transplant Patient Discharged',
      teaser: 'The 58-year-old patient left the hospital 12 days after receiving a genetically modified pig liver, a milestone in xenotransplantation.',
      source: 'New England Journal of Medicine',
      time: '8h ago',
      url: 'https://www.nejm.org'
    },
    {
      id: 'sc4',
      headline: 'Quantum Computer Achieves Error Correction Threshold',
      teaser: 'Google\'s Willow-2 chip demonstrated fault-tolerant quantum computing for the first time, running for 10 minutes without a single uncorrected error.',
      source: 'Science Magazine',
      time: '10h ago',
      url: 'https://www.science.org'
    },
    {
      id: 'sc5',
      headline: 'Microplastics Found in Previously Pristine Deep Ocean Trenches',
      teaser: 'Researchers discovered plastic fragments in the Mariana Trench at depths previously thought to be too remote for human contamination.',
      source: 'Nature Geoscience',
      time: '12h ago',
      url: 'https://www.nature.com/natgeoscience'
    },
    {
      id: 'sc6',
      headline: 'New Alzheimer\'s Drug Shows 40% Slowing of Cognitive Decline',
      teaser: 'Eli Lilly\'s donanemab follow-on drug, remternetug, showed dramatic results in Phase 3 trials with minimal amyloid-related imaging abnormalities.',
      source: 'The Lancet',
      time: '15h ago',
      url: 'https://www.thelancet.com'
    },
  ],
};

// ─── FULL SUMMARIES (for when user clicks a card) ───────────────────────────
const summaries = {
  t1: {
    summary: 'OpenAI has officially released GPT-5, marking what CEO Sam Altman calls "the most significant leap in AI reasoning since GPT-2." The model was trained on a novel architecture combining chain-of-thought reasoning with a massive world model, enabling it to solve graduate-level math problems, write production-quality code, and engage in multi-hour complex planning tasks.\n\nKey improvements over GPT-4o include a 40% boost on MATH benchmark (scoring 98.3%), the ability to maintain context across 1 million tokens, and multimodal reasoning that can analyze entire codebases in seconds. The model is available now in ChatGPT Plus and via API.\n\nCritics note it still hallucinates on niche topics, but OpenAI says "agentic reasoning" features — where the model can use tools and execute long-running tasks autonomously — make this release transformative for enterprise use cases.',
    url: 'https://www.theverge.com'
  },
  t2: {
    summary: 'Supply chain sources and leaked internal Apple documents obtained by MacRumors reveal that Vision Pro 2 is slated for a Q3 2026 release with sweeping hardware improvements. The most dramatic change: a redesigned external battery pack that bumps endurance from 2 hours to a full 18-hour continuous use.\n\nWeight reduction comes from a new magnesium-aluminum alloy chassis and micro-OLED panels that are 40% more efficient, allowing a smaller internal battery. The front glass is 25% thinner and uses the same grade as iPhone 16 Ceramic Shield.\n\nApple is also reportedly adding a neural interface collar — non-invasive EEG sensors in the headband — that can detect focus states and auto-pause content when the user is distracted. The device will still retail at $3,499 for the 512GB model.',
    url: 'https://www.macrumors.com'
  },
  t3: {
    summary: 'SpaceX achieved a historic milestone today when Starship Serial 15 completed the first full orbital mission. Launching at 6:00 AM CST from Starbase, Texas, the 400-foot rocket executed a nominal ascent, deployed three dummy Starlink satellites in low Earth orbit, performed a deorbit burn, and landed vertically at the original launch site — all within 90 minutes.\n\n"This is the moment space travel changes forever," Musk said at the post-flight press conference. "A fully reusable orbital class vehicle that can fly multiple times per day." Starship is now certified for commercial payload missions, with NASA\'s Artemis lunar lander contract secured for 2027.\n\nThe FAA has already issued a commercial launch license for the next Starship flight, scheduled in two weeks, which will attempt to catch the Super Heavy booster with the mechazilla tower arms.',
    url: 'https://arstechnica.com'
  },
  t4: {
    summary: 'Google DeepMind published results in Nature showing AlphaFold 3 can predict how drug molecules bind to target proteins with 94% accuracy — a critical step in computational drug design. The model was trained on a dataset of 10 million protein-ligand complexes, five times larger than AlphaFold 2\'s training set.\n\nResearchers at University of California San Francisco used AlphaFold 3 to identify a novel binding site on the KRAS oncogene, a historically "undruggable" target implicated in 30% of all cancers. A candidate drug is now in preclinical trials.\n\n"This changes the economics of drug discovery fundamentally," said DeepMind CEO Demis Hassabis. "What used to take years and hundreds of millions of dollars can now be done in weeks on a single GPU."',
    url: 'https://technologyreview.com'
  },
  t5: {
    summary: 'Tesla officially launched its robotaxi service in Austin today, marking the first time a major automaker has deployed fully driverless vehicles for public rides in the US. The service, branded "Cybercab," operates 200 vehicles within a 50-square-mile zone covering downtown, the airport, and major tech campuses.\n\nRiders request a ride through the Tesla app, and a Cybercab arrives within 5-10 minutes. The company says fares are 40% cheaper than Uber\'s equivalent rides. Safety drivers were present in the first 10 vehicles during the pilot, but those have now been removed after the Austin city council approved the commercial license.\n\nCEO Elon Musk said the Austin launch is "just the beginning," with Los Angeles, Miami, and Dallas planned for Q3 2026.',
    url: 'https://electrek.co'
  },
  t6: {
    summary: 'Meta released Llama 4 over the weekend with model sizes ranging from 8B to an unprecedented 1 trillion parameters. The flagship model, Llama 4-Ultra, matches or exceeds GPT-5 on 18 of 23 industry benchmarks, according to Meta\'s technical report.\n\nThe most significant development is that Meta is releasing the weights under a permissive commercial license, allowing any company to fine-tune and deploy the model without royalty fees. Quantized versions run at fp16 on consumer GPUs with 24GB VRAM.\n\n"Open source AI is now ahead of closed models," said Chief Scientist Yann LeCun. "This is the final nail in the closed AI coffin." Llama 4 is available immediately through Meta\'s API and as a HuggingFace download.',
    url: 'https://techcrunch.com'
  },
  w1: {
    summary: 'G7 leaders meeting in Tokyo signed the world\'s first binding international treaty on artificial intelligence governance. The accord, called the "Tokyo AI Framework," creates three tiers of AI systems: unrestricted, regulated, and prohibited.\n\nMilitary AI systems that make lethal autonomous decisions are classified as prohibited. Deepfakes in political advertising and AI-generated content used for mass manipulation are also banned. Tech companies with AI systems used by more than 10 million people must submit to annual audits.\n\nThe treaty has binding enforcement mechanisms including trade sanctions for non-compliant nations. China was invited as an observer but did not sign. US President signed with caveats, noting the framework "preserves American AI leadership while addressing legitimate harms."',
    url: 'https://www.reuters.com'
  },
  w2: {
    summary: 'In a surprise diplomatic development, China and Taiwan signed a semiconductor trade agreement in Singapore that marks the first formal diplomatic contact between the two sides in three years. The deal eases export restrictions on advanced chips, allowing TSMC to resume shipments of 3nm and below process chips to certain Chinese firms.\n\nTaiwan\'s representative called it "a gesture of goodwill toward peace." Beijing said the agreement "reflects the one-China principle in action." The deal was brokered by Singapore and the US, which pressed both sides to reduce tensions following a near-military incident in the Taiwan Strait in February.\n\nAnalysts note the agreement is largely symbolic — most of the eased restrictions were already circumvented through third countries — but the diplomatic thaw is significant.',
    url: 'https://www.bbc.com/news'
  },
  w3: {
    summary: 'The European Parliament voted 521-38 to pass the Markets in Crypto-Assets Regulation II, the most comprehensive cryptocurrency legislation ever enacted. The law requires stablecoin issuers like Tether and Circle to maintain 1:1 reserves held in EU-regulated banks, and mandates quarterly audits.\n\nAlgorithmic stablecoins — tokens that maintain value through algorithms rather than reserves — are banned entirely, effective immediately. The EU also established a new European Crypto-Assets Authority (ECAA) to oversee digital asset markets.\n\nIndustry groups warned the regulation could push stablecoin activity offshore, while financial regulators hailed it as finally bringing "the same rigor to crypto as to equities and bonds." The law takes effect in January 2027.',
    url: 'https://www.ft.com'
  },
  w4: {
    summary: 'The International Monetary Fund\'s latest World Economic Outlook update places India\'s purchasing power parity GDP at $23.1 trillion, surpassing China\'s $22.9 trillion for the first time. This makes India the world\'s largest economy by PPP — a metric economists use to compare living standards across countries.\n\nIndia\'s economy grew 8.4% in FY2025-26, driven by a domestic consumption boom, record-high manufacturing investment, and a services sector that now employs 35 million people. India\'s median age of 28 compared to China\'s 40 also signals decades of demographic dividend ahead.\n\nNominal GDP — the metric most used for market size — still shows China at $18.2 trillion vs India\'s $4.1 trillion, so the PPP milestone is symbolic but signals a profound demographic and economic shift.',
    url: 'https://www.economist.com'
  },
  w5: {
    summary: 'Ukraine successfully issued $50 billion in reconstruction bonds at a remarkable 0.8% yield — a rate typically reserved for Germany and the US. The bonds, denominated in euros, dollars, and a new Ukraine-hryvnia hybrid, were oversubscribed 4.2x, attracting $210 billion in orders.\n\nThe European Union guaranteed 60% of the bonds, with the US, UK, and Japan providing political risk insurance for the remainder. Proceeds will fund infrastructure reconstruction in six priority sectors: energy grids, railways, port modernization, housing, water systems, and telecommunications.\n\n"This is a vote of confidence in Ukraine\'s future," said Ukrainian Finance Minister. "Investors are saying Ukraine will win, Ukraine will rebuild, and Ukraine will be integrated into Europe."',
    url: 'https://www.bloomberg.com'
  },
  w6: {
    summary: 'Scientists from the Alfred Wegener Institute reported that Arctic sea ice extent in March 2026 hit a record low for the third consecutive year, measuring just 13.4 million square kilometers — 1.2 million below the previous record and 2.8 million below the 1981-2010 average.\n\nOcean heat content in the Arctic was measured at 400% above 1990 levels, and the Greenland Ice Sheet experienced its earliest melt onset date ever recorded — February 28th. Permafrost thaw is releasing methane at rates 30% above previous projections.\n\n"We are tracking toward an ice-free September in the early 2030s," said lead researcher Dr. Heike Lange. "Once the summer ice is gone, the Arctic will warm at twice the current rate, accelerating impacts globally."',
    url: 'https://www.theguardian.com'
  },
  b1: {
    summary: 'The Federal Reserve held its benchmark interest rate at 4.25-4.50% for the third consecutive meeting, but Chair Jerome Powell\'s press conference signaled a pivot. "The committee is increasingly confident that inflation is moving sustainably toward our 2% target," Powell said.\n\nFed projections now show two quarter-point cuts in Q3 and Q4 2026, bringing rates to 3.75-4.00% by year-end. Markets had priced in just one cut, so the dovish surprise sent equities surging. The S&P 500 gained 1.8% in after-hours trading, while the 10-year Treasury yield fell 12 basis points.\n\nPowell emphasized the labor market remains "solid without being overheated," with unemployment at 4.1% and wage growth at 3.2% — both consistent with a soft landing.',
    url: 'https://www.wsj.com'
  },
  b2: {
    summary: 'Nvidia briefly surpassed $4 trillion in market capitalization today, making it the most valuable company in recorded history. The milestone came after the company reported data center revenue of $52.3 billion in Q1 2026 — up 140% year-over-year — driven by insatiable demand for H200 and the newly released Blackwell GPU architecture.\n\nMicrosoft, Apple, Amazon, and Google collectively purchased 65% of Nvidia\'s output for their cloud AI infrastructure. The H200 remains on 9-month lead times despite tripling production capacity at TSMC\'s Arizona fab.\n\nAnalysts at Goldman Sachs raised their 12-month Nvidia price target to $1,100, arguing the AI infrastructure buildout is "still in its early innings" despite the company\'s already massive scale.',
    url: 'https://www.bloomberg.com'
  },
  b3: {
    summary: 'Amazon announced it has re-acquired Whole Foods Market from Apollo Global Management for $14.2 billion, reversing the 2025 spin-off that saw Apollo take the grocery chain private. The buyback price represents a 15% premium to Apollo\'s last valuation.\n\nThe reversal comes as Amazon seeks to re-accelerate its physical retail presence. CEO Andy Jassy said Amazon will invest $8 billion over three years to remodel Whole Foods stores with "Just Walk Out" technology and drone delivery capabilities.\n\nWhole Foods, which operates 530 stores, will become the anchor of Amazon\'s grocery strategy alongside its Amazon Fresh chain, which the company has said will also be absorbed into the Whole Foods brand.',
    url: 'https://www.cnbc.com'
  },
  b4: {
    summary: 'TikTok\'s US advertising revenue reached $50.4 billion in 2025, surpassing YouTube\'s $42.8B and Netflix\'s $38.2B for the first time, according to figures shared by ByteDance ahead of its IPO filing. The growth was driven primarily by live shopping features, which generated $12.1B in Q1 2026 alone.\n\nTikTok Shop, which allows users to buy products directly within the app, has grown to 80 million monthly active buyers in the US — up from 20 million in early 2025. The average order value of $78 is nearly double that of Amazon.\n\nByteDance is rumored to be targeting a $300 billion valuation in its upcoming IPO, with SoftBank and Sequoia as anchor investors.',
    url: 'https://www.businessinsider.com'
  },
  b5: {
    summary: 'Longevity startup Retro Biosciences, founded with $500M from Sam Altman, announced a $2B Series C at a $5B valuation. The round was led by Founders Fund and Sequoia Capital.\n\nThe company published results from its 200-person senolytics trial showing participants who received a combination of dasatinib and quercetin, plus a proprietary fibroblast growth factor cocktail, showed a 25% reduction in epigenetic age markers measured by Horvath\'s clock.\n\n"What we\'re seeing is not just slowing aging — we\'re seeing biological age reversal," said CEO Sam Altman. "We believe 20 years of healthy life extension is achievable within this decade." Phase 3 trials are planned for 2027 across 15 sites in 6 countries.',
    url: 'https://www.forbes.com'
  },
  b6: {
    summary: 'Walmart unveiled its "Project Atlas" plan to deploy autonomous systems across 2,000 US locations by the end of 2027, potentially replacing 30% of its store workforce. The $18B initiative includes robotic stockers, AI-powered checkout systems, and autonomous delivery robots for online orders.\n\nThe announcement sent Walmart shares up 4% but drew immediate criticism from labor unions. UFCW president Chelsea Harrison called it "the largest retail layoff scheme in American history."\n\nWalmart said it plans to retrain displaced workers for roles in e-commerce fulfillment and robot maintenance, with a $500M workforce development fund. The company employs 1.6 million people in the US, meaning up to 480,000 roles could be affected.',
    url: 'https://apnews.com'
  },
  s1: {
    summary: 'Arsenal completed a stunning 4-1 comeback victory at the Santiago Bernabeu, eliminating 15-time champions Real Madrid from the Champions League. Bukayo Saka was instrumental, scoring twice and setting up Gabriel Martinelli\'s equalizer.\n\nReal Madrid took a 1-0 lead through Vinicius Jr.\'s penalty in the 23rd minute. Arsenal equalized before halftime through Saka\'s long-range strike, then scored three more in 12 second-half minutes to silence the 80,000-strong home crowd.\n\nThis marks Arsenal\'s first Champions League semi-final since 2009, when they lost to Manchester United. The Gunners will face Inter Milan in the last four, with the first leg at the Emirates in 10 days.',
    url: 'https://www.espn.com'
  },
  s2: {
    summary: 'Spurs forward Victor Wembanyama delivered one of the greatest individual performances in NBA history, scoring 60 points in an overtime victory over the Denver Nuggets. The 7\'4" Frenchman shot 22-of-38 from the field, including 8-of-16 from three-point range, and added 12 rebounds and 6 blocks.\n\nThe 60-point game is the most in the NBA since Damian Lillard\'s 71 in 2023 and makes Wembanyama the youngest player ever to reach 60. "I was just in the zone," Wembanyama said postgame. "The ball felt like it was the size of a beach ball."\n\nThe Spurs, now 42-28 on the season, moved into second place in the Western Conference with the win. Nikola Jokic finished with 34 points, 15 rebounds, and 12 assists in a losing effort.',
    url: 'https://theathletic.com'
  },
  s3: {
    summary: 'McLaren unveiled the MCL40 ahead of the 2026 Formula 1 season with a revolutionary "Morphing Aero" system — active aerodynamic surfaces that adjust 400 times per second based on track conditions, sensor data, and AI predictions of upcoming corners.\n\nThe system, developed in partnership with the UK\'s Advanced Research Projects Agency, eliminates the traditional downforce-drag trade-off. At high speed on straights, the wings flatten to minimize drag. In corners, they reposition for maximum downforce in under 5 milliseconds.\n\nTeam principal Andrea Stella called it "a paradigm shift as significant as ground effect was in the 1970s." The MCL40 will debut at the Bahrain Grand Prix in March.',
    url: 'https://www.motorsport.com'
  },
  s4: {
    summary: 'The LA28 organizing committee confirmed the return of skateboarding, sport climbing, and surfing — the three sports added for Tokyo 2020 — and added breakdancing (breaking) and flag football to the Olympic program. The decisions were made to attract younger audiences, with 65% of Olympic viewers now under 35.\n\nFlag football, played with a 5-player format and soft-contact rules, will feature 16 men\'s and 16 women\'s teams. Breaking will hold its second Olympic Games after debuting in Paris 2024, where Korean breaker Ryu "Phil" Seo became a global star.\n\nTrack and field, swimming, and gymnastics remain the backbone of the Games, with LA28 adding no new sports to those core categories.',
    url: 'https://www.si.com'
  },
  s5: {
    summary: 'World No. 1 tennis player Jannik Sinner accepted a six-month suspension from the International Tennis Integrity Agency after trace amounts of a prohibited substance were found in a supplement he was taking for a wrist injury. The substance, clostebol, was listed on the product label but at a concentration that triggered a positive test.\n\nSinner, 24, has maintained his innocence throughout, and the ITIA accepted that there was "no intentional wrongdoing." The sanction was reduced from the standard two years to six months under the athlete whereabouts program cooperation provisions.\n\nSinner will miss the French Open but will be eligible to return for Wimbledon. "I will use this time to come back stronger," he said in a statement. "I have never cheated and never would."',
    url: 'https://www.bbc.com/sport'
  },
  s6: {
    summary: 'In one of the most anticipated NFL Drafts in years, the Jacksonville Jaguars selected cornerback-wide receiver Travis Hunter with the first overall pick, trading up from their original No. 5 position. The move cost Jacksonville two future first-round picks and a 2026 third-rounder.\n\nHunter won the Heisman Trophy as the best player in college football while also playing every snap at cornerback for Colorado — a feat unprecedented in modern football. At the NFL Combine, he ran a 4.38 40-yard dash and recorded 4 interceptions in positional drills.\n\nThe Jaguars immediately named Hunter a "full-time two-way player," giving him separate offensive and defensive playbooks. He is expected to play 80+ snaps per game in a role similar to his college usage.',
    url: 'https://www.nfl.com/news'
  },
  sc1: {
    summary: 'NASA\'s Europa Clipper spacecraft, currently orbiting Jupiter, has detected complex organic molecules — including what appear to be amino acid precursors — in material ejected from cracks in Europa\'s ice shell. The findings, presented at the American Geophysical Union meeting, represent the strongest evidence yet that Europa\'s subsurface ocean could harbor life.\n\nThe molecules were identified using the spacecraft\'s mass spectrometer, which sampled plumes of water vapor that erupt from Europa\'s surface. "We are seeing carbon, nitrogen, oxygen, and hydrogen in forms consistent with biological processes," said Dr. Kevin Hand of JPL.\n\nThe detection does not confirm life — these molecules can form through non-biological chemistry — but it confirms Europa has the chemical building blocks and liquid water environment that life would need. A dedicated Europa lander mission is now the top priority of the Planetary Science Decadal Survey.',
    url: 'https://www.jpl.nasa.gov'
  },
  sc2: {
    summary: 'CERN announced confirmation of a fifth fundamental force at 5.2 sigma statistical significance — the threshold for definitive discovery in physics. The X5 boson, detected in decays of B-mesons, appears to mediate an interaction that does not fit the electromagnetic, strong, weak, or gravitational frameworks.\n\nThe discovery was made using the Large Hadron Collider\'s upgraded Run 4 configuration, which achieves collision energies of 18 TeV. The X5 boson has a mass of approximately 850 MeV and interacts with quarks in a pattern inconsistent with any known force.\n\n"This could be the first glimpse of a \'dark sector\' that connects our universe to hidden dimensions," said CERN Director-General. "We are being very cautious, but the data is unambiguous."',
    url: 'https://www.nature.com'
  },
  sc3: {
    summary: 'A 58-year-old woman named Ms. Liu became the first person to receive a genetically modified pig liver and leave the hospital. The 12-day transplant, performed at Duke University Medical Center, used a liver from a pig engineered by eGenesis with 69 genetic modifications — including the removal of all porcine endogenous retroviruses.\n\nThe liver, which functioned normally throughout the hospital stay, was kept as a "bridge" while Ms. Liu waited for a human donor. Her own liver, damaged by cirrhosis, is expected to recover sufficiently that a full transplant may not be needed.\n\n"This is a proof of concept," said lead surgeon Dr. Andrew Cameron. "A pig can sustain a human life for days or weeks. We now need to study what happens over months." Five more patients are enrolled in the Phase 1 trial.',
    url: 'https://www.nejm.org'
  },
  sc4: {
    summary: 'Google Quantum AI published results showing its Willow-2 processor achieved fault-tolerant quantum computing for the first time — maintaining coherence for 10 continuous minutes without a single uncorrected error across 1,000 logical qubits.\n\nPrevious quantum computers could maintain coherence for milliseconds at best, making long computations impossible. Willow-2 uses a novel error correction scheme that detects and fixes errors faster than they accumulate, breaking the "error correction threshold" problem that has plagued quantum computing for 30 years.\n\n"Today we demonstrate that scalable, fault-tolerant quantum computing is not just theoretically possible — it\'s practically achievable," said Google Quantum AI lead Hartmut Neven. The achievement enables algorithms that were previously impossible, including full simulation of protein folding dynamics.',
    url: 'https://www.science.org'
  },
  sc5: {
    summary: 'A deep-sea expedition to the Mariana Trench found microplastic particles at the Sirena Deep — 10,700 meters below sea level — in concentrations comparable to surface ocean gyres. The discovery, published in Nature Geoscience, suggests there is no "place on Earth immune from plastic contamination.\n\nResearchers used a remotely operated vehicle to collect sediment cores at depths previously considered pristine. They found 2,200 microplastic particles per kilogram of sediment — a number comparable to coastal urban areas. The plastics were predominantly polypropylene and polyethylene, matching packaging materials.\n\n"This is a crisis beneath the crisis," said lead researcher Dr. Jenna Matsuda. "Even organisms living in complete darkness, 11 kilometers below the surface, are ingesting our waste." The study calls for urgent global action on single-use plastics.',
    url: 'https://www.nature.com/natgeoscience'
  },
  sc6: {
    summary: 'Eli Lilly announced Phase 3 trial results for remternetug, a next-generation amyloid-clearing antibody, showing a 40% slowing of cognitive decline in early Alzheimer\'s patients compared to placebo over 18 months. The results, published simultaneously in The Lancet and presented at AD/PD 2026, exceeded analyst expectations.\n\nThe 2,100-patient trial used amyloid PET scans to track plaque clearance. Patients with the highest plaque removal (>70%) showed a 55% slowing of decline. Critically, amyloid-related imaging abnormalities occurred in just 12% of patients, compared to 35% for lecanemab.\n\nEli Lilly has filed for FDA accelerated approval. If granted, remternetug could be available by late 2026 at an estimated annual cost of $28,000.',
    url: 'https://www.thelancet.com'
  },
};

// ─── API ROUTES ─────────────────────────────────────────────────────────────

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/news/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const news = mockNews[categoryId];
  if (!news) return res.status(404).json({ error: 'Category not found' });
  res.json(news);
});

app.get('/api/summary/:newsId', (req, res) => {
  const { newsId } = req.params;
  const summary = summaries[newsId];
  if (!summary) return res.status(404).json({ error: 'Summary not found' });
  res.json(summary);
});

app.get('/api/refresh/:categoryId', async (req, res) => {
  // In production, this would re-fetch news from Brave Search API
  // For MVP, just return fresh mock data with updated timestamps
  const { categoryId } = req.params;
  const news = mockNews[categoryId];
  if (!news) return res.status(404).json({ error: 'Category not found' });

  // Simulate freshness reset - in real impl, would hit Brave Search here
  const fresh = news.map(item => ({
    ...item,
    time: item.time // keep original times for MVP
  }));
  res.json(fresh);
});

app.listen(PORT, () => {
  console.log(`📰 News Quest server running on http://localhost:${PORT}`);
});
