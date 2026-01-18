import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const studentsDir = path.join(__dirname, '../content/students');

// Read all student JSON files
const studentFiles = fs.readdirSync(studentsDir).filter(file => file.endsWith('.json'));

studentFiles.forEach(file => {
  const filePath = path.join(studentsDir, file);
  const studentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Fix the photo path - remove the relative path and use direct asset reference
  if (studentData.photo && studentData.photo.startsWith('../')) {
    // Extract just the filename and uniform subdirectory
    const parts = studentData.photo.split('/');
    const filename = parts[parts.length - 1];

    // Update to use proper asset reference format for Astro content collections
    studentData.photo = `../../assets/uniform/${filename}`;

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(studentData, null, 2) + '\n');
    console.log(`Updated ${file}: photo path fixed to ${studentData.photo}`);
  }
});

console.log(`\nUpdated ${studentFiles.length} student files with proper photo paths.`);
