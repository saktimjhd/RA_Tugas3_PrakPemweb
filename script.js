// Definisi konstanta untuk bobot nilai dan batas nilai
const BOBOT = {
  tugas: 0.3, // 30%
  uts: 0.3, // 30%
  uas: 0.4, // 40%
};

const BATAS_NILAI = {
  A: 90,
  B: 80,
  C: 70,
  D: 60,
};

// Fungsi untuk validasi input nilai (0-100)
function validasiNilai(nilai) {
  return nilai >= 0 && nilai <= 100;
}

// Fungsi untuk menghitung kontribusi nilai berdasarkan bobot
function hitungKontribusi(nilai, bobot) {
  return (nilai * bobot).toFixed(2);
}

// Fungsi untuk menentukan nilai huruf berdasarkan rata-rata
function tentukanNilaiHuruf(rataRata) {
  if (rataRata >= BATAS_NILAI.A) return "A";
  if (rataRata >= BATAS_NILAI.B) return "B";
  if (rataRata >= BATAS_NILAI.C) return "C";
  if (rataRata >= BATAS_NILAI.D) return "D";
  return "E";
}

// Fungsi utama untuk menghitung nilai
function hitungNilai() {
  // Ambil nilai dari input
  const nilaiTugas = parseFloat(document.getElementById("tugas").value);
  const nilaiUTS = parseFloat(document.getElementById("uts").value);
  const nilaiUAS = parseFloat(document.getElementById("uas").value);

  // Validasi input
  if (
    !validasiNilai(nilaiTugas) ||
    !validasiNilai(nilaiUTS) ||
    !validasiNilai(nilaiUAS)
  ) {
    alert("Mohon masukkan nilai yang valid antara 0 dan 100");
    return;
  }

  // Hitung kontribusi masing-masing komponen
  const kontribusiTugas = hitungKontribusi(nilaiTugas, BOBOT.tugas);
  const kontribusiUTS = hitungKontribusi(nilaiUTS, BOBOT.uts);
  const kontribusiUAS = hitungKontribusi(nilaiUAS, BOBOT.uas);

  // Hitung rata-rata tertimbang
  let rataRataTertimbang = (
    parseFloat(kontribusiTugas) +
    parseFloat(kontribusiUTS) +
    parseFloat(kontribusiUAS)
  ).toFixed(2);

  // Tentukan nilai huruf
  const nilaiHuruf = tentukanNilaiHuruf(rataRataTertimbang);

  // Perbarui tampilan hasil
  document.getElementById(
    "kontribusiTugas"
  ).textContent = `${kontribusiTugas}%`;
  document.getElementById("kontribusiUTS").textContent = `${kontribusiUTS}%`;
  document.getElementById("kontribusiUAS").textContent = `${kontribusiUAS}%`;
  document.getElementById("rataRata").textContent = `${rataRataTertimbang}%`;
  document.getElementById("nilaiHuruf").textContent = nilaiHuruf;

  // Tampilkan status lulus/gagal
  const statusElement = document.getElementById("status");
  const isLulus = rataRataTertimbang >= BATAS_NILAI.D;
  statusElement.textContent = isLulus ? "LULUS" : "TIDAK LULUS";
  statusElement.className = isLulus ? "lulus" : "gagal";

  // Tampilkan bagian hasil
  document.getElementById("results").style.display = "block";
}

// Tambahkan event listener untuk validasi input
document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("input", function () {
    if (this.value < 0) this.value = 0;
    if (this.value > 100) this.value = 100;
  });
});
