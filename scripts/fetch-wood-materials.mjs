/**
 * Скачивает фото в public/images/wood-materials.jpg (несколько запасных URL).
 * После успеха в src/content/media.ts поставьте:
 *   export const WOOD_MATERIALS_IMG = "/images/wood-materials.jpg";
 *
 * Запуск: npm run fetch-wood-materials
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "images", "wood-materials.jpg");

mkdirSync(join(__dirname, "..", "public", "images"), { recursive: true });

const urls = [
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80",
  "https://images.pexels.com/photos/6470865/pexels-photo-6470865.jpeg?auto=compress&cs=tinysrgb&w=1400",
];

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
};

for (const u of urls) {
  try {
    const r = await fetch(u, { headers });
    if (!r.ok) {
      console.error("HTTP", r.status, u);
      continue;
    }
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 2000) {
      console.error("Слишком мало байт:", buf.length, u);
      continue;
    }
    writeFileSync(out, buf);
    console.log("Сохранено:", out, buf.length, "байт");
    console.log("Источник:", u);
    console.log(
      "\nУкажите в src/content/media.ts:\n  export const WOOD_MATERIALS_IMG = \"/images/wood-materials.jpg\";\n"
    );
    process.exit(0);
  } catch (e) {
    console.error(String(e?.message || e), "\n ", u);
  }
}

console.error("Не удалось скачать ни один URL.");
process.exit(1);
