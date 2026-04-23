const fs = require('fs');
const path = require('path');

const filesToRefaktor = [
  "src/components/classes/smk/a-pplg.astro",
  "src/components/classes/smk/b-apl.astro",
  "src/components/classes/smk/c-apl.astro",
  "src/components/classes/smk/d-mplb.astro",
  "src/components/classes/sma/ipa1.astro",
  "src/components/classes/sma/ipa2.astro",
  "src/components/classes/sma/ipa3.astro",
  "src/components/classes/sma/ipa4.astro",
  "src/components/classes/sma/ips1.astro",
  "src/components/classes/sma/ips2.astro",
  "src/components/classes/sma/ips3.astro"
];

for (const file of filesToRefaktor) {
  const filePath = path.join('f:/Buken/Web', file);
  if (!fs.existsSync(filePath)) {
    console.error(`File missing: ${filePath}`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  // Fix imports
  if (!content.includes('import ClassHeroSection')) {
    const originalContent = content;
    content = content.replace(
      /import CloudinaryImage from "\.\.\/\.\.\/ui\/CloudinaryImage\.astro";\r?\n/g,
      ''
    );
    if (content !== originalContent) {
      // Replaced import CloudinaryImage. Now we add ClassHeroSection.
      content = content.replace(
        /import StudentCard from "\.\.\/\.\.\/StudentCard\.astro";/g,
        'import ClassHeroSection from "../../ClassHeroSection.astro";\nimport StudentCard from "../../StudentCard.astro";'
      );
    }
  }

  // Remove hero-section HTML
  const sectionRegex = /<section[^>]*?class="hero-section[^>]*?>[\s\S]*?<\/section>/;
  if(sectionRegex.test(content)) {
    content = content.replace(
        sectionRegex, 
        '<ClassHeroSection className={classContent.className} heroImageSrc={heroBg1} />'
    );
    modified = true;
  }

  // Remove CSS for hero-title
  const cssRegex = /\.hero-title\s*\{[\s\S]*?\}/g;
  if(cssRegex.test(content)) {
    content = content.replace(cssRegex, '');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Refactored ${file}`);
  } else {
    console.log(`No changes needed for ${file}`);
  }
}
