<Frame
  name="CoC7e Design System"
  w={1600}
  h={2400}
  bg="#E8DCC4"
  flex="col"
  gap={32}
  p={48}
>
  <Text
    name="System Title"
    font="Cinzel Decorative"
    size={36}
    weight="700"
    color="#D92525"
  >
    Call of Cthulhu 7e - Design System
  </Text>

  <Text
    name="System Subtitle"
    font="IM Fell English"
    size={18}
    color="#111111"
  >
    Extracted from the current React UI and organized for OpenPencil editing.
  </Text>

  <Frame name="Color Tokens" flex="col" gap={16} p={24} stroke="#111111" strokeWidth={4}>
    <Text font="Cinzel Decorative" size={24} weight="700" color="#8B1A1A">
      Color Tokens
    </Text>

    <Frame flex="row" gap={16}>
      <Frame name="weird-red" w={220} h="hug" flex="col" gap={8}>
        <Rectangle w={220} h={88} bg="#D92525" stroke="#111111" strokeWidth={3} />
        <Text font="Courier Prime" size={14} color="#111111">weird-red / #D92525</Text>
      </Frame>
      <Frame name="weird-darkred" w={220} h="hug" flex="col" gap={8}>
        <Rectangle w={220} h={88} bg="#8B1A1A" stroke="#111111" strokeWidth={3} />
        <Text font="Courier Prime" size={14} color="#111111">weird-darkred / #8B1A1A</Text>
      </Frame>
      <Frame name="weird-yellow" w={220} h="hug" flex="col" gap={8}>
        <Rectangle w={220} h={88} bg="#F2C94C" stroke="#111111" strokeWidth={3} />
        <Text font="Courier Prime" size={14} color="#111111">weird-yellow / #F2C94C</Text>
      </Frame>
    </Frame>

    <Frame flex="row" gap={16}>
      <Frame name="weird-black" w={220} h="hug" flex="col" gap={8}>
        <Rectangle w={220} h={88} bg="#111111" stroke="#111111" strokeWidth={3} />
        <Text font="Courier Prime" size={14} color="#111111">weird-black / #111111</Text>
      </Frame>
      <Frame name="weird-paper" w={220} h="hug" flex="col" gap={8}>
        <Rectangle w={220} h={88} bg="#E8DCC4" stroke="#111111" strokeWidth={3} />
        <Text font="Courier Prime" size={14} color="#111111">weird-paper / #E8DCC4</Text>
      </Frame>
      <Frame name="weird-border" w={220} h="hug" flex="col" gap={8}>
        <Rectangle w={220} h={88} bg="#3A2A18" stroke="#111111" strokeWidth={3} />
        <Text font="Courier Prime" size={14} color="#111111">weird-border / #3A2A18</Text>
      </Frame>
    </Frame>

    <Text font="Libre Baskerville" size={14} color="#111111">
      Overlay tokens in code use transparent black and red variants for texture, borders, selection, and ghost states.
    </Text>
  </Frame>

  <Frame name="Typography" flex="col" gap={20} p={24} stroke="#111111" strokeWidth={4}>
    <Text font="Cinzel Decorative" size={24} weight="700" color="#8B1A1A">
      Typography
    </Text>

    <Frame flex="col" gap={12}>
      <Text font="Cinzel Decorative" size={48} weight="700" color="#D92525">
        Display / Cinzel Decorative Bold
      </Text>
      <Text font="IM Fell English" size={28} color="#111111">
        Accent / IM Fell English Italic-inspired subtitle treatment
      </Text>
      <Text font="Libre Baskerville" size={18} weight="700" color="#111111">
        Body / Libre Baskerville Bold for labels and structured sheet content
      </Text>
      <Text font="Libre Baskerville" size={16} color="#111111">
        Body regular copy stays literary and print-like rather than neutral SaaS.
      </Text>
      <Text font="Courier Prime" size={14} color="#111111">
        Mono / Courier Prime for utility labels, codes, and compact toggles
      </Text>
    </Frame>
  </Frame>

  <Frame name="Buttons" flex="col" gap={20} p={24} stroke="#111111" strokeWidth={4}>
    <Text font="Cinzel Decorative" size={24} weight="700" color="#8B1A1A">
      Buttons
    </Text>

    <Frame flex="row" gap={24}>
      <Frame
        name="Pulp Button / Default"
        w={250}
        h={56}
        bg="#D92525"
        stroke="#111111"
        strokeWidth={3}
        shadow="4 4 0 #111111"
        justify="center"
        items="center"
      >
        <Text font="Libre Baskerville" size={14} weight="700" color="#F2C94C">
          DEFAULT BUTTON
        </Text>
      </Frame>

      <Frame
        name="Pulp Button / Outline"
        w={250}
        h={56}
        bg="#F2C94C"
        stroke="#111111"
        strokeWidth={3}
        shadow="4 4 0 #111111"
        justify="center"
        items="center"
      >
        <Text font="Libre Baskerville" size={14} weight="700" color="#111111">
          OUTLINE BUTTON
        </Text>
      </Frame>

      <Frame
        name="Pulp Button / Ghost"
        w={250}
        h={56}
        bg="#E8DCC4"
        stroke="#111111"
        strokeWidth={2}
        justify="center"
        items="center"
      >
        <Text font="Libre Baskerville" size={14} weight="700" color="#111111">
          GHOST BUTTON
        </Text>
      </Frame>
    </Frame>

    <Text font="Courier Prime" size={13} color="#111111">
      Motion note: hover shifts 2px down-right, active shifts 4px and collapses the drop shadow.
    </Text>
  </Frame>

  <Frame name="Fields" flex="col" gap={20} p={24} stroke="#111111" strokeWidth={4}>
    <Text font="Cinzel Decorative" size={24} weight="700" color="#8B1A1A">
      Fields
    </Text>

    <Frame flex="row" gap={24} items="end">
      <Frame name="Input" w={320} h="hug" flex="col" gap={8}>
        <Text font="Libre Baskerville" size={14} weight="700" color="#111111">Input</Text>
        <Frame w={320} h={32} bg="#E8DCC4" stroke="#111111" strokeWidth={2} shadow="2 2 0 #111111" items="center" px={8}>
          <Text font="Libre Baskerville" size={14} weight="700" color="#111111">Investigator Name</Text>
        </Frame>
      </Frame>

      <Frame name="Select" w={320} h="hug" flex="col" gap={8}>
        <Text font="Libre Baskerville" size={14} weight="700" color="#111111">Select</Text>
        <Frame w={320} h={32} bg="#E8DCC4" stroke="#111111" strokeWidth={2} shadow="2 2 0 #111111" items="center" justify="between" px={8}>
          <Text font="Libre Baskerville" size={14} weight="700" color="#111111">Occupation</Text>
          <Text font="Courier Prime" size={14} color="#111111">v</Text>
        </Frame>
      </Frame>
    </Frame>

    <Frame flex="row" gap={24} items="center">
      <Frame name="Checkbox" flex="row" gap={12} items="center">
        <Frame w={20} h={20} bg="#E8DCC4" stroke="#111111" strokeWidth={2} shadow="2 2 0 #111111" justify="center" items="center">
          <Text font="Courier Prime" size={14} weight="700" color="#D92525">X</Text>
        </Frame>
        <Text font="Libre Baskerville" size={14} weight="700" color="#111111">Checked state</Text>
      </Frame>

      <Frame name="Badge" bg="#8B1A1A" px={8} py={4}>
        <Text font="Libre Baskerville" size={12} weight="700" color="#E8DCC4">TAG</Text>
      </Frame>

      <Frame name="Language Toggle" bg="#E8DCC4" stroke="#111111" strokeWidth={1} shadow="1 1 0 #111111" px={8} py={4}>
        <Text font="Courier Prime" size={10} weight="700" color="#111111">EN</Text>
      </Frame>
    </Frame>
  </Frame>

  <Frame name="Surfaces" flex="col" gap={20} p={24} stroke="#111111" strokeWidth={4}>
    <Text font="Cinzel Decorative" size={24} weight="700" color="#8B1A1A">
      Surfaces
    </Text>

    <Frame flex="row" gap={24}>
      <Frame
        name="Quote Card"
        w={480}
        h="hug"
        flex="col"
        gap={12}
        p={24}
        bg="#111111"
        stroke="#D92525"
        strokeWidth={3}
        shadow="6 6 0 #F2C94C"
      >
        <Text font="IM Fell English" size={24} color="#E8DCC4">
          The oldest and strongest emotion of mankind is fear.
        </Text>
        <Text font="Libre Baskerville" size={12} weight="700" color="#F2C94C">
          H. P. LOVECRAFT
        </Text>
      </Frame>

      <Frame
        name="Wizard Panel"
        w={520}
        h="hug"
        flex="col"
        gap={16}
        p={24}
        bg="#E8DCC4"
        stroke="#111111"
        strokeWidth={4}
        shadow="8 8 0 #111111"
      >
        <Rectangle w={472} h={8} bg="#D92525" stroke="#111111" strokeWidth={3} />
        <Text font="Cinzel Decorative" size={20} weight="700" color="#8B1A1A">
          Structured Content Panel
        </Text>
        <Text font="Libre Baskerville" size={15} color="#111111">
          Used by the creation wizard and sheet editing views. Heavy borders and offset shadows keep the pulp print aesthetic.
        </Text>
      </Frame>
    </Frame>

    <Frame name="Divider" flex="row" gap={12} items="center" w={520}>
      <Rectangle w={244} h={2} bg="#111111" />
      <Rectangle w={12} h={12} bg="#D92525" stroke="#111111" strokeWidth={2} rotate={45} />
      <Rectangle w={244} h={2} bg="#111111" />
    </Frame>
  </Frame>

  <Frame name="Usage Rules" flex="col" gap={10} p={24} stroke="#111111" strokeWidth={4}>
    <Text font="Cinzel Decorative" size={24} weight="700" color="#8B1A1A">
      Usage Rules
    </Text>
    <Text font="Libre Baskerville" size={15} color="#111111">
      1. Keep all primary actions red with yellow text and hard black shadows.
    </Text>
    <Text font="Libre Baskerville" size={15} color="#111111">
      2. Use paper backgrounds and heavy black borders instead of soft cards.
    </Text>
    <Text font="Libre Baskerville" size={15} color="#111111">
      3. Reserve IM Fell English for mood and quotes, not dense data tables.
    </Text>
    <Text font="Libre Baskerville" size={15} color="#111111">
      4. Preserve the print-horror tone; avoid generic rounded SaaS treatments.
    </Text>
  </Frame>
</Frame>
