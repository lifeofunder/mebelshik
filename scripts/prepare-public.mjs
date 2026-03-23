/**
 * Копирует public → .public-filtered, пропуская корневой wood-materials.jpg
 * (остаток неудачных скачиваний может быть заблокирован Windows — мешает vite build).
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public");
const dst = join(root, ".public-filtered");
const SKIP_ROOT = new Set(["wood-materials.jpg"]);

function copyDir(from, to, isRoot) {
  mkdirSync(to, { recursive: true });
  for (const name of readdirSync(from)) {
    if (isRoot && SKIP_ROOT.has(name)) continue;
    const fp = join(from, name);
    const tp = join(to, name);
    if (statSync(fp).isDirectory()) copyDir(fp, tp, false);
    else copyFileSync(fp, tp);
  }
}

if (!existsSync(src)) {
  console.error("Нет папки public");
  process.exit(1);
}

rmSync(dst, { recursive: true, force: true });
copyDir(src, dst, true);
console.log("prepare-public: public → .public-filtered");
