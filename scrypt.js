// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Form toggle
const initialButtons = document.getElementById('initial-buttons');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
document.getElementById('show-login').addEventListener('click', () => {
    initialButtons.classList.add('hidden');
    loginForm.classList.remove('hidden');
});
document.getElementById('show-register').addEventListener('click', () => {
    initialButtons.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

// Password show/hide
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = document.getElementById(btn.getAttribute('data-target'));
        if (target.type === 'password') {
            target.type = 'text';
        } else {
            target.type = 'password';
        }
    });
});

// Storage helpers
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function loadUsers() {
    return JSON.parse(localStorage.getItem('users')) || {};
}
function saveNotes() {
    const content = document.getElementById('notes').value;
    const username = localStorage.getItem('currentUser');
    localStorage.setItem(`notes_${username}`, content);
    alert('Zápisky uloženy!');
}
function loadNotes() {
    const username = localStorage.getItem('currentUser');
    const notes = localStorage.getItem(`notes_${username}`) || '';
    document.getElementById('notes').value = notes;
}

// Auth functions
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    let users = loadUsers();
    if (!username || !password) {
        alert('Vyplň všechna pole!');
        return;
    }
    if (password !== confirm) {
        alert('Hesla se neshodují!');
        return;
    }
    if (users[username]) {
        alert('Uživatel již existuje!');
        return;
    }
    users[username] = password;
    saveUsers(users);
    alert('Účet vytvořen! Přihlaš se.');
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    let users = loadUsers();
    if (users[username] === password) {
        localStorage.setItem('currentUser', username);
        loginForm.classList.add('hidden');
        document.getElementById('notes-section').classList.remove('hidden');
        loadNotes();
    } else {
        alert('Nesprávné jméno nebo heslo!');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('notes-section').classList.add('hidden');
    initialButtons.classList.remove('hidden');
    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');
}

window.addEventListener('load', () => {
    // Default to light mode
    if (!document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        themeToggle.textContent = '🌙';
    }
    // Auto-login
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        initialButtons.classList.add('hidden');
        loginForm.classList.add('hidden');
        document.getElementById('notes-section').classList.remove('hidden');
        loadNotes();
    }
});
