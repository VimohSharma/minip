var _a, _b;
import { renderUsers } from "./ui/user.ui.js";
import { createUser } from "./services/user.service.js";
import { login, getSessionUser, logout } from "./session.js";
// -------------------- UI REFERENCES --------------------
const loginContainer = document.getElementById("loginContainer");
const appContainer = document.getElementById("appContainer");
const loginBtn = document.getElementById("loginBtn");
// -------------------- INITIAL LOAD --------------------
const session = getSessionUser();
if (session) {
    showApp(session);
}
else {
    showLogin();
}
// -------------------- LOGIN --------------------
loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener("click", () => {
    const nameInput = document.getElementById("loginName");
    const name = nameInput.value.trim();
    if (!name) {
        alert("Please enter your name");
        return;
    }
    const role = name.toLowerCase() === "admin" ? "ADMIN" : "EMPLOYEE";
    login(name, role);
    login(name, role);
    showApp(getSessionUser());
});
// -------------------- LOGOUT --------------------
(_a = document.getElementById("logoutBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    logout();
    location.reload();
});
// -------------------- ADD USER (ADMIN ONLY) --------------------
(_b = document.getElementById("addUserBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const roleSelect = document.getElementById("roleSelect");
    const statusSelect = document.getElementById("statusSelect");
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
    const user = createUser(name, email, role, status);
    if (user) {
        renderUsers();
        nameInput.value = "";
        emailInput.value = "";
    }
});
// -------------------- UI HELPERS --------------------
function showApp(session) {
    loginContainer.style.display = "none";
    appContainer.style.display = "block";
    // Employee restriction
    if (session.role === "EMPLOYEE") {
        document.getElementById("userForm").style.display = "none";
    }
    renderUsers();
}
function showLogin() {
    loginContainer.style.display = "block";
    appContainer.style.display = "none";
}
