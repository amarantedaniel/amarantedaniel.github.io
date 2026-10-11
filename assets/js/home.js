const companies = {
  ambush: {
    title: 'Ambush 🥷',
    website: 'https://www.getambush.com/',
    dates: 'Jan 2016 → Oct 2020',
    description: 'Built web and mobile apps across different industries, from native iOS and Android apps to full-stack web platforms. Worked with Swift, Kotlin, Elm, React, and Elixir, with a focus on maintainable architecture and performance.',
  },
  truecaller: {
    title: 'Truecaller 📞',
    website: 'https://www.truecaller.com/',
    dates: 'Nov 2020 → Sep 2026',
    description: 'Worked on messaging, a full SwiftUI app rewrite, and the launch of live caller identification and automatic spam blocking on iOS. Helped improve app reliability, subscriptions, testing, and analytics for millions of users.',
  },
  flightradar24: {
    title: 'Flightradar24 ✈️',
    website: 'https://www.flightradar24.com/',
    dates: 'Sep 2026 → Present',
    description: 'Under construction. A new chapter at Flightradar24, working on the iOS app in Stockholm. Still settling in, getting to know the team and the product, and finding my bearings. More to share as this chapter takes shape.',
  },
};

const panel = document.querySelector('.plain-file');
const content = panel.querySelector('.file-content');
const filename = panel.querySelector('header span');
const lineCount = panel.querySelector('footer > span');
const homeContent = content.innerHTML;

function addLine(element) {
  const line = document.createElement('div');
  line.className = 'file-line';
  const number = document.createElement('span');
  number.className = 'line-number';
  number.setAttribute('aria-hidden', 'true');
  number.textContent = String(content.children.length + 1).padStart(2, '0');
  line.append(number, element);
  content.append(line);
}

function showFile() {
  const slug = window.location.hash.slice(1);
  const company = companies[slug];
  const name = company ? `${slug}.txt` : 'website.txt';
  filename.textContent = name;
  panel.setAttribute('aria-label', name);

  if (company) {
    content.replaceChildren();
    const title = document.createElement('h1');
    title.className = 'company-title';
    title.tabIndex = -1;
    const strong = document.createElement('strong');
    strong.textContent = company.title;
    const dates = document.createElement('span');
    dates.className = 'company-dates';
    dates.textContent = company.dates;
    title.append(strong, dates);
    addLine(title);
    addLine(document.createElement('br'));
    const description = document.createElement('p');
    description.textContent = company.description;
    addLine(description);
    addLine(document.createElement('br'));
    const website = document.createElement('a');
    website.href = company.website;
    website.target = '_blank';
    website.rel = 'noopener noreferrer';
    website.className = 'company-website';
    website.textContent = `${new URL(company.website).hostname.replace(/^www\./, '')} ↗`;
    addLine(website);
    addLine(document.createElement('br'));
    const back = document.createElement('a');
    back.href = '#';
    back.className = 'file-back';
    back.textContent = '← website.txt';
    addLine(back);
    title.focus({ preventScroll: true });
  } else {
    content.innerHTML = homeContent;
    if (showFile.previousCompany) {
      content.querySelector(`a[href="#${showFile.previousCompany}"]`)?.focus({ preventScroll: true });
    }
  }

  lineCount.textContent = `${content.children.length} lines`;
  showFile.previousCompany = company ? slug : null;
}

window.addEventListener('hashchange', showFile);
showFile();
