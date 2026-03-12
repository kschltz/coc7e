const bg=figma.getNodeById("0:29");
if(!bg){const p=figma.currentPage;const n=figma.createFrame();n.name="LandingArt";n.resize(1440,900);n.x=2000;p.appendChild(n);}
const f=figma.getNodeById("0:29");
const t=figma.createText();
t.name="Title";
t.characters="CALL OF CTHULHU";
t.fontSize=72;
t.fontName={family:"Libre Baskerville",style:"Bold"};
t.fills=[{type:"SOLID",color:{r:0.64,g:0.12,b:0.12}}];
t.x=320;t.y=100;
f.appendChild(t);
t.name;
