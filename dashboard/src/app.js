const PLATFORMS = ["TryHackMe", "Hack The Box", "picoCTF", "Other"];
const CATEGORIES = [
  "Web Exploitation",
  "Cryptography",
  "Forensics",
  "Privilege Escalation",
  "Network Security",
  "Packet Analysis",
  "Active Directory",
  "Reverse Engineering",
  "Binary Exploitation",
  "General Skills",
  "Steganography",
  "Misc"
];
const DIFFICULTIES = ["Beginner", "Easy", "Medium", "Hard", "Insane", "Unknown"];
const STATUSES = ["Published", "Draft", "Coming Soon"];

let writeups = [];
let filteredWriteups = [];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const formatDate = (value) => {
  if (!value) return "Not dated";
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
};

const normalize = (value) => String(value ?? "").toLowerCase();

const countBy = (items, selector) => {
  const counts = new Map();
  items.forEach((item) => {
    const values = selector(item);
    const list = Array.isArray(values) ? values : [values];
    list.filter(Boolean).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  });
  return counts;
};

const sortedCounts = (counts, preferredOrder = []) => {
  const ordered = preferredOrder
    .filter((key) => counts.has(key) || preferredOrder.length)
    .map((key) => [key, counts.get(key) || 0]);
  const extras = [...counts.entries()]
    .filter(([key]) => !preferredOrder.includes(key))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return [...ordered, ...extras];
};

const publishedOnly = () => writeups.filter((item) => item.status === "Published" && !item.sensitive);

const publicPath = (path) => `../${path}`;

const optionMarkup = (label, value = label) => `<option value="${value}">${label}</option>`;

const latestCompleted = (items) => items
  .map((item, index) => ({ item, index }))
  .filter(({ item }) => item.dateCompleted)
  .sort((a, b) => b.item.dateCompleted.localeCompare(a.item.dateCompleted) || b.index - a.index)[0]?.item;

const populateFilters = () => {
  const categories = [...new Set([...CATEGORIES, ...writeups.flatMap((item) => item.categories || [item.category])])];
  $("#platformFilter").innerHTML = optionMarkup("All platforms", "All") + PLATFORMS.map((item) => optionMarkup(item)).join("");
  $("#categoryFilter").innerHTML = optionMarkup("All categories", "All") + categories.map((item) => optionMarkup(item)).join("");
  $("#difficultyFilter").innerHTML = optionMarkup("All difficulties", "All") + DIFFICULTIES.map((item) => optionMarkup(item)).join("");
  $("#statusFilter").innerHTML = optionMarkup("All statuses", "All") + STATUSES.map((item) => optionMarkup(item)).join("");
};

const renderStats = () => {
  const published = publishedOnly();
  const platformCount = new Set(published.map((item) => item.platform)).size;
  const categoryCounts = countBy(published, (item) => item.categories || item.category);
  const latest = latestCompleted(published);
  const strongest = [...categoryCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];

  $("#statTotal").textContent = published.length;
  $("#statPlatforms").textContent = platformCount;
  $("#statCategories").textContent = categoryCounts.size;
  $("#statLatest").textContent = latest ? `${latest.title} (${formatDate(latest.dateCompleted)})` : "Not dated";
  $("#statStrongest").textContent = strongest ? `${strongest[0]} (${strongest[1]})` : "None yet";
  $("#lastUpdated").textContent = `Dataset: ${writeups.length} records`;
};

const renderBreakdown = (target, counts, order) => {
  const max = Math.max(1, ...counts.values());
  $(target).innerHTML = sortedCounts(counts, order).map(([label, count]) => `
    <div class="breakdown-row">
      <span>${label}</span>
      <div class="meter" aria-hidden="true"><span style="--value:${(count / max) * 100}%"></span></div>
      <strong>${count}</strong>
    </div>
  `).join("");
};

const renderCategoryBreakdown = () => {
  const counts = countBy(publishedOnly(), (item) => item.categories || item.category);
  $("#categoryBreakdown").innerHTML = CATEGORIES.map((category) => {
    const count = counts.get(category) || 0;
    return `<span class="category-chip">${category}: <strong>${count}</strong></span>`;
  }).join("");
  $("#categoryPublishedCount").textContent = `${[...counts.values()].filter(Boolean).length} categories`;
};

const renderCharts = () => {
  const published = publishedOnly();
  renderChart("#platformChart", countBy(published, (item) => item.platform), PLATFORMS);
  renderChart("#categoryChart", countBy(published, (item) => item.categories || item.category), CATEGORIES);
  renderChart("#difficultyChart", countBy(published, (item) => item.difficulty), DIFFICULTIES);
  renderChart("#timelineChart", countBy(published.filter((item) => item.dateCompleted), (item) => item.dateCompleted.slice(0, 7)));
  renderChart("#toolsChart", countBy(published, (item) => item.tools), []);
  renderSkillCloud(published);
};

const renderChart = (target, counts, order = []) => {
  const entries = sortedCounts(counts, order).filter(([, count]) => count > 0).slice(0, 10);
  const max = Math.max(1, ...entries.map(([, count]) => count));
  $(target).innerHTML = entries.length ? entries.map(([label, count]) => `
    <div class="bar-row">
      <span title="${label}">${label}</span>
      <div class="meter" aria-hidden="true"><span style="--value:${(count / max) * 100}%"></span></div>
      <strong>${count}</strong>
    </div>
  `).join("") : `<p class="muted">No published data yet.</p>`;
};

const renderSkillCloud = (published) => {
  const skillCounts = sortedCounts(countBy(published, (item) => item.skills), [])
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 24);
  $("#skillCloud").innerHTML = skillCounts.map(([skill, count]) => `<span class="tag">${skill} (${count})</span>`).join("");
};

const renderProgress = () => {
  const statusCounts = countBy(writeups.filter((item) => !item.sensitive), (item) => item.status);
  renderBreakdown("#statusBreakdown", statusCounts, STATUSES);
  $("#statusCount").textContent = `${writeups.length} tracked`;

  const categoryCounts = countBy(publishedOnly(), (item) => item.categories || item.category);
  const weak = CATEGORIES.filter((category) => (categoryCounts.get(category) || 0) <= 1);
  const missing = CATEGORIES.filter((category) => !categoryCounts.get(category));
  $("#weakAreas").innerHTML = weak.map((category) => `<span class="tag">${category}</span>`).join("");
  $("#nextFocus").innerHTML = missing.length
    ? missing.map((category) => `<span class="tag">${category}</span>`).join("")
    : `<span class="tag">Broaden medium and hard boxes</span>`;
};

const applyFilters = () => {
  const search = normalize($("#searchInput").value);
  const platform = $("#platformFilter").value;
  const category = $("#categoryFilter").value;
  const difficulty = $("#difficultyFilter").value;
  const status = $("#statusFilter").value;
  const sort = $("#sortSelect").value;

  filteredWriteups = writeups.filter((item) => {
    const haystack = normalize([
      item.title,
      item.platform,
      item.category,
      item.difficulty,
      item.status,
      item.summary,
      ...(item.tools || []),
      ...(item.skills || [])
    ].join(" "));
    const categories = item.categories || [item.category];
    return (!search || haystack.includes(search))
      && (platform === "All" || item.platform === platform)
      && (category === "All" || categories.includes(category))
      && (difficulty === "All" || item.difficulty === difficulty)
      && (status === "All" || item.status === status);
  });

  filteredWriteups.sort((a, b) => {
    if (sort === "date") return (b.dateCompleted || "").localeCompare(a.dateCompleted || "") || a.title.localeCompare(b.title);
    if (sort === "platform") return a.platform.localeCompare(b.platform) || a.title.localeCompare(b.title);
    if (sort === "category") return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
    if (sort === "difficulty") return DIFFICULTIES.indexOf(a.difficulty) - DIFFICULTIES.indexOf(b.difficulty) || a.title.localeCompare(b.title);
    return a.title.localeCompare(b.title);
  });

  renderWriteups();
};

const renderWriteups = () => {
  $("#resultCount").textContent = `${filteredWriteups.length} results`;
  $("#emptyState").classList.toggle("hidden", filteredWriteups.length > 0);
  $("#writeupGrid").innerHTML = filteredWriteups.map((item) => `
    <article class="writeup-card">
      <div>
        <div class="writeup-card__meta">
          <span class="status-badge" data-status="${item.status}">${item.status}</span>
          <span>${item.platform}</span>
          <span>${item.difficulty}</span>
        </div>
        <h3>${item.title}</h3>
      </div>
      <p>${item.summary}</p>
      <div class="tag-cloud">
        ${(item.categories || [item.category]).map((category) => `<span class="tag">${category}</span>`).join("")}
      </div>
      <div class="tag-cloud">
        ${(item.tools || []).slice(0, 6).map((tool) => `<span class="tag">${tool}</span>`).join("") || `<span class="tag">Tools pending</span>`}
      </div>
      <div class="writeup-card__meta">
        <span>${formatDate(item.dateCompleted)}</span>
        <span>${(item.skills || []).length} skills</span>
      </div>
      <div class="writeup-card__actions">
        <button class="button" type="button" data-detail="${item.slug}">Details</button>
        <a class="button" href="${publicPath(item.writeupPath)}">Open README</a>
      </div>
    </article>
  `).join("");

  $$("[data-detail]").forEach((button) => {
    button.addEventListener("click", () => openDetail(button.dataset.detail));
  });
};

const listMarkup = (items, fallback) => {
  if (!items || !items.length) return `<p>${fallback}</p>`;
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
};

const openDetail = (slug) => {
  const item = writeups.find((entry) => entry.slug === slug);
  if (!item) return;
  $("#detailContent").innerHTML = `
    <p class="eyebrow">${item.platform} / ${item.difficulty} / ${formatDate(item.dateCompleted)}</p>
    <h2>${item.title}</h2>
    <div class="tag-cloud detail-section">
      <span class="status-badge" data-status="${item.status}">${item.status}</span>
      ${(item.categories || [item.category]).map((category) => `<span class="tag">${category}</span>`).join("")}
    </div>
    <section class="detail-section">
      <h3>Objective</h3>
      <p>${item.objective}</p>
    </section>
    <section class="detail-section">
      <h3>Attack / Analysis Path</h3>
      <p>${item.pathSummary}</p>
    </section>
    <section class="detail-section">
      <h3>Tools Used</h3>
      <div class="tag-cloud">${(item.tools || []).map((tool) => `<span class="tag">${tool}</span>`).join("") || `<span class="tag">Pending</span>`}</div>
    </section>
    <section class="detail-section">
      <h3>Findings</h3>
      ${listMarkup(item.findings, "Findings will be added when the writeup is published.")}
    </section>
    <section class="detail-section">
      <h3>Lessons Learned</h3>
      ${listMarkup(item.lessons, "Lessons will be added when the writeup is published.")}
    </section>
    <section class="detail-section">
      <h3>Mitigation Advice</h3>
      <p>${item.mitigation}</p>
    </section>
    <section class="detail-section">
      <a class="button" href="${publicPath(item.writeupPath)}">Open full README.md</a>
    </section>
  `;
  $("#detailDialog").showModal();
};

const bindEvents = () => {
  ["#searchInput", "#platformFilter", "#categoryFilter", "#difficultyFilter", "#statusFilter", "#sortSelect"]
    .forEach((selector) => $(selector).addEventListener("input", applyFilters));
  $("#closeDialog").addEventListener("click", () => $("#detailDialog").close());
};

const init = async () => {
  const response = await fetch("data/writeups.json");
  writeups = await response.json();
  populateFilters();
  renderStats();
  renderBreakdown("#platformBreakdown", countBy(publishedOnly(), (item) => item.platform), PLATFORMS);
  $("#platformPublishedCount").textContent = `${publishedOnly().length} published`;
  renderCategoryBreakdown();
  renderCharts();
  renderProgress();
  bindEvents();
  applyFilters();
};

init().catch((error) => {
  console.error(error);
  $("#writeupGrid").innerHTML = "";
  $("#emptyState").classList.remove("hidden");
  $("#emptyState").querySelector("h3").textContent = "Dashboard data failed to load";
});
