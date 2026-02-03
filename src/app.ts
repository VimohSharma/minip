import { renderUsers } from "./ui/user.ui.js";
import { createUser } from "./services/user.service.js";
import { login, getSessionUser, logout } from "./session.js";

// -------------------- UI REFERENCES --------------------
const loginContainer = document.getElementById("loginContainer") as HTMLElement;
const appContainer = document.getElementById("appContainer") as HTMLElement;
const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;

// -------------------- INITIAL LOAD --------------------
const session = getSessionUser();

if (session) {
  showApp(session);
} else {
  showLogin();
}

// -------------------- LOGIN --------------------
loginBtn?.addEventListener("click", () => {
  const nameInput = document.getElementById("loginName") as HTMLInputElement;
  const name = nameInput.value.trim();

if (!name) {
  alert("Please enter your name");
  return;
}

const role = name.toLowerCase() === "admin" ? "ADMIN" : "EMPLOYEE";
login(name, role);

  login(name, role as any);
  showApp(getSessionUser()!);
});

// -------------------- LOGOUT --------------------
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  logout();
  location.reload();
});

// -------------------- ADD USER (ADMIN ONLY) --------------------
document.getElementById("addUserBtn")?.addEventListener("click", () => {
  const nameInput = document.getElementById("nameInput") as HTMLInputElement;
  const emailInput = document.getElementById("emailInput") as HTMLInputElement;
  const roleSelect = document.getElementById("roleSelect") as HTMLSelectElement;
  const statusSelect = document.getElementById("statusSelect") as HTMLSelectElement;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const role = roleSelect.value;
  const status = statusSelect.value;

  if (!name || !email) {
    alert("Please enter name and email");
    return;
  }

  if (!email.includes("@")) {
    alert("Please enter a valid email address");
    return;
  }

  const user = createUser(name, email, role as any, status as any);

  if (user) {
    renderUsers();
    nameInput.value = "";
    emailInput.value = "";
  }
});

// -------------------- UI HELPERS --------------------
function showApp(session: any) {
  loginContainer.style.display = "none";
  appContainer.style.display = "block";

  // Employee restriction
  if (session.role === "EMPLOYEE") {
    document.getElementById("userForm")!.style.display = "none";
  }

  renderUsers();
}

function showLogin() {
  loginContainer.style.display = "block";
  appContainer.style.display = "none";
}
