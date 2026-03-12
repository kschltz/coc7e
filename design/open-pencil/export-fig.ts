import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

type ExportFormat = "PNG" | "JPG" | "WEBP";

declare const Bun: {
  write(path: string, data: Uint8Array): Promise<number>;
};

const [, , fileArg, pageArg, outputArg, formatArg] = process.argv;

if (!fileArg) {
  console.error(
    "Usage: bun design/open-pencil/export-fig.ts <file.fig> [pageName] [outputFile] [png|jpg|webp]",
  );
  process.exit(1);
}

const inputFile = resolve(fileArg);
const pageName = pageArg;
const requestedFormat = (formatArg || "png").toUpperCase() as ExportFormat;

if (!["PNG", "JPG", "WEBP"].includes(requestedFormat)) {
  console.error(`Unsupported format: ${formatArg}`);
  process.exit(1);
}

const outputFile = resolve(
  outputArg ||
    inputFile.replace(/\.fig$/i, `-${(pageName || "page").replace(/\s+/g, "-").toLowerCase()}.${requestedFormat.toLowerCase()}`),
);

globalThis.window = {} as Window & typeof globalThis;

const { loadDocument, loadFonts, exportNodes } = await import(
  "/home/kschltz/.bun/install/global/node_modules/@open-pencil/cli/src/headless.ts"
);

const graph = await loadDocument(inputFile);
await loadFonts(graph);

const pages = graph.getPages();
const page = pageName ? pages.find((item) => item.name === pageName) : pages[0];

if (!page) {
  console.error(`Page not found: ${pageName}`);
  process.exit(1);
}

const data = await exportNodes(graph, page.id, page.childIds, {
  scale: 1,
  format: requestedFormat,
});

if (!data) {
  console.error("Nothing exported.");
  process.exit(1);
}

await mkdir(dirname(outputFile), { recursive: true });
await Bun.write(outputFile, data);

console.log(
  JSON.stringify(
    {
      input: inputFile,
      page: page.name,
      output: outputFile,
      bytes: data.length,
      format: requestedFormat,
    },
    null,
    2,
  ),
);
