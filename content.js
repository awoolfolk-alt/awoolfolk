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
      { title: "Forming the Consulting Company", prompt: "Your company name, how you split roles, what was hard, and how you worked through it.", wide: true,
        text: "<p>Our consulting company was <b>Canary Consultants</b>, a team of five interns. We named it after <i>canary testing</i>, a technique where you release a change to a small group first so problems are caught before they spread. That fit a product built to catch problems early. Our mission was to eliminate operational friction for healthcare organizations, guided by four values: Foresight, Reliability, Stewardship, and Agency.</p><p>In September we wrote a team agreement together: Teams as our main channel, a reply within 24 hours, decisions made by peer review, and conflict handled directly and early. We split roles into project manager, engineering lead, data and AI lead, and design. I was the Product &amp; Business Analyst Lead and the point of contact on our client introduction.</p><p>The hardest part was work landing in too many places: we ended up with several copies of the backlog and old statuses that never got updated. We fixed it by naming one source of truth for each thing: Plaky for tasks, GitHub for code, Google Drive for documents, and Teams for decisions.</p>" },
      { title: "The RFP Proposal", prompt: "What the RFP asked for, what you proposed, and your biggest takeaway. Link the deck.", wide: true,
        text: "<p>Medline's RFP asked for an <b>Operations Problem Navigator</b>: one platform that standardizes how warehouse incidents are captured, uses AI to spot when related incidents add up to a real problem, and creates a Problem record. Each record needed a category, impacts, scope, a named owner, and a predicted future impact. The platform also had to route each problem to the right IT team. It had to be secure enough for HIPAA-sensitive data and built as an MVP by the end of the cycle.</p><p>Our answer was <b>Signal</b>. My job was to map every requirement in the RFP to a feature and to acceptance criteria, then write the demo story that showed it working: one morning in the life of an IT Branch Ops Support Lead.</p><p>My biggest takeaway: the RFP defines what \"done\" means. When we tested, the expected results came from the acceptance criteria, not from whatever the app happened to do.</p>" },
      { title: "Company Engagement Days", prompt: "Pick one company (Accenture, Salesforce...). What did you learn that changed how you see the industry?", text: "" },
      { title: "Mentors, Clients & Guest Consultants", prompt: "How you received feedback, how you adapted your team's approach, and what you learned about professionalism.", wide: true,
        text: "<p>Every Monday, our team met with three mentors from Medline's technology team. They taught us as much about how to carry ourselves as about the technology. I learned to treat those 30 minutes like a client meeting. We sent the agenda ahead of time with our exact questions about the front end, what to build first, what to cut, and the simplest honest way to show AI pattern detection.</p><p>When mock interviews landed on our meeting time, we emailed early, apologized for the short notice, and offered specific new times. When the client told us the session was technical, we scheduled around their technical mentors.</p><p>Their biggest piece of advice was to keep the solution simple, built around what the user can actually see and use, instead of adding technology the demo didn't need. The professionalism lesson: respect the client's time, come prepared, and communicate changes before they become problems.</p>" },
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
      { title: "Debugging & Asking Good Questions", prompt: "What did a bad question from you look like in week 1? What does a good one look like now?", wide: true,
        text: "<p>At i.c.stars, I learned that my bad questions came from skipping <b>\"give to get.\"</b> Give to get means you don't just ask; you share what you already think about the problem first. A week-1 question from me looked like \"Why isn't this working?\" That gave my audience nothing to work with. Now I say what I expected, what actually happened, and what I think is causing it, then ask. That lets the person correct my train of thought instead of starting from zero.</p><p>I used the same habit in my Signal debug list. Every issue had four parts: what's wrong, why it matters, what to do, and how to check it's fixed. For example: \"the assignee list ignores branches, so a lead can assign a problem to an engineer who doesn't cover that branch; filter the list by branch.\" I asked our Medline mentors questions the same way, with specific questions sent ahead of time instead of \"any advice?\"</p>" },
      { title: "GitHub, Branching & Version Control", prompt: "How your team used branches and pull requests. Link a PR you're proud of.", wide: true,
        links: [ { label: "My GitHub", url: "https://github.com/awoolfolk-alt" } ],
        text: "<p>On Signal, our code moved through GitHub. Each developer worked on a feature branch, opened a pull request linked to the task in Plaky, and a teammate reviewed it before it merged into main. When I reviewed the interface, I logged every issue I found and put 12 fixes on a separate branch (<code>andre/ux-fixes</code>) so the team could review them before merging.</p><p>The biggest lesson was that Google Drive is not version control. For a while our repo sat in Drive and teammates couldn't find the code, so we moved code to GitHub and kept Drive for documents. Now every project I build has its own repo, including this portfolio, my game, my study pack, and Study Buddy.</p>" },
      { title: "Cloud Tools", prompt: "How you used Office 365 and Google Drive to keep versions and share work.", wide: true,
        text: "<p>Google Drive was where our Medline RFP, wireframes, meeting notes, and backup demo video lived. Office 365 is how we worked with the client: Outlook for mentor emails, agendas, and calendar invites, and Teams for daily team communication.</p><p>The lesson I'll carry forward is to keep one current version. We once had backlog copies named v2, v3, and v4, plus a spreadsheet, and statuses landed in different places. We moved old copies into an Archive folder and kept one live tracker.</p>" },
      { title: "Business Tools", prompt: "One real example each: Trello, Teams, Zoom, Outlook, Windows Explorer.", wide: true,
        text: "<p>In my BW8A workflow, I mapped how one real Signal feature moved from idea to done and which tool owned each step. <b>Plaky</b> held our backlog, owners, and due dates, and items moved from \"Ready for Dev\" to \"In Review\" to \"Ready for QA\" to \"Done.\" <b>Microsoft Teams</b> was for quick questions and decisions, which we posted as \"DECISION:\" messages so they were easy to find. <b>Outlook</b> carried client updates and mentor scheduling. <b>VS Code</b> and <b>GitHub</b> were where the code was written and reviewed.</p><p>Mapping it showed me where work got stuck. The Medline sample data arrived in an inbox instead of the backlog, so nobody owned it until we added it as a task.</p>" },
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
        { title: "My Financial Goals", prompt: "Your short- and long-term financial goals. Bonus: a salary-based budget for after i.c.stars.", wide: true,
        text: "<p><b>Short-term (next year):</b></p><ul><li><b>Get my own car again, with 50% of it paid off.</b> Putting half down up front means a smaller payment and less debt hanging over me.</li><li><b>Get my own apartment.</b> A place of my own is the foundation for everything else I'm building.</li></ul><p><b>Long-term:</b></p><ul><li><b>Save $5,000 in my savings account within a year and a half.</b> That's my starting point before I begin learning the stock market. I want to use money I've already saved, not money I need.</li><li><b>Build an investment portfolio</b> where I can grow funds and investments over time to support the <b>Open Door Center</b>, my plan to open doors for my community on the South Side of Chicago.</li></ul><p>Each goal builds on the one before it: stability first (a car and a home), then savings, then investing in something bigger than me.</p>" },
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
        { title: "My Physical Routine", prompt: "A routine you started or improved, or a habit tracker (water, sleep, steps).", wide: true,
        text: "<p>My wellness plan during i.c.stars was simple: <b>move more.</b> I'm used to driving or taking an Uber everywhere, which meant I could go a whole day without really moving. So I switched to public transportation on purpose. Walking to the stop, making transfers, and getting to the door forces me to get in more steps than I normally would.</p><p>I also made hydration part of the plan: I drink water throughout the week and choose foods that hydrate me too. The difference shows up in how I feel. I feel more like myself when I'm able to move my body.</p><p>My next step is strength. My joints don't feel quite right, and I believe adding weight training will help them feel normal again, so that's the next habit I'm building.</p>" },
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
      { title: "Resume & Job-Search Prep", prompt: "The feedback you got on your resume and what you changed.", text: "My resume changed a lot during i.c.stars. My early drafts tried to cover everything: cybersecurity, IT operations, and project management. Through Resume Rockstars and revisions, I focused it on one target: <b>SOC Analyst I</b>. I rewrote my experience to show analyst skills: investigating sensitive refund and fraud claims at Nike, documenting and escalating cases, and diagnosing equipment under pressure at Empire Cooler. I also added my hands-on lab practice with SIEM, Wireshark, Suricata IDS, SQL, and Linux.",
        links: [ { label: "View my resume", url: "resume/" }, { label: "Download PDF", url: "resume/Andre-Woolfolk-Resume.pdf" } ] },
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
      title: "Cycle 60 Technical Study Pack",
      tag: "Study tool · HTML, CSS, JavaScript",
      image: "media/flashcards-study-pack.jpg",
      alt: "The Cycle 60 study pack: flashcard stats above a pixel battle arena",
      text: "<p>A study site I built so my cycle has something to come back to after commencement. Page 1 has 354 flashcards on Python, SQL, Git, React, Node/Express, Docker, testing, cloud, AI prompting, and our capstone app. You can filter by category and level, shuffle, and mark cards <i>Got it</i> or <i>Still learning</i>. Page 2 turns the internship into 29 plain-language lessons with quizzes. To keep studying fun, a pixel battle arena levels up as you answer, and your progress saves in your own browser. It's one self-contained file that works offline, and the cards export to Quizlet or Anki.</p>",
      links: [
        { label: "Open the study pack", url: "https://awoolfolk-alt.github.io/icstars-flashcards/" },
        { label: "Code on GitHub", url: "https://github.com/awoolfolk-alt/icstars-flashcards" }
      ]
    },
    {
      title: "Study Buddy",
      tag: "Interactive character · JavaScript & Canvas",
      image: "media/study-buddy.jpg",
      alt: "The pixel-art study buddy doing four emotes: wave, cheer, laugh, and heart",
      text: "<p>My first experience with a digital pet was in Kimi, and I really enjoyed it. Having a little companion on screen made the work feel lighter, so I wanted to build my own.</p><p>This is the pixel-art buddy I designed to keep people company while they study, and the same one who follows you around this portfolio. He's drawn entirely in code, pixel by pixel on a canvas, with no image files. He busts out of the screen, follows your cursor with his eyes, and you can drag him anywhere: drop him on a side and he leans on it, drop him at the top and he hangs. Click him for emotes, hold him to charge an energy beam, or leave him alone and he meditates, naps, and eventually pulls up a gaming chair. On this site he also races the running man and turns the pages like a book.</p>",
      links: [
        { label: "Meet him in the study pack", url: "https://awoolfolk-alt.github.io/icstars-flashcards/" },
        { label: "See him on my game page", url: "legend.html" }
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
