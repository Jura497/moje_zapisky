function toggleVisibility(id) {
    document.querySelectorAll('#auth-forms form').forEach(f => f.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    document.getElementById('auth-forms').classList.remove('hidden');
    document.getElementById('initial-buttons').classList.add('hidden');
}

document.getElementById('show-login').onclick = () => toggleVisibility('login-form');
document.getElementById('show-register').onclick = () => toggleVisibility('register-form');

document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.onclick = () => {
        const target = document.getElementById(btn.dataset.target);
        target.type = target.type === 'password' ? 'text' : 'password';
    };
});

document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('theme-toggle').textContent =
        document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
};

function format(cmd) {
    document.execCommand(cmd, false, null);
}

document.getElementById('image-upload').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            document.getElementById('editor').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

function login() {
    document.getElementById('auth-forms').classList.add('hidden');
    document.getElementById('notes-section').classList.remove('hidden');
}

function register() {
    alert('Účet vytvořen! Nyní se přihlaste.');
    document.getElementById('auth-forms').classList.add('hidden');
    document.getElementById('initial-buttons').classList.remove('hidden');
}

function saveNotes() {
    alert('Zápisky uloženy.');
}

function logout() {
    document.getElementById('notes-section').classList.add('hidden');
    document.getElementById('initial-buttons').classList.remove('hidden');
}
