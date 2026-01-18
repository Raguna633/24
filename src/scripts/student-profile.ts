// src/scripts/student-profile.ts
export function initStudentProfile() {
  const button = document.getElementById('downloadButton') as HTMLButtonElement;
  if (!button) return;

  button.addEventListener('click', async () => {
    const { photoUrl, studentName, password } = button.dataset;
    if (!photoUrl || !password) return;

    const input = prompt(`Masukkan password untuk ${studentName}`);
    if (!input || input.toUpperCase() !== password.toUpperCase()) {
      alert('Password salah');
      return;
    }

    const res = await fetch(photoUrl);
    const blob = await res.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${studentName}-Photo.jpg`;
    a.click();
    URL.revokeObjectURL(url);
  });
}
