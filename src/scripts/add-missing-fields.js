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

  // Extract jenjang from class field
  const jenjang = studentData.class.includes('SMK') ? 'SMK' : 'SMA';

  // Determine gender based on name and photo path
  let gender;
  if (studentData.name.endsWith('a') || studentData.name.includes('Putri') ||
      studentData.photo.includes('putri') || studentData.photo.includes('Putri')) {
    gender = 'Putri';
  } else {
    gender = 'Putra';
  }

  // Add missing fields
  studentData.jenjang = jenjang;
  studentData.gender = gender;

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(studentData, null, 2) + '\n');
  console.log(`Updated ${file}: added jenjang=${jenjang}, gender=${gender}`);
});

console.log(`\nUpdated ${studentFiles.length} student files.`);
