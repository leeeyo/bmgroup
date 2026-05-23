// Generates app/favicon.ico from public/bmgroup.png, flattened onto an opaque
// white background (no transparency), at the standard favicon sizes.
//
// Usage:
//   npm i -D sharp png-to-ico
//   npm run favicon
//
// Re-run whenever public/bmgroup.png changes.

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public", "bmgroup.png");
const out = path.join(root, "app", "favicon.ico");

// Multi-resolution .ico so browsers/OS pick the crispest size.
const sizes = [16, 32, 48, 64];
const white = { r: 255, g: 255, b: 255, alpha: 1 };

const pngBuffers = await Promise.all(
  sizes.map((size) =>
    sharp(src)
      // Fit the whole logo into a square, padding with white (keeps aspect ratio).
      .resize(size, size, { fit: "contain", background: white })
      // Drop any residual alpha → guaranteed opaque white background.
      .flatten({ background: white })
      .png()
      .toBuffer(),
  ),
);

const ico = await pngToIco(pngBuffers);
await writeFile(out, ico);

console.log(
  `✓ Wrote ${path.relative(root, out)} (${ico.length} bytes) from ${path.relative(root, src)} — sizes ${sizes.join(", ")}`,
);
