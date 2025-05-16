// Modlist parsing and rendering
fetch("modlist.txt")
  .then(res => res.text())
  .then(text => {
    const lines = text.split("\n");
    const container = document.getElementById("parsedModlist");
    container.innerHTML = "";

    let startParsing = false;
    let sections = [];
    let currentSection = null;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      // Start parsing when Root Files_separator is found
      if (!startParsing) {
        if (line.toLowerCase() === "+root files_separator") {
          startParsing = true;
        } else {
          continue; // skip lines before Root Files
        }
      }

      // Handle new section header
      if (line.startsWith("+") && line.toLowerCase().includes("_separator")) {
        if (currentSection) sections.push(currentSection);
        const sectionTitle = line
          .replace("+", "")
          .replace("_separator", "")
          .replace(/[-_]/g, " ")
          .trim();

        currentSection = {
          title: sectionTitle,
          mods: []
        };
      } 
      // Add mod to current section
      else if (line.startsWith("+")) {
        if (currentSection) {
          currentSection.mods.push(line.replace("+", "").trim());
        }
      }
    }

    if (currentSection) sections.push(currentSection); // Push final section

    // Render accordion
    sections.forEach(section => {
      const accordion = document.createElement("div");
      accordion.className = "accordion";

      const header = document.createElement("div");
      header.className = "accordion-header";
      header.innerHTML = `${section.title}<span class="plus">+</span>`;

      const content = document.createElement("div");
      content.className = "accordion-content";

      // Accordion click logic
      header.addEventListener("click", () => {
        header.classList.toggle("active");
        content.classList.toggle("show");
        // Toggle plus/minus
        const plus = header.querySelector(".plus");
        plus.textContent = plus.textContent === "+" ? "–" : "+";
      });

      section.mods.forEach(mod => {
        const modItem = document.createElement("div");
        modItem.className = "mod-item";
        modItem.textContent = mod;
        content.appendChild(modItem);
      });

      accordion.appendChild(header);
      accordion.appendChild(content);
      container.appendChild(accordion);
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById("parsedModlist").textContent = "⚠️ Failed to load modlist.txt";
  });

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.collapsible-btn').forEach(btn => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content) {
        content.classList.toggle("open");
      }
    });
  });
});
