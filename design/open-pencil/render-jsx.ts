import { resolve } from "node:path";
import { loadDocument, loadFonts } from "/home/kschltz/.bun/install/global/node_modules/@open-pencil/cli/src/headless.ts";
import { renderJSX, initFontService, exportFigFile } from "/home/kschltz/.bun/install/global/node_modules/@open-pencil/core/src/index.ts";

const [, , fileArg] = process.argv;

if (!fileArg) {
  console.error("Usage: bun design/open-pencil/render-jsx.ts <fig-file>");
  process.exit(1);
}

const inputFile = resolve(fileArg);

globalThis.window = {} as Window & typeof globalThis;

try {
  console.log("Loading document...");
  const graph = await loadDocument(inputFile);
  await loadFonts(graph);
  await initFontService();
  console.log("Font service initialized");

  console.log("Rendering JSX...");

  const jsx = `<Frame name="Landing Art Nouveau" x={2000} y={0} w={1440} h={900} bg="#F5ECD7">
  <Text name="Title" x={320} y={100} size={72} weight="bold" color="#A41E1E">CALL OF CTHULHU</Text>
  <Text name="Subtitle" x={420} y={200} size={28} italic color="#2C1810">7th Edition Investigator Sheet</Text>
  <Rectangle name="LineLeft" x={320} y={140} w={180} h={3} bg="#D4A84B" />
  <Rectangle name="LineRight" x={940} y={140} w={180} h={3} bg="#D4A84B" />
  <Star name="Diamond" x={710} y={135} w={20} h={20} points={4} rotate={45} bg="#D4A84B" />
  <Frame name="QuoteBox" x={420} y={280} w={600} h={150} bg="#0D0D0D" stroke="#A41E1E" strokeWidth={3} rounded={2}>
    <Text name="Quote" x={40} y={30} w={520} h={90} size={18} italic color="#F5ECD7" textAlign="center">The oldest and strongest emotion</Text>
  </Frame>
  <Text name="Author" x={640} y={410} size={14} color="#D4A84B">— H. P. Lovecraft</Text>
  <Frame name="BtnNew" x={460} y={480} w={240} h={60} bg="#A41E1E" stroke="#D4A84B" strokeWidth={2} rounded={2}>
    <Text x={30} y={20} size={16} weight="bold" color="#F5ECD7">CREATE NEW SHEET</Text>
  </Frame>
  <Frame name="BtnLoad" x={740} y={480} w={240} h={60} bg="#0D0D0D" stroke="#A41E1E" strokeWidth={2} rounded={2}>
    <Text x={50} y={20} size={16} weight="bold" color="#D4A84B">LOAD JSON</Text>
  </Frame>
</Frame>`;

  const result = renderJSX(graph, jsx, { x: 2000, y: 0 });
  console.log("JSX rendered, result:", JSON.stringify(result, null, 2));
  
  // Save the document
  console.log("Exporting file...");
  const data = await exportFigFile(graph);
  await Bun.write(inputFile, new Uint8Array(data));
  console.log("Saved to:", inputFile);
  
} catch (e) {
  console.error("Error:", e);
  if (e instanceof Error && e.stack) {
    console.error(e.stack);
  }
}
