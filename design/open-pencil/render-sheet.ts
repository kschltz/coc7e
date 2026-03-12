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

  console.log("Rendering Sheet JSX...");

  // Sheet Page - Art Nouveau Design (3 columns)
  const jsx = `<Frame name="Sheet Art Nouveau" x={0} y={0} w={1400} h={1000} bg="#F5ECD7">
  
  <!-- Header Bar -->
  <Frame name="HeaderBar" x={0} y={0} w={1400} h={60} bg="#0D0D0D">
    <Text name="AppTitle" x={20} y={20} size={20} weight="bold" color="#D4A84B">CALL OF CTHULHU 7E</Text>
    <Frame name="EditToggle" x={900} y={12} w={100} h={36} bg="#A41E1E" rounded={2}>
      <Text x={20} y={10} size={12} color="#F5ECD7">EDIT</Text>
    </Frame>
    <Frame name="SaveBtn" x={1010} y={12} w={100} h={36} bg="transparent" stroke="#D4A84B" strokeWidth={1} rounded={2}>
      <Text x={30} y={10} size={12} color="#D4A84B">SAVE</Text>
    </Frame>
    <Frame name="PrintBtn" x={1120} y={12} w={100} h={36} bg="transparent" stroke="#D4A84B" strokeWidth={1} rounded={2}>
      <Text x={25} y={10} size={12} color="#D4A84B">PRINT</Text>
    </Frame>
    <Frame name="LangToggle" x={1230} y={12} w={60} h={36} bg="transparent" stroke="#666" strokeWidth={1} rounded={2}>
      <Text x={15} y={10} size={12} color="#999">PT</Text>
    </Frame>
  </Frame>

  <!-- LEFT COLUMN - Investigator Info, Attributes, Derived Stats -->
  <Frame name="LeftCol" x={20} y={80} w={320} h={900} bg="transparent">
    
    <!-- Investigator Info Card -->
    <Frame name="InfoCard" x={0} y={0} w={300} h={200} bg="#E8DCC4" stroke="#A41E1E" strokeWidth={3} rounded={2}>
      <Rectangle name="Header" x={0} y={0} w={300} h={6} bg="#A41E1E" />
      <Text name="CardTitle" x={15} y={15} size={18} italic color="#A41E1E">INVESTIGATOR</Text>
      <Rectangle name="TitleLine" x={15} y={40} w={270} h={2} bg="#D4A84B" />
      
      <Text name="L1" x={15} y={55} size={10} weight="bold" color="#8B7355">NAME</Text>
      <Text name="Name" x={15} y={70} size={16} color="#2C1810">Professor Archibald Pemberton</Text>
      
      <Text name="L2" x={15} y={95} size={10} weight="bold" color="#8B7355">OCCUPATION</Text>
      <Text name="Occup" x={15} y={110} size={16} color="#2C1810">Professor</Text>
      
      <Frame name="AgeSex" x={15} y={135} w={270} h={40}>
        <Text name="L3" x={0} y={0} size={10} weight="bold" color="#8B7355">AGE</Text>
        <Text name="Age" x={0} y={15} size={16} color="#2C1810">45</Text>
        <Text name="L4" x={100} y={0} size={10} weight="bold" color="#8B7355">SEX</Text>
        <Text name="Sex" x={100} y={15} size={16} color="#2C1810">M</Text>
      </Frame>
    </Frame>

    <!-- Attributes Card -->
    <Frame name="AttrCard" x={0} y={220} w={300} h={320} bg="#E8DCC4" stroke="#A41E1E" strokeWidth={3} rounded={2}>
      <Rectangle name="Header" x={0} y={0} w={300} h={6} bg="#A41E1E" />
      <Text name="CardTitle" x={15} y={15} size={18} italic color="#A41E1E">ATTRIBUTES</Text>
      <Rectangle name="TitleLine" x={15} y={40} w={270} h={2} bg="#D4A84B" />
      
      <!-- 2x4 Attribute Grid -->
      <Frame name="AttrGrid" x={10} y={55} w={280} h={250}>
        <!-- Row 1 -->
        <Frame name="STR" x={0} y={0} w={130} h={55} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
          <Text x={50} y={5} size={9} weight="bold" color="#A41E1E">STR</Text>
          <Text x={50} y={20} size={22} weight="bold" color="#2C1810">65</Text>
          <Text x={15} y={38} size={8} color="#666">32</Text>
          <Text x={95} y={38} size={8} color="#666">13</Text>
        </Frame>
        <Frame name="CON" x={140} y={0} w={130} h={55} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
          <Text x={50} y={5} size={9} weight="bold" color="#A41E1E">CON</Text>
          <Text x={50} y={20} size={22} weight="bold" color="#2C1810">50</Text>
          <Text x={15} y={38} size={8} color="#666">25</Text>
          <Text x={95} y={38} size={8} color="#666">10</Text>
        </Frame>
        <!-- Row 2 -->
        <Frame name="SIZ" x={0} y={60} w={130} h={55} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
          <Text x={50} y={5} size={9} weight="bold" color="#A41E1E">SIZ</Text>
          <Text x={50} y={20} size={22} weight="bold" color="#2C1810">55</Text>
          <Text x={15} y={38} size={8} color="#666">27</Text>
          <Text x={95} y={38} size={8} color="#666">11</Text>
        </Frame>
        <Frame name="DEX" x={140} y={60} w={130} h={55} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
          <Text x={50} y={5} size={9} weight="bold" color="#A41E1E">DEX</Text>
          <Text x={50} y={20} size={22} weight="bold" color="#2C1810">60</Text>
          <Text x={15} y={38} size={8} color="#666">30</Text>
          <Text x={95} y={38} size={8} color="#666">12</Text>
        </Frame>
        <!-- Row 3 -->
        <Frame name="APP" x={0} y={120} w={130} h={55} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
          <Text x={50} y={5} size={9} weight="bold" color="#A41E1E">APP</Text>
          <Text x={50} y={20} size={22} weight="bold" color="#2C1810">45</Text>
          <Text x={15} y={38} size={8} color="#666">22</Text>
          <Text x={95} y={38} size={8} color="#666">9</Text>
        </Frame>
        <Frame name="INT" x={140} y={120} w={130} h={55} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
          <Text x={50} y={5} size={9} weight="bold" color="#A41E1E">INT</Text>
          <Text x={50} y={20} size={22} weight="bold" color="#2C1810">70</Text>
          <Text x={15} y={38} size={8} color="#666">35</Text>
          <Text x={95} y={38} size={8} color="#666">14</Text>
        </Frame>
        <!-- Row 4 -->
        <Frame name="POW" x={0} y={180} w={130} h={55} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
          <Text x={50} y={5} size={9} weight="bold" color="#A41E1E">POW</Text>
          <Text x={50} y={20} size={22} weight="bold" color="#2C1810">55</Text>
          <Text x={15} y={38} size={8} color="#666">27</Text>
          <Text x={95} y={38} size={8} color="#666">11</Text>
        </Frame>
        <Frame name="EDU" x={140} y={180} w={130} h={55} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
          <Text x={50} y={5} size={9} weight="bold" color="#A41E1E">EDU</Text>
          <Text x={50} y={20} size={22} weight="bold" color="#2C1810">80</Text>
          <Text x={15} y={38} size={8} color="#666">40</Text>
          <Text x={95} y={38} size={8} color="#666">16</Text>
        </Frame>
      </Frame>
    </Frame>

    <!-- Derived Stats Card -->
    <Frame name="StatsCard" x={0} y={560} w={300} h={280} bg="#E8DCC4" stroke="#A41E1E" strokeWidth={3} rounded={2}>
      <Rectangle name="Header" x={0} y={0} w={300} h={6} bg="#A41E1E" />
      <Text name="CardTitle" x={15} y={15} size={18} italic color="#A41E1E">DERIVED STATS</Text>
      <Rectangle name="TitleLine" x={15} y={40} w={270} h={2} bg="#D4A84B" />
      
      <!-- HP -->
      <Frame name="HP" x={15} y={55} w={270} h={35}>
        <Text x={0} y={10} size={11} weight="bold" color="#A41E1E">HP</Text>
        <Frame name="HPVal" x={30} y={5} w={50} h={24} bg="#F5ECD7" stroke="#A41E1E" strokeWidth={1} rounded={2}>
          <Text x={15} y={5} size={14} weight="bold" color="#2C1810">12</Text>
        </Frame>
        <Text x={90} y={10} size={11} color="#666">/ 12</Text>
      </Frame>
      
      <!-- MP -->
      <Frame name="MP" x={15} y={100} w={270} h={35}>
        <Text x={0} y={10} size={11} weight="bold" color="#A41E1E">MP</Text>
        <Frame name="MPVal" x={30} y={5} w={50} h={24} bg="#F5ECD7" stroke="#A41E1E" strokeWidth={1} rounded={2}>
          <Text x={15} y={5} size={14} weight="bold" color="#2C1810">11</Text>
        </Frame>
        <Text x={90} y={10} size={11} color="#666">/ 11</Text>
      </Frame>
      
      <!-- SAN -->
      <Frame name="SAN" x={15} y={145} w={270} h={35}>
        <Text x={0} y={10} size={11} weight="bold" color="#A41E1E">SAN</Text>
        <Frame name="SANVal" x={30} y={5} w={50} h={24} bg="#F5ECD7" stroke="#A41E1E" strokeWidth={1} rounded={2}>
          <Text x={15} y={5} size={14} weight="bold" color="#2C1810">45</Text>
        </Frame>
        <Text x={90} y={10} size={11} color="#666">/ 55</Text>
      </Frame>
      
      <!-- LUCK -->
      <Frame name="Luck" x={15} y={190} w={270} h={35}>
        <Text x={0} y={10} size={11} weight="bold" color="#A41E1E">LUCK</Text>
        <Frame name="LuckVal" x={30} y={5} w={50} h={24} bg="#F5ECD7" stroke="#A41E1E" strokeWidth={1} rounded={2}>
          <Text x={15} y={5} size={14} weight="bold" color="#2C1810">60</Text>
        </Frame>
        <Text x={90} y={10} size={11} color="#666">/ 99</Text>
      </Frame>
      
      <!-- MOV, BUILD, DB -->
      <Frame name="MiscStats" x={15} y={235} w={270} h={30}>
        <Frame name="MOV" x={0} y={0} w={80} h={25} bg="#A41E1E" rounded={2}>
          <Text x={10} y={7} size={10} color="#F5ECD7">MOV 9</Text>
        </Frame>
        <Frame name="BUILD" x={90} y={0} w={80} h={25} bg="#8B7355" rounded={2}>
          <Text x={10} y={7} size={10} color="#F5ECD7">BUILD 0</Text>
        </Frame>
        <Frame name="DB" x={180} y={0} w={80} h={25} bg="#2C1810" rounded={2}>
          <Text x={20} y={7} size={10} color="#D4A84B">DB 0</Text>
        </Frame>
      </Frame>
    </Frame>
  </Frame>

  <!-- CENTER COLUMN - Skills -->
  <Frame name="CenterCol" x={360} y={80} w={550} h={900} bg="transparent">
    <Frame name="SkillsCard" x={0} y={0} w={530} h={860} bg="#E8DCC4" stroke="#A41E1E" strokeWidth={3} rounded={2}>
      <Rectangle name="Header" x={0} y={0} w={530} h={6} bg="#A41E1E" />
      <Text name="CardTitle" x={15} y={15} size={18} italic color="#A41E1E">SKILLS</Text>
      <Rectangle name="TitleLine" x={15} y={40} w={500} h={2} bg="#D4A84B" />
      
      <!-- Skills List (sample) -->
      <Frame name="SkillsList" x={10} y={55} w={510} h={790} bg="transparent">
        <Frame name="Skill1" x={0} y={0} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} stroke="#2C1810" strokeWidth={1} rounded={1} />
          <Text x={25} y={8} size={12} color="#2C1810">Accounting</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#2C1810">25</Text>
          <Text x={415} y={8} size={9} color="#666">12</Text>
          <Text x={445} y={8} size={9} color="#666">5</Text>
        </Frame>
        <Frame name="Skill2" x={0} y={30} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} stroke="#2C1810" strokeWidth={1} rounded={1} />
          <Text x={25} y={8} size={12} color="#2C1810">Anthropology</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#2C1810">5</Text>
          <Text x={415} y={8} size={9} color="#666">2</Text>
          <Text x={445} y={8} size={9} color="#666">1</Text>
        </Frame>
        <Frame name="Skill3" x={0} y={60} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} stroke="#2C1810" strokeWidth={1} rounded={1} />
          <Text x={25} y={8} size={12} color="#2C1810">Appraise</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#2C1810">15</Text>
          <Text x={415} y={8} size={9} color="#666">7</Text>
          <Text x={445} y={8} size={9} color="#666">3</Text>
        </Frame>
        <Frame name="Skill4" x={0} y={90} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} fill="#A41E1E" rounded={1} />
          <Text x={25} y={8} size={12} weight="bold" color="#A41E1E">Archaeology</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#A41E1E">55</Text>
          <Text x={415} y={8} size={9} color="#666">27</Text>
          <Text x={445} y={8} size={9} color="#666">11</Text>
        </Frame>
        <Frame name="Skill5" x={0} y={120} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} stroke="#2C1810" strokeWidth={1} rounded={1} />
          <Text x={25} y={8} size={12} color="#2C1810">Charm</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#2C1810">30</Text>
          <Text x={415} y={8} size={9} color="#666">15</Text>
          <Text x={445} y={8} size={9} color="#666">6</Text>
        </Frame>
        <Frame name="Skill6" x={0} y={150} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} stroke="#2C1810" strokeWidth={1} rounded={1} />
          <Text x={25} y={8} size={12} color="#2C1810">Climb</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#2C1810">40</Text>
          <Text x={415} y={8} size={9} color="#666">20</Text>
          <Text x={445} y={8} size={9} color="#666">8</Text>
        </Frame>
        <Frame name="Skill7" x={0} y={180} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} stroke="#2C1810" strokeWidth={1} rounded={1} />
          <Text x={25} y={8} size={12} color="#2C1810">Credit Rating</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#2C1810">65</Text>
          <Text x={415} y={8} size={9} color="#666">32</Text>
          <Text x={445} y={8} size={9} color="#666">13</Text>
        </Frame>
        <Frame name="Skill8" x={0} y={210} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} stroke="#2C1810" strokeWidth={1} rounded={1} />
          <Text x={25} y={8} size={12} color="#2C1810">Cthulhu Mythos</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#2C1810">0</Text>
          <Text x={415} y={8} size={9} color="#666">0</Text>
          <Text x={445} y={8} size={9} color="#666">0</Text>
        </Frame>
        <Frame name="Skill9" x={0} y={240} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} stroke="#2C1810" strokeWidth={1} rounded={1} />
          <Text x={25} y={8} size={12} color="#2C1810">Disguise</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#2C1810">5</Text>
          <Text x={415} y={8} size={9} color="#666">2</Text>
          <Text x={445} y={8} size={9} color="#666">1</Text>
        </Frame>
        <Frame name="Skill10" x={0} y={270} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} stroke="#2C1810" strokeWidth={1} rounded={1} />
          <Text x={25} y={8} size={12} color="#2C1810">Dodge</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#2C1810">42</Text>
          <Text x={415} y={8} size={9} color="#666">21</Text>
          <Text x={445} y={8} size={9} color="#666">8</Text>
        </Frame>
        <Frame name="Skill11" x={0} y={300} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} stroke="#2C1810" strokeWidth={1} rounded={1} />
          <Text x={25} y={8} size={12} color="#2C1810">Drive Auto</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#2C1810">35</Text>
          <Text x={415} y={8} size={9} color="#666">17</Text>
          <Text x={445} y={8} size={9} color="#666">7</Text>
        </Frame>
        <Frame name="Skill12" x={0} y={330} w={490} h={28}>
          <Rectangle name="Check" x={0} y={5} w={16} h={16} stroke="#2C1810" strokeWidth={1} rounded={1} />
          <Text x={25} y={8} size={12} color="#2C1810">Elec Repair</Text>
          <Text x={380} y={8} size={12} weight="bold" color="#2C1810">20</Text>
          <Text x={415} y={8} size={9} color="#666">10</Text>
          <Text x={445} y={8} size={9} color="#666">4</Text>
        </Frame>
        <!-- More skills... -->
        <Text name="More" x={0} y={380} size={10} color="#8B7355">+ 40 more skills...</Text>
      </Frame>
    </Frame>
  </Frame>

  <!-- RIGHT COLUMN - Backstory, Notes -->
  <Frame name="RightCol" x={930} y={80} w={450} h={900} bg="transparent">
    <Frame name="BackstoryCard" x={0} y={0} w={430} h={550} bg="#E8DCC4" stroke="#A41E1E" strokeWidth={3} rounded={2}>
      <Rectangle name="Header" x={0} y={0} w={430} h={6} bg="#A41E1E" />
      <Text name="CardTitle" x={15} y={15} size={18} italic color="#A41E1E">BACKSTORY</Text>
      <Rectangle name="TitleLine" x={15} y={40} w={400} h={2} bg="#D4A84B" />
      
      <Text name="L1" x={15} y={55} size={10} weight="bold" color="#8B7355">PERSONAL DESCRIPTION</Text>
      <Frame name="TA1" x={15} y={72} w={400} h={50} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
        <Text x={10} y={10} size={11} color="#666">Tall, gaunt, with wild eyes and disheveled hair...</Text>
      </Frame>
      
      <Text name="L2" x={15} y={130} size={10} weight="bold" color="#8B7355">IDEOLOGY/BELIEFS</Text>
      <Frame name="TA2" x={15} y={147} w={400} h={50} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
        <Text x={10} y={10} size={11} color="#666">Rationalist until the incident at the museum...</Text>
      </Frame>
      
      <Text name="L3" x={15} y={205} size={10} weight="bold" color="#8B7355">SIGNIFICANT PEOPLE</Text>
      <Frame name="TA3" x={15} y={222} w={400} h={50} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
        <Text x={10} y={10} size={11} color="#666">Dr. Armitage - mentor and colleague...</Text>
      </Frame>
      
      <Text name="L4" x={15} y={280} size={10} weight="bold" color="#8B7355">MEANINGFUL LOCATIONS</Text>
      <Frame name="TA4" x={15} y={297} w={400} h={50} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
        <Text x={10} y={10} size={11} color="#666">Miskatonic University library...</Text>
      </Frame>
      
      <Text name="L5" x={15} y={355} size={10} weight="bold" color="#8B7355">TREASURED POSSESSIONS</Text>
      <Frame name="TA5" x={15} y={372} w={400} h={50} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
        <Text x={10} y={10} size={11} color="#666">Great old journal, brass compass...</Text>
      </Frame>
      
      <Text name="L6" x={15} y={430} size={10} weight="bold" color="#8B7355">TRAITS</Text>
      <Frame name="TA6" x={15} y={447} w={400} h={50} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
        <Text x={10} y={10} size={11} color="#666">Paranoid but curious, meticulous notes...</Text>
      </Frame>
    </Frame>

    <!-- Notes Card -->
    <Frame name="NotesCard" x={0} y={570} w={430} h={350} bg="#E8DCC4" stroke="#A41E1E" strokeWidth={3} rounded={2}>
      <Rectangle name="Header" x={0} y={0} w={430} h={6} bg="#A41E1E" />
      <Text name="CardTitle" x={15} y={15} size={18} italic color="#A41E1E">NOTES</Text>
      <Rectangle name="TitleLine" x={15} y={40} w={400} h={2} bg="#D4A84B" />
      
      <Frame name="NotesTA" x={15} y={55} w={400} h={280} bg="#F5ECD7" stroke="#2C1810" strokeWidth={1} rounded={2}>
        <Text x={10} y={10} size={11} color="#666">Additional notes, discoveries, encounters...</Text>
      </Frame>
    </Frame>
  </Frame>

</Frame>`;

  const result = renderJSX(graph, jsx, { x: 0, y: 0 });
  console.log("Sheet JSX rendered, result:", JSON.stringify(result, null, 2));
  
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
