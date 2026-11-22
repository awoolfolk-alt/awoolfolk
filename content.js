/* Shared content for legend.html and every tab page. */
/* ==================================================================
   PART 1: CONTENT
   Why: ALL of your words live here, separate from the code that
   draws the page. To update your portfolio, you only edit this part.
   The same idea will let your Phaser game read the same story later.

   How a quest works:
     prompt = the question you're answering (shows until you write)
     text   = YOUR answer, in first person. Leave it "" until written.
   When "text" has words, the quest is marked CLEAR and counts
   toward the requirement in the Quest Log automatically.
   ================================================================== */

const PROFILE = {
  name: "Andre Woolfolk",
  title: "Developer in training · Future SOC Analyst · i.c.stars C60",
  email: "awoolfolk@icstars.org",
  github: "https://github.com/awoolfolk-alt",
  linkedin: "https://www.linkedin.com/in/andre-woolfolk-335243121/",
  resume: "resume/",            // my resume page (resume/index.html), with a PDF download
  game: "https://awoolfolk-alt.github.io/Andre-legends/" // The Legend of Andre (Phaser game on GitHub Pages)
};

const CHAPTERS = [
  {
    id: "prologue", tag: "PROLOGUE", region: "Forest of Origins", section: "Where I Was",
    accent: "#58c48a",
    intro: "I'm a driven, detail-oriented developer building my skills through i.c.stars, where I'm growing my technical foundation while sharpening the leadership instincts that will define the next stage of my career. As a Black professional in tech, I bring strong problem-solving skills, a commitment to clean, thoughtful code, and a perspective shaped by resilience and the drive to open doors, for myself and for others coming up behind me. Before i.c.stars, I learned my biggest lessons the hard way. In the game, those lessons become the first bosses you face.",
    boss: null,
    groups: [{ min: 0, quests: [
      { title: "The Overload", prompt: "",
        text: "At Nike, I carried the work of two departments. I kept saying yes until I had nothing left. The lesson: <b>set boundaries.</b> In the game, beating The Overload unlocks <i>Leadership Aura</i>." },
      { title: "The Unknown Machine", prompt: "",
        text: "At Empire Cooler, I was supposed to get six months of training and got three. I could have stayed quiet. The lesson: <b>advocate for yourself.</b> In the game, beating The Unknown Machine unlocks <i>Courage Strike</i>." },
      { title: "The Day Before i.c.stars", prompt: "Who were you the day before i.c.stars started? What were you carrying, and what did you want?", text: "I walked into i.c.stars with a Google Cybersecurity Certificate I earned in 2025 while working full time, years of customer service and field experience, and one question: could someone like me build a career protecting people in tech? I didn't have a tech degree, and I didn't see many people who looked like me in the field. I came anyway, because I'd tell any nervous new hire I ever trained that they were more ready than they thought." }
    ]}]
  },

  {
    id: "leadership", tag: "CHAPTER 1 · LEADERSHIP", region: "Leadership Hall", section: "Where I Am",
    accent: "#e8b64a",
    intro: "How I showed up, stepped up, and led, through action, projects, and reflection.",
    groups: [{ min: 5, quests: [
      { title: "Team Week", prompt: "What role did you play on your team? Describe one moment you led, or chose to follow. What would you do differently?", text: "Team Week showed me two things about myself. My relationship skills work well with groups, and my public speaking still needed work. When a few teammates on Team Canary got into a dispute, I realized I didn't yet have the tools to calm it down. So I set a goal for the next 13 weeks: be more proactive with my communication. I practiced my pitch with alumni and staff to break the nerves, and I committed to presenting without saying \"um.\" My first step was simple: speak my mind, with care, in every group conversation." },
      { title: "The Gifts Project: The Ancestors Dinner", wide: true, prompt: "What gift did you find in yourself or someone else? What did you deliver?", text: "<p>My gift to Cycle 60 was the <b>Ancestors Dinner</b>, which I organized with Mariia Kit and RayMond Hall on November 12, 2026. We invited every intern and staff member to bring a dish that represented their ancestors, cultural heritage, or a family tradition, along with the story behind it. Our theme said it best: <i>Many Roots. One Table. One Purpose.</i></p><p>This gift was personal. I was raised by a single mother, and food was something my family truly needed. A full table meant we were taken care of. That's where my connection between food and belonging comes from, and why I've always wanted to bring happiness to the people I love through it. The Ancestors Dinner let me give that same feeling to my cycle.</p><p>Behind the scenes, I sent invitations and reminders to about 45 interns and staff, tracked dishes and dietary needs through a sign-up form, and shared the event in our Cycle 60 group chat. I also wanted to make sure no one stayed home because of cost, so I worked with our staff on a plan: any intern who needed help got a $25 grocery gift card for ingredients, and staff pitched in on decorations like candles, flowers, and food warmers.</p><p>That night, every dish came with a story. People shared memories, wrote cards for our Memory Box, and added beads to a Unity Garland. Staff brought their families, and classmates posted photos in our group chat while we ate. The next morning, people were still talking about what a good time they had and how much they enjoyed hearing each other's stories. Watching my cycle take care of each other through food is exactly what I wanted to give them.</p><p>The Ancestors Dinner is my planetary responsibility in action. To encourage someone is to put courage into them, and sometimes that starts with making sure everyone has a seat at the table.</p><figure class=\"quest-video\"><video controls preload=\"none\" playsinline poster=\"media/ancestor-dinner-poster.jpg\"><source src=\"media/ancestor-dinner-memories.mp4\" type=\"video/mp4\">Your browser does not support video.</video><figcaption>&ldquo;Our Dinner Memories&rdquo; &middot; Video and original music by Mariia Kit</figcaption></figure>", links: [{ label: "Many Roots. One Table. (event page by Mariia Kit)", url: "https://mariiakit-official.github.io/ancestor-dinner/" }] },
      { title: "Community Role: Tech Ecosystem Awareness Lead & Morning Tech Setup", wide: true, prompt: "What was your community role? Name one thing you did that made the cohort better.", text: "<p>At i.c.stars, community roles are about “taking care of home,” asking what gifts we can give and what gaps we can fill. I took on two kinds of responsibility for Cycle 60.</p><p><b>Connecting my cycle to Chicago's tech community.</b> As our Tech Ecosystem Awareness Lead, I watched the city's tech scene for events worth our time and brought them back to the cohort. In one post, I shared our upcoming i.c.stars dates alongside four outside events: BurbSec Pilsen, the Chicago Cyber Community Holiday Party, BurbSec South, and an AITP &amp; ISSA cyber crisis tabletop exercise. I gave credit to a classmate who found one of them, and invited everyone to ride over together after our Ancestors Dinner. My cohort responded with hearts and salutes, and our Program Director shared it too. I wanted my classmates to know their network extends far beyond the 20 people in our room, and that the people we meet at these events are the ones we can invite to TechExpo or follow up with after graduation.</p><p><b>Making sure the room was ready.</b> I was also trusted to help set up our studio's technology in the mornings. That meant arriving early, because preparation was the whole job. Before anyone else walked in, I needed to know who we were video-calling that day, connect the camera to the TV, and make sure the microphone was hooked up and working. If a guest ran into technical trouble, it was on me to step in and help. I was nervous the first few times, because if something failed, everyone would notice.</p><p><b>What it taught me.</b> The best tech support is the kind nobody notices: when the camera just works, a guest can focus on sharing their story and my classmates can focus on learning. Being trusted with the room before anyone arrived showed me that reliability is its own form of encouragement. It's also the same mindset I'm bringing to cybersecurity: prepare before the problem, stay calm when something breaks, and keep the systems running so the people who depend on them never have to worry.</p>" },
      { title: "Feedback & Planetary Responsibility", prompt: "Share one piece of feedback that changed how you work. How did you respond, and what did you do after?", text: "At i.c.stars I named my planetary responsibility: <b>to encourage</b>. To me that means putting courage into people so they can take the next step themselves. I do it through five gifts: empathy, confidence, trust, knowledge, and plain-language communication. The hardest lesson behind it came from Nike. I tried to carry a coworker until I burned out, and I learned that encouraging someone means <i>helping them stand, not carrying them forever</i>." },
      { title: "Tea Host", prompt: "Who was your Tea Guest (role or industry)? How did you prepare? What stuck with you?", text: "<p>As a Tea Host, I welcomed Kevin M. Gates, a fellow i.c.stars alum and Technology Manager for Americas Global Partner Solutions at Microsoft, where he leads a team of Solution Architects helping partners build modern applications with AI and Azure. To prepare, I went beyond his résumé and spent time on dreaddontdie, a personal site he has designed and built himself since 2001. It's home to his photography, which he also shares through Adobe Stock and iStock, along with his music, videos, and a \"vault\" of past projects.</p><p>I was especially drawn to the path that came before tech. Kevin spent about four and a half years as a line cook, first at Bertucci's, where he started as a busboy in high school and worked his way up to the brick-oven pizza station, and then at the House of Blues, where he became a senior line cook. During downtime in that kitchen, he taught himself HTML after learning about i.c.stars. It was the year 2000, when the resources I take for granted today, like online tutorials, video courses, and AI tools, weren't readily available. He built a website for Prologue High School as part of his application and turned it in on a floppy disk.</p><p>After going through my own cycle, I understand how much persistence it takes to learn this work, and I admire how much more it took him to do it with so little to lean on. Like my own years on the Nike sales floor and in the field at Empire Cooler, his story reminds me that the discipline of hands-on work carries straight into technology. His determination has become part of my motivation: if he could build that from a kitchen, I can keep pushing with what I have.</p>", links: [{ label: "Kevin's LinkedIn", url: "https://www.linkedin.com/in/kevinmgates/" }, { label: "dreaddontdie.com", url: "https://www.dreaddontdie.com/" }] },
      { title: "Tea Debriefs", prompt: "One lesson from a debrief or cohort discussion you still think about, and why.", text: "" },
      { title: "Dream Speech", prompt: "What did you dream out loud? Were you recognized as a business, service, or civic leader? Add a quote.", text: "My Dream Speech takes place in Chicago in 2051, where I'm accepting the <b>Courage Builder Award for Community Technology Leadership</b>. It traces my path from the Nike sales floor to SOC Analyst, Threat Intelligence Analyst, Security Engineer, and CISO by 2038. Then it goes home: the Open Door Center, a safe haven I build in an abandoned factory on the far South Side, with cybersecurity classes, mentoring, wellness programs, and recreation for kids who never had them close by.<br><br><i>\"If you have the courage to speak it, you have the power to create it.\"</i>" },
      { title: "CIVICs Project", prompt: "What did your project address? What did you learn, and how will you use it right after the internship?", text: "" }
    ]}]
  },

  {
    id: "business", tag: "CHAPTER 2 · BUSINESS", region: "Consulting Guild", section: "Where I Am",
    accent: "#3fd0c0",
    intro: "My growth as a business thinker and emerging consultant.",
    groups: [{ min: 4, quests: [
      { title: "The Client Project: Medline OPN", prompt: "The Medline Operations Problem Navigator: what business problem it solves, how your team approached it, and your individual role.", wide: true,
        text: "<p>For our client project, my consulting team, Canary Consultants, built <b>Signal</b>, a working MVP of the Medline Operations Problem Navigator.</p><p><b>The problem:</b> Medline logs every IT incident across its branches, but each ticket gets handled on its own. When the same equipment keeps failing at the same branch, nobody connects the dots, so the same failure keeps showing up as a surprise and keeps costing money, staff hours, and customer trust.</p><p><b>What we're fixing:</b> Signal reads 10 years of incident history and links the repeats together. When five or more incidents hit the same branch and equipment within 90 days, it registers a <i>Problem</i> on its own, puts a price tag on it (money, time, operations, customers, equipment, and reputation), and suggests a next step based on similar problems that were already fixed. Every role gets a dashboard scoped to the branches they own, so the right person sees the issue before it escalates.</p><p><b>My role:</b> I was the Product &amp; Business Analyst Lead. I built the personas for the five roles Signal serves, mapped every feature back to the client's RFP, and wrote the demo story: one morning in the life of an IT Branch Ops Support Lead, from signing in to closing a Problem. That story became the backbone of our MVP review.</p>" },
      { title: "Forming the Consulting Company", prompt: "Your company name, how you split roles, what was hard, and how you worked through it.", text: "" },
      { title: "The RFP Proposal", prompt: "What the RFP asked for, what you proposed, and your biggest takeaway. Link the deck.", text: "", links: [] },
      { title: "Company Engagement Days", prompt: "Pick one company (Accenture, Salesforce...). What did you learn that changed how you see the industry?", text: "" },
      { title: "Mentors, Clients & Guest Consultants", prompt: "How you received feedback, how you adapted your team's approach, and what you learned about professionalism.", text: "" },
      { title: "Allskates & External Feedback", prompt: "One piece of outside feedback and what you did with it.", text: "" }
    ]}]
  },

  {
    id: "technology", tag: "CHAPTER 3 · TECHNOLOGY", region: "Innovation Forge", section: "Where I Am",
    accent: "#ff9a4a",
    intro: "What I built, how I built it, and what I learned along the way.",
    groups: [{ min: 5, quests: [
      { title: "Web App Walkthrough: The Legend of Andre", prompt: "",
        text: "My portfolio is also a playable game. <b>The problem it solves:</b> recruiters see hundreds of portfolios that look the same, so this one lets them <i>experience</i> my story.<ul><li><b>Stack:</b> Next.js, TypeScript, Tailwind CSS, Phaser 3, Framer Motion</li><li>A combat input system that buffers keys so attacks feel responsive</li><li>A 3-hit combo on SPACE (left, right, left) that scales 25 / 35 / 45 / 65 damage by level</li><li>A two-part heavy attack on LEFT CLICK: an overhead slam, then an upward launch</li><li>A dash on SHIFT with after-images and a short invulnerability window</li><li>One reusable dialogue system for every NPC and story moment</li></ul>",
        links: [{ label: "Game repo", url: "" }, { label: "Play it", url: "" }] },
      { title: "Geek Week", prompt: "SQL, Excel, and hot keys: starting score vs. ending score. What did coaching show you about how you learn?", text: "" },
      { title: "When Coding \"Clicked\"", prompt: "The exact moment something made sense, or the bug that almost beat you and how you beat it.", text: "" },
      { title: "Debugging & Asking Good Questions", prompt: "What did a bad question from you look like in week 1? What does a good one look like now?", text: "" },
      { title: "GitHub, Branching & Version Control", prompt: "How your team used branches and pull requests. Link a PR you're proud of.", text: "" },
      { title: "Cloud Tools", prompt: "How you used Office 365 and Google Drive to keep versions and share work.", text: "" },
      { title: "Business Tools", prompt: "One real example each: Trello, Teams, Zoom, Outlook, Windows Explorer.", text: "" },
      { title: "Typing Speed", prompt: "Starting WPM, current WPM, and did you hit 40+?", text: "" },
      { title: "5-Hour Minimums", prompt: "How you hit your 5-hour minimums and what you spent that time on.", text: "" },
      { title: "Side Quest: Tic-Tac-Toe", prompt: "", bonus: true,
        text: `<p>One of my first JavaScript builds. Play Tic-Tac-Toe against the AI or choose a mini-game below:</p>
        <div class="game-grid">
          <div class="game-panel">
            <h4>TIC-TAC-TOE</h4>
            <p id="game-status" aria-live="polite">Your turn (X)</p>
            <div class="game-board" role="group" aria-label="Tic-Tac-Toe board">${'<button class="game-cell" type="button"></button>'.repeat(9)}</div>
            <button id="game-reset" class="btn" type="button">Restart</button>
          </div>
          <div class="game-panel">
            <h4>SNAKE</h4>
            <p id="snake-status" aria-live="polite">Score: 0. Use arrow keys, WASD, or swipe.</p>
            <canvas id="snake-canvas" tabindex="0" role="img" aria-label="Snake game. Focus this game and use arrow keys or WASD, or swipe on a touch screen."></canvas>
            <button id="snake-reset" class="btn" type="button">Restart Snake</button>
          </div>
          <div class="game-panel">
            <h4>BREAKOUT</h4>
            <p id="breakout-status" aria-live="polite">Move your mouse, touch, or use the arrow keys to control the paddle.</p>
            <canvas id="breakout-canvas" tabindex="0" role="img" aria-label="Breakout game. Move the paddle with your mouse, touch, or arrow keys."></canvas>
            <button id="breakout-reset" class="btn" type="button">Restart Breakout</button>
          </div>
          <div class="game-panel">
            <h4>ARENA SURVIVAL</h4>
            <p id="shooter-status" aria-live="polite">Move with WASD or arrow keys. Hold the mouse or touch to fire.</p>
            <canvas id="shooter-canvas" tabindex="0" role="img" aria-label="Arena survival game. Move with WASD or arrow keys, aim with the mouse or touch, and hold to fire."></canvas>
            <button id="shooter-reset" class="btn" type="button">Redeploy</button>
          </div>
        </div>` }
    ]}]
  },

  {
    id: "wellness", tag: "CHAPTER 4 · WELLNESS", region: "Wellness Sanctuary", section: "Where I Am",
    accent: "#b48cff",
    intro: "A hero is only as strong as the habits behind him. Four shrines: wealth, heart, mind, and body.",
    boss: { name: "FINAL BOSS: SELF DOUBT", text: "In the game, the last boss isn't a monster. It's Self Doubt, and beating it turns it into Confidence. The Shrine of the Heart tells the real story behind that fight." },
    groups: [
      { name: "Shrine of Wealth", sub: "Financial Wellness", min: 1, quests: [
        { title: "My Financial Goals", prompt: "Your short- and long-term financial goals. Bonus: a salary-based budget for after i.c.stars.", text: "" },
        { title: "The Money Story I Want to Tell", prompt: "Your spending patterns, what you learned, or techniques you're using to raise your credit score.", text: "" }
      ]},
      { name: "Shrine of the Heart", sub: "Emotional Wellness", min: 1, quests: [
        { title: "Defeating Self Doubt", prompt: "How you've challenged negative self-talk or imposter syndrome. Be specific about one moment.", text: "When I first got interested in cybersecurity, doubt crept in fast. I didn't have a tech degree, and I didn't see many people who looked like me in the field. So I asked myself what I'd tell one of the nervous new hires I used to train at Nike: you're more ready than you think, and the only way to find out is to take the first step. I said those words to myself and meant them. That's how I earned my Google Cybersecurity Certificate while working full time, and it's why Self Doubt is the final boss of my game." },
        { title: "Letter to My Younger Self", prompt: "Bonus: what would you tell your younger self? Or list your affirmations.", text: "" }
      ]},
      { name: "Shrine of the Mind", sub: "Mental Wellness", min: 1, quests: [
        { title: "My Mental Wellness Toolbox", prompt: "The coping strategies that work for you, and how you handled stress or burnout.", text: "My biggest stress pattern is being a people pleaser. At Nike I carried a coworker who wasn't meeting his goals, and when my managers gave me more instead of fixing the problem, I burned out. My toolbox now:<ul><li>Set boundaries early, and say clearly how I can help</li><li>Check in with someone I trust for a reality check when I notice the pattern</li><li>Block time on my calendar for what matters most</li><li>Remember that a \"no\" is information, not a verdict</li></ul>" },
        { title: "How I Kept My Mind Right During Geek Week", prompt: "Bonus: what got you through the hardest week?", text: "" }
      ]},
      { name: "Shrine of the Body", sub: "Physical Wellness", min: 1, quests: [
        { title: "My Physical Routine", prompt: "A routine you started or improved, or a habit tracker (water, sleep, steps).", text: "" },
        { title: "I Am My Own Health Advocate", prompt: "Bonus: local resources you use, or health SMART goals for after the internship.", text: "" }
      ]}
    ]
  },

  {
    id: "career", tag: "CHAPTER 5 · CAREER PLANNING", region: "Future Kingdom", section: "Where I'm Going",
    accent: "#5ad1ff",
    intro: "The gates open after the lessons are learned. This is the future I'm building.",
    groups: [{ min: 4, quests: [
      { title: "The Road Ahead", prompt: "Long-term tech goal, leadership or entrepreneur goal, and business or consulting goal.",
        text: "<ul><li><b>Next role:</b> SOC Analyst I. I want to protect the systems people depend on, and I've already earned my Google Cybersecurity Certificate as my first step.</li><li><b>Long-term tech goal:</b> grow from SOC Analyst to Threat Intelligence Analyst to Security Engineer, then Chief Information Security Officer by 2038.</li><li><b>Leadership & community goal:</b> build the Open Door Center on Chicago's South Side, so every kid in my neighborhood has a mentor and knows they have options.</li></ul>" },
      { title: "Career Director & Program Manager", prompt: "One conversation that changed your plan or your confidence.", text: "My Program Director led our Personal Board of Directors workshop, which pushed me to move from reflection into action. I built my board around my vision: a Chairman to keep me focused, a Visionary to help me think a few moves ahead, a support person for honest check-ins, a Medline mentor to hold me accountable, and a future CISO connection. I also named my \"Must Not Have\": the people-pleaser trap, which I set a boundary around instead of inviting it in." },
      { title: "Employer Partner Workshops: Accenture", wide: true, prompt: "What Accenture, Capital One, or Salesforce taught you about what employers want.", text: "<p>Throughout the cycle, Accenture invested real time in Cycle 60, from career chats to hands-on workshops. One highlight was visiting Accenture Tower in person, where our cohort sat down with Accenture's team and got a firsthand look at the world of consulting from inside one of the biggest firms in the industry.</p><p>The session that changed how I work was <b>Professionalism 101</b>, led by Brittany Davis and Jason Hunt. They challenged us to think about how professional habits show up in our first 90 days on a technology project. Then they had us practice something most people avoid: writing a message to a stakeholder about a missed deadline. Mine read: <i>“I'm sorry I wasn't able to finish the project. I should've communicated ahead of time when I felt I was running behind.”</i></p><p>What I took away is how to speak up when I feel like I'm falling behind on an assignment, so I can either get help or get pointed in the right direction. It put into perspective how essential it is to voice myself before the last minute, not after. In the past, I would stay quiet and try to carry everything myself. Now I know that raising my hand early is a sign of professionalism, not weakness. It's the same instinct I'll need as a SOC Analyst, where flagging an issue early can keep a small problem from becoming a big one.</p><figure class=\"quest-video\"><img src=\"media/accenture-tower.jpg\" loading=\"lazy\" alt=\"Cycle 60 interns and Accenture staff gathered around conference tables at Accenture Tower\" style=\"width:100%;display:block;border:2px solid var(--line)\"><figcaption>Cycle 60 at Accenture Tower, Chicago</figcaption></figure>" },
      { title: "Resume & Job-Search Prep", prompt: "The feedback you got on your resume and what you changed.", text: "My resume changed a lot during i.c.stars. My early drafts tried to cover everything: cybersecurity, IT operations, and project management. Through Resume Rockstars and revisions, I focused it on one target: <b>SOC Analyst I</b>. I rewrote my experience to show analyst skills: investigating sensitive refund and fraud claims at Nike, documenting and escalating cases, and diagnosing equipment under pressure at Empire Cooler. I also added my hands-on lab practice with SIEM, Wireshark, Suricata IDS, SQL, and Linux." },
      { title: "My Brand & Values", prompt: "Three values you want employers to see, with one sentence of proof each.", text: "My brand is <b>people-first, action-driven security</b>. My values come from my five gifts of encouragement:<ul><li><b>Empathy:</b> most people are telling the truth and deserve help, which I learned reviewing thousands of customer claims.</li><li><b>Trust:</b> I document everything so the next person can follow my steps.</li><li><b>Plain-language communication:</b> I explain problems so clearly that people stop being afraid to ask questions.</li></ul>" },
      { title: "The Roles I Want, and Why", prompt: "Why SOC Analyst (and any other roles) fit your interests, skills, and purpose.", text: "<b>SOC Analyst</b> fits how I already think. On Nike's online support team, I investigated refund and missing-package claims. I checked order histories and account activity, looked for patterns (like one address on five accounts), documented what I found, and escalated suspicious cases to IT and compliance. That's an analyst's job: question what you see, follow the evidence, spot patterns, and know when to raise your hand. Long term, I want to be a <b>CISO</b>, because leaders who explain risk in plain language make room for everyone at the table." }
    ]}]
  },

  {
    id: "legacy", tag: "EPILOGUE", region: "Legacy Temple", section: "Why It Matters",
    accent: "#e8b64a",
    intro: "As a Black professional in technology, my mission goes beyond my own success. I want to give back to the South Side community I come from by opening doors in tech for the people who come after me.",
    groups: [{ min: 0, quests: [
      { title: "My Mission Statement", prompt: "Your mission in one or two sentences, in your own words.", text: "My mission is to encourage: to put courage into people so they can take the next step themselves. I'll do that by protecting people through cybersecurity and by opening doors in tech for the young people in the South Side neighborhood I come from." }
    ]}]
  }
];


/* ==================================================================
   TABS: the tab bar on every page (and the game page) is built
   from this list. Why: to rearrange or rename the tabs, you only
   change the order or labels here, once, and every page updates.
     label = the words on the tab (also the page title)
     href  = the page it opens
     page  = which chapter id that page shows (matches CHAPTERS ids)
   ================================================================== */
const TABS = [
  { label: "Profile",    href: "index.html" },
  { label: "Origins",    href: "origins.html",    page: "prologue" },
  { label: "Leadership", href: "leadership.html", page: "leadership" },
  { label: "Business",   href: "business.html",   page: "business" },
  { label: "Technology", href: "technology.html", page: "technology" },
  { label: "Wellness",   href: "wellness.html",   page: "wellness" },
  { label: "Career",     href: "career.html",     page: "career" },
  { label: "Legacy",     href: "legacy.html",     page: "legacy" },
  { label: "Projects",   href: "projects.html",   page: "projects" },
  { label: "Quest Log",  href: "quest-log.html",  page: "quest-log" },
  { label: "Music",      href: "legend.html#soundtrack" }
];


/* ==================================================================
   PROJECTS: the cards on the Projects page (projects.html).
   Why a list: add a new project by copying one { ... } block.
     image = a picture in media/ (or "" for none)
     links = buttons under the card; leave url "" and it won't show
   ================================================================== */
const PROJECTS = {
  github: "https://github.com/awoolfolk-alt",
  list: [
    {
      title: "The Legend of Andre: Rise of Legacy",
      tag: "Game · Next.js, TypeScript, Phaser 3",
      image: "",
      text: "<p>A browser game about my journey. You play the hero, walk through my story, and fight challenges that stand for real lessons I've learned. Inside the world there's a cybersecurity training building I built to study for Security+ and my goal of becoming a SOC Analyst: typing drills, quizzes, phishing practice, SQL and packet labs, and a mock SOC shift. I'm still building it, one feature at a time.</p>",
      links: [
        { label: "Play the game", url: "https://awoolfolk-alt.github.io/Andre-legends/" },
        { label: "Code on GitHub", url: "https://github.com/awoolfolk-alt/Andre-legends" }
      ]
    },
    {
      title: "The Crew Chronicle",
      tag: "Buffalo Soldiers leadership workshop · HTML & CSS",
      image: "media/buffalo-front-page.png",
      alt: "Front page of The Crew Chronicle, a vintage newspaper-style web page",
      text: "<p>My class project for the i.c.stars Buffalo Soldiers leadership workshop. It tells the story of a new SOC analyst who overhears a senior colleague say they \"don't deserve that seat,\" and answers by calling in eight warriors: the personal and professional strengths that got them there. I built it as a vintage newspaper you can scroll through, with a front page, breaking news, comic strips, and a character supplement.</p>",
      links: [
        { label: "View the page", url: "https://awoolfolk-alt.github.io/buffalo/crew-chronicle/" },
        { label: "Code on GitHub", url: "https://github.com/awoolfolk-alt/buffalo" }
      ]
    },
    {
      title: "Signal: Medline Operations Problem Navigator",
      tag: "Client project · Canary Consultants × i.c.stars",
      image: "",
      text: "<p><b>The problem:</b> Medline logs every IT incident, but each one is handled on its own, so the same failure at the same branch keeps showing up as a surprise.</p><p><b>What we're fixing:</b> Signal links repeat incidents into one Problem, shows what it costs, and suggests the next step from past fixes, so the right owner can fix it before it happens again. I was the Product &amp; Business Analyst Lead.</p>",
      links: [
        { label: "Read the full write-up", url: "business.html" }
      ]
    }
  ]
};
