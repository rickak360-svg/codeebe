import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  "apps/api",
  "apps/web",
  "apps/admin",
  "apps/worker",
];

let created = 0;

for (const dir of targets) {
  const example = join(root, dir, ".env.example");
  const env = join(root, dir, ".env");

  if (!existsSync(example)) {
    console.warn(`skip ${dir}: no .env.example`);
    continue;
  }

  if (existsSync(env)) {
    console.log(`keep ${dir}/.env (already exists)`);
    continue;
  }

  copyFileSync(example, env);
  console.log(`created ${dir}/.env`);
  created++;
}

if (created === 0) {
  console.log("All app .env files already exist.");
} else {
  console.log(`\nCreated ${created} file(s). Edit each apps/*/.env as needed.`);
}
