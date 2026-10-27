const form = document.getElementById("registerForm");
const formMessage = document.getElementById("formMessage");
const resultCard = document.getElementById("resultCard");
const placeholderText = document.getElementById("placeholderText");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const togglePasswordBtn = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

const rules = {
  nama() {
    const v = document.getElementById("nama").value.trim();
    if (!v) return "Nama lengkap wajib diisi.";
    if (v.length < 3) return "Nama minimal 3 karakter.";
    if (!/^[\p{L}\s.'-]+$/u.test(v)) return "Nama hanya boleh berisi huruf dan spasi.";
    return "";
  },

  email() {
    const v = document.getElementById("email").value.trim();
    if (!v) return "Email wajib diisi.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Format email tidak valid.";
    return "";
  },

  password() {
    const v = passwordInput.value;
    if (!v) return "Password wajib diisi.";
    if (v.length < 8) return `Password minimal 8 karakter (sekarang ${v.length}).`;
    if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return "Password harus mengandung huruf dan angka.";
    return "";
  },

  konfirmasi() {
    const v = document.getElementById("konfirmasi").value;
    if (!v) return "Konfirmasi password wajib diisi.";
    if (v !== passwordInput.value) return "Konfirmasi password tidak sama.";
    return "";
  },

  setuju() {
    return document.getElementById("setuju").checked
      ? ""
      : "Kamu harus menyetujui syarat dan ketentuan.";
  },
};

function validateField(id) {
  const input = document.getElementById(id);
  const message = rules[id]();
  document.getElementById(`${id}-error`).textContent = message;

  if (input.type !== "checkbox") {
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }
  return message === "";
}

function updateStrength(value) {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  if (!value) score = 0;

  const labels = ["-", "Lemah", "Cukup", "Bagus", "Kuat"];
  strengthBar.dataset.level = String(score);
  strengthText.textContent = `Kekuatan password: ${labels[score]}`;
}

function showMessage(text, type) {
  formMessage.hidden = false;
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
}

function createRow(label, value) {
  const row = document.createElement("div");
  row.className = "row";
  const dt = document.createElement("dt");
  dt.textContent = label;
  const dd = document.createElement("dd");
  dd.textContent = value;
  row.append(dt, dd);
  return row;
}

function showResult(data) {
  resultCard.replaceChildren();

  const title = document.createElement("h2");
  title.textContent = `Selamat datang, ${data.nama.split(/\s+/)[0]}!`;

  const subtitle = document.createElement("p");
  subtitle.className = "subtitle";
  const time = new Date().toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" });
  subtitle.textContent = `Bergabung pada ${time}`;

  const list = document.createElement("dl");
  list.append(
    createRow("Nama", data.nama),
    createRow("Email", data.email),
    createRow("Kategori favorit", data.minat),
    createRow("Password", "•".repeat(8) + " (disembunyikan)")
  );

  resultCard.append(title, subtitle, list);
  resultCard.hidden = false;
  placeholderText.hidden = true;
}

function clearResult() {
  formMessage.hidden = true;
  resultCard.hidden = true;
  resultCard.replaceChildren();
  placeholderText.hidden = false;
}

Object.keys(rules).forEach((id) => {
  const input = document.getElementById(id);
  const eventName = input.type === "checkbox" ? "change" : "input";

  input.addEventListener(eventName, () => {
    validateField(id);
    if (id === "password") {
      updateStrength(passwordInput.value);
      if (document.getElementById("konfirmasi").value) validateField("konfirmasi");
    }
  });

  input.addEventListener("blur", () => validateField(id));
});

togglePasswordBtn.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  document.getElementById("konfirmasi").type = isHidden ? "text" : "password";
  togglePasswordBtn.textContent = isHidden ? "Sembunyikan" : "Tampilkan";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const invalidIds = Object.keys(rules).filter((id) => !validateField(id));

  if (invalidIds.length > 0) {
    resultCard.hidden = true;
    placeholderText.hidden = true;
    showMessage(`Ada ${invalidIds.length} kolom yang perlu diperbaiki sebelum melanjutkan.`, "fail");
    document.getElementById(invalidIds[0]).focus();
    return;
  }

  const data = {
    nama: document.getElementById("nama").value.trim(),
    email: document.getElementById("email").value.trim(),
    minat: document.getElementById("minat").selectedOptions[0].textContent,
  };

  showMessage("Pendaftaran berhasil! Selamat bergabung.", "success");
  showResult(data);
});

form.addEventListener("reset", () => {
  clearResult();
  Object.keys(rules).forEach((id) => {
    document.getElementById(`${id}-error`).textContent = "";
    document.getElementById(id).removeAttribute("aria-invalid");
  });
  updateStrength("");
  passwordInput.type = "password";
  document.getElementById("konfirmasi").type = "password";
  togglePasswordBtn.textContent = "Tampilkan";
});