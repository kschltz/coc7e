const p=figma.currentPage;
const bg=figma.createFrame();
bg.name="Landing Art Nouveau";
bg.resize(1440,900);
bg.x=2000;
bg.y=0;
bg.fills=[{type:"SOLID",color:{r:0.96,g:0.93,b:0.84}}];
p.appendChild(bg);

const t=figma.createText();
t.name="Title";
t.characters="CALL OF CTHULHU";
t.fontSize=72;
t.fontName={family:"Libre Baskerville",style:"Bold"};
t.fills=[{type:"SOLID",color:{r:0.64,g:0.12,b:0.12}}];
t.x=320;t.y=100;
bg.appendChild(t);

const s=figma.createText();
s.name="Subtitle";
s.characters="7th Edition Investigator Sheet";
s.fontSize=28;
s.fontName={family:"Libre Baskerville",style:"Italic"};
s.fills=[{type:"SOLID",color:{r:0.17,g:0.09,b:0.06}}];
s.x=420;s.y=200;
bg.appendChild(s);

const line1=figma.createRectangle();
line1.name="LineLeft";
line1.resize(180,3);
line1.x=320;line1.y=140;
line1.fills=[{type:"SOLID",color:{r:0.83,g:0.66,b:0.29}}];
bg.appendChild(line1);

const line2=figma.createRectangle();
line2.name="LineRight";
line2.resize(180,3);
line2.x=940;line2.y=140;
line2.fills=[{type:"SOLID",color:{r:0.83,g:0.66,b:0.29}}];
bg.appendChild(line2);

const d=figma.createStar();
d.name="Diamond";
d.resize(20,20);
d.x=710;d.y=135;
d.fills=[{type:"SOLID",color:{r:0.83,g:0.66,b:0.29}}];
d.rotation=45;d.points=4;
bg.appendChild(d);

const qb=figma.createFrame();
qb.name="QuoteBox";
qb.resize(600,150);
qb.x=420;qb.y=280;
qb.fills=[{type:"SOLID",color:{r:0.07,g:0.07,b:0.07}}];
qb.strokes=[{type:"SOLID",color:{r:0.64,g:0.12,b:0.12}}];
qb.strokeWeight=3;
qb.cornerRadius=2;
bg.appendChild(qb);

const qt=figma.createText();
qt.name="Quote";
qt.characters="The oldest and strongest emotion of mankind is fear";
qt.fontSize=18;
qt.fontName={family:"Libre Baskerville",style:"Italic"};
qt.fills=[{type:"SOLID",color:{r:0.96,g:0.93,b:0.84}}];
qt.x=40;qt.y=30;
qt.resize(520,60);
qt.textAlignHorizontal="CENTER";
qb.appendChild(qt);

const auth=figma.createText();
auth.name="Author";
auth.characters="— H. P. Lovecraft";
auth.fontSize=14;
auth.fontName={family:"Libre Baskerville",style:"Regular"};
auth.fills=[{type:"SOLID",color:{r:0.83,g:0.66,b:0.29}}];
auth.x=640;auth.y=410;
bg.appendChild(auth);

const bn=figma.createFrame();
bn.name="BtnNew";
bn.resize(240,60);
bn.x=460;bn.y=480;
bn.fills=[{type:"SOLID",color:{r:0.64,g:0.12,b:0.12}}];
bn.strokes=[{type:"SOLID",color:{r:0.83,g:0.66,b:0.29}}];
bn.strokeWeight=2;
bn.cornerRadius=2;
bg.appendChild(bn);

const bnt=figma.createText();
bnt.characters="CREATE NEW SHEET";
bnt.fontSize=16;
bnt.fontName={family:"Libre Baskerville",style:"Bold"};
bnt.fills=[{type:"SOLID",color:{r:0.96,g:0.93,b:0.84}}];
bnt.x=30;bnt.y=20;
bn.appendChild(bnt);

const bl=figma.createFrame();
bl.name="BtnLoad";
bl.resize(240,60);
bl.x=740;bl.y=480;
bl.fills=[{type:"SOLID",color:{r:0.07,g:0.07,b:0.07}}];
bl.strokes=[{type:"SOLID",color:{r:0.64,g:0.12,b:0.12}}];
bl.strokeWeight=2;
bl.cornerRadius=2;
bg.appendChild(bl);

const blt=figma.createText();
blt.characters="LOAD JSON";
blt.fontSize=16;
blt.fontName={family:"Libre Baskerville",style:"Bold"};
blt.fills=[{type:"SOLID",color:{r:0.83,g:0.66,b:0.29}}];
blt.x=50;blt.y=20;
bl.appendChild(blt);

"done"
