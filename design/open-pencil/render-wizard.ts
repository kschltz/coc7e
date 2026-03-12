import { resolve } from "node:path";
import { loadDocument, loadFonts } from "/home/kschltz/.bun/install/global/node_modules/@open-pencil/cli/src/headless.ts";
import { renderJSX, initFontService, exportFigFile } from "/home/kschltz/.bun/install/global/node_modules/@open-pencil/core/src/index.ts";

const inputFile = resolve("design/open-pencil/coc7e-ui.fig");

globalThis.window = {} as Window & typeof globalThis;

try {
  console.log("Loading document...");
  const graph = await loadDocument(inputFile);
  await loadFonts(graph);
  await initFontService();
  console.log("Font service initialized");

  console.log("Rendering Wizard JSX...");

  const jsx = `<Frame name="Wizard Art Nouveau" x={0} y={0} w={1200} h={900} bg="#F5ECD7">
  <Text name="Title" x={380} y={40} size={42} weight="bold" color="#A41E1E">CREATE INVESTIGATOR</Text>
  
  <Frame name="Steps" x={150} y={100} w={900} h={50}>
    <Frame name="S1" x={0} y={10} w={100} h={30} bg="#A41E1E" rounded={2}>
      <Text x={15} y={8} size={11} color="#F5ECD7">1 CONCEPT</Text>
    </Frame>
    <Rectangle name="L1" x={110} y={24} w={70} h={2} bg="#D4A84B" />
    <Frame name="S2" x={190} y={10} w={90} h={30} bg="#E8DCC4" stroke="#8B7355" rounded={2}>
      <Text x={15} y={8} size={11} color="#8B7355">2 ATTR</Text>
    </Frame>
    <Rectangle name="L2" x={290} y={24} w={70} h={2} bg="#D4A84B" />
    <Frame name="S3" x={370} y={10} w={90} h={30} bg="#E8DCC4" stroke="#8B7355" rounded={2}>
      <Text x={20} y={8} size={11} color="#8B7355">3 AGE</Text>
    </Frame>
    <Rectangle name="L3" x={470} y={24} w={70} h={2} bg="#D4A84B" />
    <Frame name="S4" x={550} y={10} w={90} h={30} bg="#E8DCC4" stroke="#8B7355" rounded={2}>
      <Text x={10} y={8} size={11} color="#8B7355">4 OCCUP</Text>
    </Frame>
    <Rectangle name="L4" x={650} y={24} w={70} h={2} bg="#D4A84B" />
    <Frame name="S5" x={730} y={10} w={90} h={30} bg="#E8DCC4" stroke="#8B7355" rounded={2}>
      <Text x={15} y={8} size={11} color="#8B7355">5 SKILLS</Text>
    </Frame>
  </Frame>

  <Frame name="Panel" x={100} y={170} w={1000} h={580} bg="#E8DCC4" stroke="#A41E1E" strokeWidth={3} rounded={2}>
    <Rectangle name="Bar" x={0} y={0} w={1000} h={8} bg="#A41E1E" />
    <Text name="StepT" x={40} y={30} size={24} italic color="#2C1810">Step 1: Character Concept</Text>
    <Rectangle name="Div" x={40} y={65} w={920} h={2} bg="#D4A84B" />
    
    <Text name="L1" x={40} y={90} size={12} weight="bold" color="#8B7355">INVESTIGATOR NAME</Text>
    <Frame name="I1" x={40} y={110} w={400} h={40} bg="#F5ECD7" stroke="#2C1810" strokeWidth={2} rounded={2}>
      <Text x={15} y={12} size={16} color="#999999">Enter character name...</Text>
    </Frame>
    
    <Text name="L2" x={500} y={90} size={12} weight="bold" color="#8B7355">OCCUPATION</Text>
    <Frame name="I2" x={500} y={110} w={400} h={40} bg="#F5ECD7" stroke="#2C1810" strokeWidth={2} rounded={2}>
      <Text x={15} y={12} size={16} color="#999999">Select occupation...</Text>
    </Frame>
    
    <Text name="L3" x={40} y={175} size={12} weight="bold" color="#8B7355">SEX</Text>
    <Frame name="I3" x={40} y={195} w={180} h={40} bg="#F5ECD7" stroke="#2C1810" strokeWidth={2} rounded={2}>
      <Text x={15} y={12} size={16} color="#999999">M / F / Other</Text>
    </Frame>
    
    <Text name="L4" x={260} y={175} size={12} weight="bold" color="#8B7355">RESIDENCE</Text>
    <Frame name="I4" x={260} y={195} w={300} h={40} bg="#F5ECD7" stroke="#2C1810" strokeWidth={2} rounded={2}>
      <Text x={15} y={12} size={16} color="#999999">City or town...</Text>
    </Frame>
    
    <Text name="L5" x={600} y={175} size={12} weight="bold" color="#8B7355">BIRTHPLACE</Text>
    <Frame name="I5" x={600} y={195} w={300} h={40} bg="#F5ECD7" stroke="#2C1810" strokeWidth={2} rounded={2}>
      <Text x={15} y={12} size={16} color="#999999">City or region...</Text>
    </Frame>
    
    <Text name="L6" x={40} y={265} size={12} weight="bold" color="#8B7355">CHARACTER CONCEPT</Text>
    <Frame name="I6" x={40} y={285} w={920} h={120} bg="#F5ECD7" stroke="#2C1810" strokeWidth={2} rounded={2}>
      <Text x={15} y={15} size={14} color="#999999">Briefly describe your investigator...</Text>
    </Frame>
    
    <Text name="Pts" x={40} y={430} size={14} weight="bold" color="#8B7355">ATTRIBUTE POINTS</Text>
    <Frame name="PtsBox" x={40} y={455} w={80} h={50} bg="#A41E1E" rounded={2}>
      <Text x={20} y={15} size={24} weight="bold" color="#F5ECD7">70</Text>
    </Frame>
    <Text name="PtsD" x={140} y={465} size={12} color="#2C1810">Distribute among 8 attributes</Text>
  </Frame>

  <Frame name="Back" x={100} y={770} w={150} h={50} bg="transparent" stroke="#A41E1E" strokeWidth={2} rounded={2}>
    <Text x={50} y={15} size={16} weight="bold" color="#A41E1E">BACK</Text>
  </Frame>
  
  <Frame name="Next" x={950} y={770} w={150} h={50} bg="#A41E1E" stroke="#D4A84B" strokeWidth={2} rounded={2}>
    <Text x={50} y={15} size={16} weight="bold" color="#F5ECD7">NEXT</Text>
  </Frame>
</Frame>`;

  const result = renderJSX(graph, jsx, { x: 0, y: 0 });
  console.log("Wizard JSX rendered, result:", JSON.stringify(result, null, 2));
  
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
