
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    return JSON.parse(localStorage.getItem('users')) || {};
}

function saveNoteContent(content) {
    localStorage.setItem('note', content);
}

function loadNoteContent() {
    return localStorage.getItem('note') || '';
}

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const authMessage = document.getElementById('authMessage');
    let users = loadUsers();

    if (!username || !password) {
        authMessage.textContent = 'Vyplň jméno a heslo!';
        return;
    }
    if (password !== confirmPassword) {
        authMessage.textContent = 'Hesla se neshodují!';
        return;
    }
    if (users[username]) {
        authMessage.textContent = 'Uživatel už existuje!';
        return;
    }

    users[username] = password;
    saveUsers(users);
    authMessage.textContent = 'Účet vytvořen! Přihlas se.';
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const authMessage = document.getElementById('authMessage');
    let users = loadUsers();

    if (users[username] === password) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('notes').style.display = 'block';
        document.getElementById('noteArea').value = loadNoteContent();
    } else {
        authMessage.textContent = 'Špatné jméno nebo heslo!';
    }
}

function saveNote() {
    const content = document.getElementById('noteArea').value;
    saveNoteContent(content);
    alert('Zápisky uloženy!');
}

function clearNote() {
    if (confirm('Opravdu chceš smazat zápisky?')) {
        document.getElementById('noteArea').value = '';
        saveNoteContent('');
    }
}
