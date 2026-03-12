const page = figma.currentPage;
const w = 1440;
const h = 900;

const bg = figma.createFrame();
bg.name = "Landing - Art Nouveau";
bg.resize(w, h);
bg.x = 2000;
bg.y = 0;
bg.fills = [{ type: "SOLID", color: { r: 0.96, g: 0.93, b: 0.84 } }];
page.appendChild(bg);

const title = figma.createText();
title.name = "Title";
title.characters = "CALL OF CTHULHU";
title.fontSize = 72;
title.fontName = { family: "Libre Baskerville", style: "Bold" };
title.fills = [{ type: "SOLID", color: { r: 0.64, g: 0.12, b: 0.12 } }];
title.x = 320;
title.y = 100;
bg.appendChild(title);

const subtitle = figma.createText();
subtitle.name = "Subtitle";
subtitle.characters = "7th Edition Investigator Sheet";
subtitle.fontSize = 28;
subtitle.fontName = { family: "Libre Baskerville", style: "Italic" };
subtitle.fills = [{ type: "SOLID", color: { r: 0.17, g: 0.09, b: 0.06 } }];
subtitle.x = 420;
subtitle.y = 200;
bg.appendChild(subtitle);

const line1 = figma.createRectangle();
line1.name = "DecorLineLeft";
line1.resize(180, 3);
line1.x = 320;
line1.y = 140;
line1.fills = [{ type: "SOLID", color: { r: 0.83, g: 0.66, b: 0.29 } }];
bg.appendChild(line1);

const line2 = figma.createRectangle();
line2.name = "DecorLineRight";
line2.resize(180, 3);
line2.x = 940;
line2.y = 140;
line2.fills = [{ type: "SOLID", color: { r: 0.83, g: 0.66, b: 0.29 } }];
bg.appendChild(line2);

const diamond = figma.createStar();
diamond.name = "Diamond";
diamond.resize(20, 20);
diamond.x = 710;
diamond.y = 135;
diamond.fills = [{ type: "SOLID", color: { r: 0.83, g: 0.66, b: 0.29 } }];
diamond.rotation = 45;
diamond.points = 4;
bg.appendChild(diamond);

const quoteBox = figma.createFrame();
quoteBox.name = "QuoteBox";
quoteBox.resize(600, 150);
quoteBox.x = 420;
quoteBox.y = 280;
quoteBox.fills = [{ type: "SOLID", color: { r: 0.07, g: 0.07, b: 0.07 } }];
quoteBox.strokes = [{ type: "SOLID", color: { r: 0.64, g: 0.12, b: 0.12 } }];
quoteBox.strokeWeight = 3;
quoteBox.cornerRadius = 2;
bg.appendChild(quoteBox);

const quote = figma.createText();
quote.name = "QuoteText";
quote.characters = "The oldest and strongest emotion of mankind is fear, and the oldest and strongest kind of fear is fear of the unknown.";
quote.fontSize = 18;
quote.fontName = { family: "Libre Baskerville", style: "Italic" };
quote.fills = [{ type: "SOLID", color: { r: 0.96, g: 0.93, b: 0.84 } }];
quote.x = 40;
quote.y = 30;
quote.resize(520, 90);
quote.textAlignHorizontal = "CENTER";
quoteBox.appendChild(quote);

const author = figma.createText();
author.name = "Author";
author.characters = "— H. P. Lovecraft";
author.fontSize = 14;
author.fontName = { family: "Libre Baskerville", style: "Regular" };
author.fills = [{ type: "SOLID", color: { r: 0.83, g: 0.66, b: 0.29 } }];
author.x = 640;
author.y = 410;
bg.appendChild(author);

const btnNew = figma.createFrame();
btnNew.name = "Button_New";
btnNew.resize(240, 60);
btnNew.x = 460;
btnNew.y = 480;
btnNew.fills = [{ type: "SOLID", color: { r: 0.64, g: 0.12, b: 0.12 } }];
btnNew.strokes = [{ type: "SOLID", color: { r: 0.83, g: 0.66, b: 0.29 } }];
btnNew.strokeWeight = 2;
btnNew.cornerRadius = 2;
bg.appendChild(btnNew);

const btnNewText = figma.createText();
btnNewText.characters = "CREATE NEW SHEET";
btnNewText.fontSize = 16;
btnNewText.fontName = { family: "Libre Baskerville", style: "Bold" };
btnNewText.fills = [{ type: "SOLID", color: { r: 0.96, g: 0.93, b: 0.84 } }];
btnNewText.x = 30;
btnNewText.y = 20;
btnNew.appendChild(btnNewText);

const btnLoad = figma.createFrame();
btnLoad.name = "Button_Load";
btnLoad.resize(240, 60);
btnLoad.x = 740;
btnLoad.y = 480;
btnLoad.fills = [{ type: "SOLID", color: { r: 0.07, g: 0.07, b: 0.07 } }];
btnLoad.strokes = [{ type: "SOLID", color: { r: 0.64, g: 0.12, b: 0.12 } }];
btnLoad.strokeWeight = 2;
btnLoad.cornerRadius = 2;
bg.appendChild(btnLoad);

const btnLoadText = figma.createText();
btnLoadText.characters = "LOAD JSON";
btnLoadText.fontSize = 16;
btnLoadText.fontName = { family: "Libre Baskerville", style: "Bold" };
btnLoadText.fills = [{ type: "SOLID", color: { r: 0.83, g: 0.66, b: 0.29 } }];
btnLoadText.x = 50;
btnLoadText.y = 20;
btnLoad.appendChild(btnLoadText);

"Done"
