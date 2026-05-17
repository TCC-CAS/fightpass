const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const ignoredEntries = new Set(["dist", "scripts", "package.json", "README.md", "vercel.json", "netlify.toml"]);

function normalizeApiBaseUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function copyDirectory(sourceDir, targetDir, isRoot = false) {
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    if (isRoot && ignoredEntries.has(entry.name)) continue;

    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
      continue;
    }

    if (!entry.isFile()) continue;

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(sourcePath, targetPath);
  }
}

function copyFrontend() {
  fs.mkdirSync(distDir, { recursive: true });

  copyDirectory(rootDir, distDir, true);
}

function writeRuntimeConfig() {
  const apiBaseUrl = normalizeApiBaseUrl(process.env.FIGHTPASS_API_BASE_URL);
  const config = [
    "(function () {",
    "  window.FightPassConfig = window.FightPassConfig || {};",
    `  window.FightPassConfig.apiBaseUrl = ${JSON.stringify(apiBaseUrl)};`,
    "})();",
    ""
  ].join("\n");

  fs.mkdirSync(path.join(distDir, "js"), { recursive: true });
  fs.writeFileSync(path.join(distDir, "js", "config.js"), config);

  if (!apiBaseUrl) {
    console.warn("FIGHTPASS_API_BASE_URL nao definida. O frontend usara http://localhost:3000/api.");
  }
}

copyFrontend();
writeRuntimeConfig();
