/* ==================================================================
   TAB PAGES
   Why: every tab page is the same small HTML shell. This file reads
   which page it's on (body data-page), pulls that chapter out of
   CHAPTERS in content.js, and draws it. Your words live in ONE place,
   so a quest you add shows up on the game page and its tab page.
   ================================================================== */
const pageId = document.body.dataset.page;
const tab = TABS.find(t => t.page === pageId);
const isDone = q => q.text.trim().length > 0;

// Tab bar: the current page's tab is marked so visitors know where they are.
document.getElementById("tabs").innerHTML = TABS.map(t =>
  `<a href="${t.href}"${t === tab ? ' aria-current="page"' : ""}>${t.label}</a>`).join("");

function quest(q) {
  const done = isDone(q);
  const links = (q.links || []).filter(l => l.url)
    .map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label} →</a>`).join("");
  return `<article class="quest ${done ? "done" : ""}">
      <p class="status">${q.bonus ? "BONUS" : done ? "CLEAR" : "IN PROGRESS"}</p>
      <h3>${q.title}</h3>
      ${done ? `<div>${q.text}</div>` : `<p class="prompt">${q.prompt}</p>`}
      ${links ? `<div class="links">${links}</div>` : ""}
    </article>`;
}

function chapterPage(ch) {
  const total = ch.groups.reduce((n, g) => n + g.quests.filter(q => !q.bonus).length, 0);
  const mainMin = ch.groups.length === 1 ? ch.groups[0].min : 0;
  return `<h1>${tab.label}</h1>
    <p class="sub">${ch.region} · ${ch.section}</p>
    <p class="intro">${ch.intro}</p>
    ${mainMin ? `<p class="req">Requirement: ${mainMin} of ${total}</p>` : ""}
    ${ch.boss ? `<div class="boss"><b>${ch.boss.name}</b> ${ch.boss.text}</div>` : ""}
    ${ch.groups.map(g => `
      ${g.name ? `<h2>${g.name}</h2><p class="group-sub">${g.sub} · complete at least ${g.min}</p>` : ""}
      ${g.quests.map(quest).join("")}`).join("")}`;
}

// Quest Log: counts finished quests against each section's minimum.
function questLogPage() {
  const rows = [];
  CHAPTERS.forEach(ch => ch.groups.forEach(g => {
    if (!g.min) return;
    const done = g.quests.filter(q => !q.bonus && isDone(q)).length;
    const label = g.name ? `${ch.region}: ${g.name}` : ch.region;
    rows.push(`<tr><td>${label}</td><td>${done} / ${g.min}</td>
      <td>${done >= g.min ? '<span class="ok">CLEAR</span>' : "In progress"}</td></tr>`);
  }));
  return `<h1>${tab.label}</h1><p class="sub">Due 11/23/2026 · tracked automatically</p>
    <div style="overflow-x:auto"><table><thead><tr><th>Section</th><th>Quests</th><th>Status</th></tr></thead>
    <tbody>${rows.join("")}</tbody></table></div>`;
}

// Projects: one card per project in PROJECTS (content.js).
function projectsPage() {
  const card = pr => {
    const links = (pr.links || []).filter(l => l.url).map(l => {
      const ext = l.url.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${l.url}"${ext}>${l.label} →</a>`;
    }).join("");
    return `<article class="quest done">
      <p class="status">${pr.tag}</p>
      <h3>${pr.title}</h3>
      ${pr.image ? `<img class="project-img" src="${pr.image}" alt="${pr.alt || pr.title}" loading="lazy" />` : ""}
      <div>${pr.text}</div>
      ${links ? `<div class="links">${links}</div>` : ""}
    </article>`;
  };
  return `<h1>${tab.label}</h1>
    <p class="sub">What I've built · <a href="${PROJECTS.github}" target="_blank" rel="noopener">My GitHub →</a></p>
    ${PROJECTS.list.map(card).join("")}`;
}

const chapter = CHAPTERS.find(c => c.id === pageId);
document.getElementById("page").innerHTML =
  pageId === "quest-log" ? questLogPage() : pageId === "projects" ? projectsPage() : chapterPage(chapter);
document.title = `${tab.label} | Andre Woolfolk`;
