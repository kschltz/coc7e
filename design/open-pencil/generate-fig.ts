import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  SceneGraph,
  FigmaAPI,
  computeAllLayouts,
  exportFigFile,
  renderJSX,
} from "/home/kschltz/.bun/install/global/node_modules/@open-pencil/core/src/index.ts";

const OUTPUT_DIR = "/home/kschltz/shared/coc7e/design/open-pencil";
const OUTPUT_FILE = join(OUTPUT_DIR, "coc7e-ui.fig");
const DESIGN_SYSTEM_FILE = join(OUTPUT_DIR, "design-system.jsx");

const landingPageJSX = `
<Frame
  name="Landing Screen"
  w={1440}
  h={1024}
  bg="#E8DCC4"
  flex="col"
  gap={36}
  p={40}
>
  <Frame name="Top Bar" w="fill" h="hug" flex="row" justify="between" items="center">
    <Frame w={120} h={1} bg="#E8DCC4" />
    <Frame
      name="Language Toggle"
      px={12}
      py={8}
      bg="#E8DCC4"
      stroke="#111111"
      strokeWidth={1}
      shadow="2 2 0 #111111"
    >
      <Text font="Courier Prime" size={10} weight="700" color="#111111">EN</Text>
    </Frame>
  </Frame>

  <Frame w="fill" h="hug" flex="col" gap={12} items="center" justify="center" py={24}>
    <Text
      name="App Title"
      font="Cinzel Decorative"
      size={78}
      weight="700"
      color="#D92525"
    >
      CHAMADO DE CTHULHU 7E
    </Text>
    <Text
      name="Subtitle"
      font="IM Fell English"
      size={28}
      weight="700"
      color="#111111"
    >
      FICHA DE INVESTIGADOR
    </Text>
  </Frame>

  <Frame w="fill" h="hug" justify="center" items="center" py={12}>
    <Frame
      name="Quote Card"
      w={1080}
      h="hug"
      flex="col"
      gap={20}
      p={30}
      bg="#111111"
      stroke="#D92525"
      strokeWidth={4}
      shadow="8 8 0 #F2C94C"
      items="center"
    >
      <Text font="IM Fell English" size={30} weight="700" color="#E8DCC4" textAlign="center">
        “A emocao mais antiga e mais forte da humanidade e o medo, e o medo mais antigo e mais forte e o medo do desconhecido.”
      </Text>
      <Text font="Libre Baskerville" size={16} weight="700" color="#F2C94C">
        — H.P. LOVECRAFT
      </Text>
    </Frame>
  </Frame>

  <Frame w="fill" h="hug" flex="row" gap={28} justify="center" items="center" py={10}>
    <Frame
      name="Primary CTA"
      w={300}
      h={86}
      bg="#D92525"
      stroke="#111111"
      strokeWidth={4}
      shadow="6 6 0 #111111"
      flex="row"
      gap={12}
      justify="center"
      items="center"
    >
      <Text font="Courier Prime" size={16} weight="700" color="#F2C94C">[+]</Text>
      <Text font="Libre Baskerville" size={24} weight="700" color="#F2C94C">NOVA FICHA</Text>
    </Frame>

    <Frame
      name="Secondary CTA"
      w={390}
      h={86}
      bg="#F2C94C"
      stroke="#111111"
      strokeWidth={4}
      shadow="6 6 0 #111111"
      flex="row"
      gap={12}
      justify="center"
      items="center"
    >
      <Text font="Courier Prime" size={16} weight="700" color="#111111">[=]</Text>
      <Text font="Libre Baskerville" size={24} weight="700" color="#111111">CARREGAR FICHA JSON</Text>
    </Frame>
  </Frame>

  <Frame w="fill" h="fill" justify="end">
    <Frame w="fill" h="hug" flex="col" gap={18} items="center" pb={24}>
      <Rectangle w={1360} h={2} bg="#D92525" opacity={0.18} />
      <Text font="IM Fell English" size={14} color="#111111">
        Call of Cthulhu is a Trademark of Chaosium Inc. and is used with their permission via the OGL.
      </Text>
    </Frame>
  </Frame>
</Frame>
`;

const wizardPageJSX = `
<Frame
  name="Creation Wizard"
  w={1440}
  h={1024}
  bg="#E8DCC4"
  flex="col"
  gap={26}
  p={40}
>
  <Frame name="Top Bar" w="fill" h="hug" flex="row" justify="between" items="center">
    <Frame w={120} h={1} bg="#E8DCC4" />
    <Frame
      name="Language Toggle"
      px={12}
      py={8}
      bg="#E8DCC4"
      stroke="#111111"
      strokeWidth={1}
      shadow="2 2 0 #111111"
    >
      <Text font="Courier Prime" size={10} weight="700" color="#111111">EN</Text>
    </Frame>
  </Frame>

  <Frame w="fill" h="hug" flex="col" gap={20} items="center">
    <Text font="Cinzel Decorative" size={56} weight="700" color="#D92525">NOVA FICHA</Text>

    <Frame flex="row" gap={14} items="center" justify="center">
      <Frame bg="#F2C94C" stroke="#111111" strokeWidth={3} shadow="3 3 0 #111111" px={20} py={10}>
        <Text font="Libre Baskerville" size={20} weight="700" color="#D92525">1. CONCEITO</Text>
      </Frame>
      <Text font="Libre Baskerville" size={18} color="#7D776A">/</Text>
      <Text font="Libre Baskerville" size={20} color="#7D776A">2. ATRIBUTOS</Text>
      <Text font="Libre Baskerville" size={18} color="#7D776A">/</Text>
      <Text font="Libre Baskerville" size={20} color="#7D776A">3. IDADE</Text>
      <Text font="Libre Baskerville" size={18} color="#7D776A">/</Text>
      <Text font="Libre Baskerville" size={20} color="#7D776A">4. OCUPACAO</Text>
      <Text font="Libre Baskerville" size={18} color="#7D776A">/</Text>
      <Text font="Libre Baskerville" size={20} color="#7D776A">5. PERICIAS</Text>
    </Frame>

    <Frame flex="row" gap={14} items="center" justify="center">
      <Text font="Libre Baskerville" size={20} color="#7D776A">6. HISTORICO</Text>
      <Text font="Libre Baskerville" size={18} color="#7D776A">/</Text>
      <Text font="Libre Baskerville" size={20} color="#7D776A">7. REVISAO</Text>
    </Frame>
  </Frame>

  <Frame
    name="Wizard Panel"
    w="fill"
    h="hug"
    flex="col"
    gap={28}
    p={36}
    bg="#E8DCC4"
    stroke="#111111"
    strokeWidth={5}
    shadow="10 10 0 #111111"
  >
    <Rectangle w={1360} h={8} bg="#D92525" stroke="#111111" strokeWidth={3} />
    <Frame flex="col" gap={18}>
      <Text font="IM Fell English" size={36} weight="700" color="#D92525">Conceito</Text>
      <Rectangle w={1288} h={3} bg="#111111" />
    </Frame>

    <Frame flex="col" gap={28}>
      <Frame flex="row" gap={28}>
        <Frame w={620} h="hug" flex="col" gap={10}>
          <Text font="Libre Baskerville" size={18} weight="700" color="#111111">NOME *</Text>
          <Frame w={620} h={56} bg="#E8DCC4" stroke="#111111" strokeWidth={4} px={14} justify="center">
            <Text font="Libre Baskerville" size={18} weight="700" color="#7D776A">Joao Ninguem</Text>
          </Frame>
        </Frame>
        <Frame w={620} h="hug" flex="col" gap={10}>
          <Text font="Libre Baskerville" size={18} weight="700" color="#111111">JOGADOR</Text>
          <Frame w={620} h={56} bg="#E8DCC4" stroke="#111111" strokeWidth={4} px={14} justify="center">
            <Text font="Libre Baskerville" size={18} weight="700" color="#7D776A">Seu Nome</Text>
          </Frame>
        </Frame>
      </Frame>

      <Frame flex="row" gap={28}>
        <Frame w={620} h="hug" flex="col" gap={10}>
          <Text font="Libre Baskerville" size={18} weight="700" color="#111111">OCUPACAO *</Text>
          <Frame w={620} h={56} bg="#E8DCC4" stroke="#111111" strokeWidth={4} px={14} flex="row" justify="between" items="center">
            <Text font="Libre Baskerville" size={18} weight="700" color="#111111">Selecione a Ocupacao...</Text>
            <Text font="Courier Prime" size={18} weight="700" color="#111111">v</Text>
          </Frame>
        </Frame>
        <Frame w={620} h="hug" flex="col" gap={10}>
          <Text font="Libre Baskerville" size={18} weight="700" color="#111111">SEXO</Text>
          <Frame w={620} h={56} bg="#E8DCC4" stroke="#111111" strokeWidth={4} px={14} justify="center">
            <Text font="Libre Baskerville" size={18} weight="700" color="#7D776A">M/F/Outro</Text>
          </Frame>
        </Frame>
      </Frame>

      <Frame flex="row" gap={28}>
        <Frame w={620} h="hug" flex="col" gap={10}>
          <Text font="Libre Baskerville" size={18} weight="700" color="#111111">RESIDENCIA</Text>
          <Frame w={620} h={56} bg="#E8DCC4" stroke="#111111" strokeWidth={4} px={14} justify="center">
            <Text font="Libre Baskerville" size={18} weight="700" color="#7D776A">Arkham, MA</Text>
          </Frame>
        </Frame>
        <Frame w={620} h="hug" flex="col" gap={10}>
          <Text font="Libre Baskerville" size={18} weight="700" color="#111111">LOCAL DE NASCIMENTO</Text>
          <Frame w={620} h={56} bg="#E8DCC4" stroke="#111111" strokeWidth={4} px={14} justify="center">
            <Text font="Libre Baskerville" size={18} weight="700" color="#7D776A">Sao Paulo, SP</Text>
          </Frame>
        </Frame>
      </Frame>
    </Frame>
  </Frame>

  <Frame w="fill" h="hug" flex="col" gap={24} pt={8}>
    <Frame flex="row" gap={18} items="center" justify="center">
      <Rectangle w={662} h={2} bg="#111111" />
      <Rectangle w={16} h={16} bg="#D92525" stroke="#111111" strokeWidth={2} rotate={45} />
      <Rectangle w={662} h={2} bg="#111111" />
    </Frame>

    <Frame w="fill" h="hug" flex="row" justify="between" items="center">
      <Frame w={180} h={72} bg="#F2C94C" stroke="#7D776A" strokeWidth={4} shadow="6 6 0 #7D776A" justify="center" items="center">
        <Text font="Libre Baskerville" size={22} weight="700" color="#7D776A">VOLTAR</Text>
      </Frame>
      <Frame w={220} h={72} bg="#E3A08E" stroke="#7D776A" strokeWidth={4} shadow="6 6 0 #7D776A" justify="center" items="center">
        <Text font="Libre Baskerville" size={22} weight="700" color="#F2C94C">PROXIMO</Text>
      </Frame>
    </Frame>
  </Frame>

  <Frame w="fill" h="fill" justify="end">
    <Frame w="fill" h="hug" flex="col" gap={18} items="center" pb={24}>
      <Rectangle w={1360} h={2} bg="#D92525" opacity={0.18} />
      <Text font="IM Fell English" size={14} color="#111111">
        Call of Cthulhu is a Trademark of Chaosium Inc. and is used with their permission via the OGL.
      </Text>
    </Frame>
  </Frame>
</Frame>
`;

const sheetPageJSX = `
<Frame
  name="Investigator Sheet"
  w={1440}
  h={2600}
  bg="#E8DCC4"
  flex="col"
  gap={22}
  p={20}
>
  <Frame w="fill" h="hug" flex="row" justify="between" items="center" pb={6}>
    <Frame flex="row" gap={10} items="center">
      <Text font="Libre Baskerville" size={16} weight="700" color="#111111">← Voltar</Text>
    </Frame>
    <Frame flex="row" gap={14} items="center">
      <Frame bg="#F2C94C" stroke="#111111" strokeWidth={3} shadow="4 4 0 #111111" px={14} py={8}><Text font="Libre Baskerville" size={14} weight="700" color="#111111">MODO EDICAO</Text></Frame>
      <Frame bg="#F2C94C" stroke="#111111" strokeWidth={3} shadow="4 4 0 #111111" px={14} py={8}><Text font="Libre Baskerville" size={14} weight="700" color="#111111">SALVAR JSON</Text></Frame>
      <Frame bg="#F2C94C" stroke="#111111" strokeWidth={3} shadow="4 4 0 #111111" px={14} py={8}><Text font="Libre Baskerville" size={14} weight="700" color="#111111">IMPRIMIR</Text></Frame>
      <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={1} shadow="2 2 0 #111111" px={8} py={6}><Text font="Courier Prime" size={10} weight="700" color="#111111">EN</Text></Frame>
    </Frame>
  </Frame>

  <Frame w="fill" h="hug" flex="row" gap={18} items="start">
    <Frame w={360} h="hug" flex="col" gap={18}>
      <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={4} shadow="6 6 0 #111111" p={18} flex="col" gap={16}>
        <Rectangle w={324} h={8} bg="#D92525" stroke="#111111" strokeWidth={3} />
        <Text font="IM Fell English" size={28} weight="700" color="#D92525">Investigador</Text>
        <Rectangle w={324} h={3} bg="#111111" />
        <Frame flex="col" gap={10}>
          <Text font="Libre Baskerville" size={12} weight="700" color="#111111">NOME</Text>
          <Text font="Libre Baskerville" size={22} weight="700" color="#111111">Dra. Helena Azevedo</Text>
          <Rectangle w={324} h={1} bg="#111111" opacity={0.2} />
          <Text font="Libre Baskerville" size={12} weight="700" color="#111111">OCUPACAO</Text>
          <Text font="Libre Baskerville" size={18} weight="700" color="#111111">Medica</Text>
          <Rectangle w={324} h={1} bg="#111111" opacity={0.2} />
          <Frame flex="row" gap={18}>
            <Frame w={153} h="hug" flex="col" gap={6}>
              <Text font="Libre Baskerville" size={12} weight="700" color="#111111">IDADE</Text>
              <Text font="Libre Baskerville" size={18} weight="700" color="#111111">34</Text>
            </Frame>
            <Frame w={153} h="hug" flex="col" gap={6}>
              <Text font="Libre Baskerville" size={12} weight="700" color="#111111">SEXO</Text>
              <Text font="Libre Baskerville" size={18} weight="700" color="#111111">F</Text>
            </Frame>
          </Frame>
        </Frame>
      </Frame>

      <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={4} shadow="6 6 0 #111111" p={18} flex="col" gap={16}>
        <Rectangle w={324} h={8} bg="#D92525" stroke="#111111" strokeWidth={3} />
        <Text font="IM Fell English" size={28} weight="700" color="#D92525">Atributos</Text>
        <Rectangle w={324} h={3} bg="#111111" />
        <Frame flex="row" gap={10}>
          <Frame w={157} h="hug" flex="col" gap={10}>
            <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={2} shadow="3 3 0 #111111" p={10} flex="col" gap={4}><Text font="Libre Baskerville" size={11} weight="700" color="#D92525">FOR</Text><Text font="Courier Prime" size={28} weight="700" color="#111111">55</Text><Frame flex="row" justify="between"><Text font="Courier Prime" size={10} color="#111111">27</Text><Text font="Courier Prime" size={10} color="#111111">11</Text></Frame></Frame>
            <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={2} shadow="3 3 0 #111111" p={10} flex="col" gap={4}><Text font="Libre Baskerville" size={11} weight="700" color="#D92525">TAM</Text><Text font="Courier Prime" size={28} weight="700" color="#111111">65</Text><Frame flex="row" justify="between"><Text font="Courier Prime" size={10} color="#111111">32</Text><Text font="Courier Prime" size={10} color="#111111">13</Text></Frame></Frame>
            <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={2} shadow="3 3 0 #111111" p={10} flex="col" gap={4}><Text font="Libre Baskerville" size={11} weight="700" color="#D92525">APA</Text><Text font="Courier Prime" size={28} weight="700" color="#111111">70</Text><Frame flex="row" justify="between"><Text font="Courier Prime" size={10} color="#111111">35</Text><Text font="Courier Prime" size={10} color="#111111">14</Text></Frame></Frame>
            <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={2} shadow="3 3 0 #111111" p={10} flex="col" gap={4}><Text font="Libre Baskerville" size={11} weight="700" color="#D92525">POD</Text><Text font="Courier Prime" size={28} weight="700" color="#111111">75</Text><Frame flex="row" justify="between"><Text font="Courier Prime" size={10} color="#111111">37</Text><Text font="Courier Prime" size={10} color="#111111">15</Text></Frame></Frame>
          </Frame>
          <Frame w={157} h="hug" flex="col" gap={10}>
            <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={2} shadow="3 3 0 #111111" p={10} flex="col" gap={4}><Text font="Libre Baskerville" size={11} weight="700" color="#D92525">CON</Text><Text font="Courier Prime" size={28} weight="700" color="#111111">60</Text><Frame flex="row" justify="between"><Text font="Courier Prime" size={10} color="#111111">30</Text><Text font="Courier Prime" size={10} color="#111111">12</Text></Frame></Frame>
            <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={2} shadow="3 3 0 #111111" p={10} flex="col" gap={4}><Text font="Libre Baskerville" size={11} weight="700" color="#D92525">DES</Text><Text font="Courier Prime" size={28} weight="700" color="#111111">50</Text><Frame flex="row" justify="between"><Text font="Courier Prime" size={10} color="#111111">25</Text><Text font="Courier Prime" size={10} color="#111111">10</Text></Frame></Frame>
            <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={2} shadow="3 3 0 #111111" p={10} flex="col" gap={4}><Text font="Libre Baskerville" size={11} weight="700" color="#D92525">INT</Text><Text font="Courier Prime" size={28} weight="700" color="#111111">80</Text><Frame flex="row" justify="between"><Text font="Courier Prime" size={10} color="#111111">40</Text><Text font="Courier Prime" size={10} color="#111111">16</Text></Frame></Frame>
            <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={2} shadow="3 3 0 #111111" p={10} flex="col" gap={4}><Text font="Libre Baskerville" size={11} weight="700" color="#D92525">EDU</Text><Text font="Courier Prime" size={28} weight="700" color="#111111">85</Text><Frame flex="row" justify="between"><Text font="Courier Prime" size={10} color="#111111">42</Text><Text font="Courier Prime" size={10} color="#111111">17</Text></Frame></Frame>
          </Frame>
        </Frame>
      </Frame>

      <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={4} shadow="6 6 0 #111111" p={18} flex="col" gap={16}>
        <Rectangle w={324} h={8} bg="#D92525" stroke="#111111" strokeWidth={3} />
        <Text font="IM Fell English" size={28} weight="700" color="#D92525">Estatisticas Derivadas</Text>
        <Rectangle w={324} h={3} bg="#111111" />
        <Frame flex="col" gap={12}>
          <Frame flex="row" justify="between" items="center"><Text font="Libre Baskerville" size={13} weight="700" color="#D92525">Pontos de Vida</Text><Frame flex="row" gap={8} items="center"><Frame w={34} h={24} stroke="#D92525" strokeWidth={2} justify="center" items="center"><Text font="Courier Prime" size={14} weight="700" color="#111111">12</Text></Frame><Text font="Courier Prime" size={14} color="#111111">/ 12</Text></Frame></Frame>
          <Frame flex="row" justify="between" items="center"><Text font="Libre Baskerville" size={13} weight="700" color="#D92525">Pontos de Magia</Text><Frame flex="row" gap={8} items="center"><Frame w={34} h={24} stroke="#D92525" strokeWidth={2} justify="center" items="center"><Text font="Courier Prime" size={14} weight="700" color="#111111">15</Text></Frame><Text font="Courier Prime" size={14} color="#111111">/ 15</Text></Frame></Frame>
          <Frame flex="row" justify="between" items="center"><Text font="Libre Baskerville" size={13} weight="700" color="#D92525">Sanidade</Text><Frame flex="row" gap={8} items="center"><Frame w={34} h={24} stroke="#D92525" strokeWidth={2} justify="center" items="center"><Text font="Courier Prime" size={14} weight="700" color="#111111">75</Text></Frame><Text font="Courier Prime" size={14} color="#111111">/ 99</Text></Frame></Frame>
          <Frame flex="row" justify="between" items="center"><Text font="Libre Baskerville" size={13} weight="700" color="#D92525">Sorte</Text><Frame flex="row" gap={8} items="center"><Frame w={34} h={24} stroke="#D92525" strokeWidth={2} justify="center" items="center"><Text font="Courier Prime" size={14} weight="700" color="#111111">62</Text></Frame><Text font="Courier Prime" size={14} color="#111111">/ 99</Text></Frame></Frame>
          <Frame flex="row" justify="between" pt={8}>
            <Frame items="center"><Text font="Libre Baskerville" size={10} weight="700" color="#D92525">TAXA DE MOVIMENTO</Text><Text font="Courier Prime" size={24} weight="700" color="#111111">7</Text></Frame>
            <Frame items="center"><Text font="Libre Baskerville" size={10} weight="700" color="#D92525">CORPO</Text><Text font="Courier Prime" size={24} weight="700" color="#111111">0</Text></Frame>
            <Frame items="center"><Text font="Libre Baskerville" size={10} weight="700" color="#D92525">DANO EXTRA</Text><Text font="Courier Prime" size={24} weight="700" color="#111111">0</Text></Frame>
          </Frame>
        </Frame>
      </Frame>
    </Frame>

    <Frame w={470} h="hug" bg="#E8DCC4" stroke="#111111" strokeWidth={4} shadow="6 6 0 #111111" p={18} flex="col" gap={16}>
      <Rectangle w={434} h={8} bg="#D92525" stroke="#111111" strokeWidth={3} />
      <Text font="IM Fell English" size={28} weight="700" color="#D92525">Pericias</Text>
      <Rectangle w={434} h={3} bg="#111111" />
      <Frame flex="row" gap={18} items="start">
        <Frame w={208} h="hug" flex="col" gap={8}>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Primeiros Socorros</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">70</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Encontrar Livros</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">75</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Escutar</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">48</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Medicina</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">80</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Ocultismo</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">20</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Persuasao</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">45</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Psicologia</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">55</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Encontrar</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">52</Text></Frame>
        </Frame>
        <Frame w={208} h="hug" flex="col" gap={8}>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Ciencia (Biologia)</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">61</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Lingua (Nativa)</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">85</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Lutar (Briga)</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">25</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Navegacao</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">10</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Pilotar</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">1</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Prestidigitacao</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">10</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Sobrevivencia</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">10</Text></Frame>
          <Frame flex="row" justify="between"><Text font="Libre Baskerville" size={12} weight="700" color="#111111">Rastrear</Text><Text font="Courier Prime" size={12} weight="700" color="#111111">10</Text></Frame>
        </Frame>
      </Frame>
    </Frame>

    <Frame w={536} h="hug" flex="col" gap={18}>
      <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={4} shadow="6 6 0 #111111" p={18} flex="col" gap={16}>
        <Rectangle w={500} h={8} bg="#D92525" stroke="#111111" strokeWidth={3} />
        <Text font="IM Fell English" size={28} weight="700" color="#D92525">Historico</Text>
        <Rectangle w={500} h={3} bg="#111111" />
        <Frame flex="col" gap={14}>
          <Frame flex="col" gap={6}><Text font="Libre Baskerville" size={11} weight="700" color="#111111">DESCRICAO PESSOAL</Text><Text font="IM Fell English" size={16} color="#111111">A physician with a precise gaze and an exhausted notebook.</Text></Frame>
          <Frame flex="col" gap={6}><Text font="Libre Baskerville" size={11} weight="700" color="#111111">IDEOLOGIA / CRENCAS</Text><Text font="IM Fell English" size={16} color="#111111">Knowledge must be preserved, even when it wounds.</Text></Frame>
          <Frame flex="col" gap={6}><Text font="Libre Baskerville" size={11} weight="700" color="#111111">PESSOAS SIGNIFICATIVAS</Text><Text font="IM Fell English" size={16} color="#111111">Professor Almeida, mentor in forensic medicine.</Text></Frame>
          <Frame flex="col" gap={6}><Text font="Libre Baskerville" size={11} weight="700" color="#111111">LOCAIS IMPORTANTES</Text><Text font="IM Fell English" size={16} color="#111111">The restricted stacks beneath Miskatonic Library.</Text></Frame>
          <Frame flex="col" gap={6}><Text font="Libre Baskerville" size={11} weight="700" color="#111111">POSSES QUERIDAS</Text><Text font="IM Fell English" size={16} color="#111111">A silver fountain pen and a weathered anatomy text.</Text></Frame>
          <Frame flex="col" gap={6}><Text font="Libre Baskerville" size={11} weight="700" color="#111111">TRACOS</Text><Text font="IM Fell English" size={16} color="#111111">Composed, skeptical, relentlessly curious.</Text></Frame>
        </Frame>
      </Frame>

      <Frame bg="#E8DCC4" stroke="#111111" strokeWidth={4} shadow="6 6 0 #111111" p={18} flex="col" gap={16}>
        <Rectangle w={500} h={8} bg="#D92525" stroke="#111111" strokeWidth={3} />
        <Text font="IM Fell English" size={28} weight="700" color="#D92525">Anotacoes</Text>
        <Rectangle w={500} h={3} bg="#111111" />
        <Text font="IM Fell English" size={16} color="#111111">Tracking a pattern of impossible injuries tied to river fog.</Text>
        <Frame w={500} h={190} bg="#E8DCC4" />
      </Frame>
    </Frame>
  </Frame>

  <Frame w="fill" h="fill" justify="end">
    <Frame w="fill" h="hug" flex="col" gap={18} items="center" pb={22}>
      <Text font="IM Fell English" size={14} color="#111111">
        Call of Cthulhu is a Trademark of Chaosium Inc. and is used with their permission via the OGL.
      </Text>
    </Frame>
  </Frame>
</Frame>
`;

async function renderPage(figma: FigmaAPI, name: string, jsx: string, reuseCurrent = false) {
  const page = reuseCurrent ? figma.currentPage : figma.createPage();
  page.name = name;
  figma.currentPage = page;
  renderJSX(figma.graph, jsx, { parentId: page.id, x: 0, y: 0 });
}

async function main() {
  await mkdir(dirname(OUTPUT_FILE), { recursive: true });

  const graph = new SceneGraph();
  const figma = new FigmaAPI(graph);
  const designSystemJSX = await readFile(DESIGN_SYSTEM_FILE, "utf8");

  await renderPage(figma, "Landing", landingPageJSX, true);
  await renderPage(figma, "Wizard", wizardPageJSX);
  await renderPage(figma, "Sheet", sheetPageJSX);
  await renderPage(figma, "Design System", designSystemJSX);

  computeAllLayouts(graph);
  const data = await exportFigFile(graph);
  await writeFile(OUTPUT_FILE, new Uint8Array(data));

  console.log(JSON.stringify({ output: OUTPUT_FILE, bytes: data.byteLength }, null, 2));
}

await main();
