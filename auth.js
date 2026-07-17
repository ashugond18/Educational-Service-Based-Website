// ============================================================
// AUTH.JS — real Login / Register using Firebase Authentication
// Requires firebase-config.js to be loaded first with your real keys
// ============================================================

function showStatus(elId, message, isError) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.textContent = message;
    el.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
    el.classList.add(isError ? 'bg-red-100' : 'bg-green-100', isError ? 'text-red-700' : 'text-green-700');
}

// ---- REGISTER ----
const registerFormEl = document.getElementById('register-form-el');
if (registerFormEl) {
    registerFormEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            showStatus('register-status', 'Passwords do not match.', true);
            return;
        }
        if (password.length < 6) {
            showStatus('register-status', 'Password must be at least 6 characters.', true);
            return;
        }

        try {
            const cred = await auth.createUserWithEmailAndPassword(email, password);
            await cred.user.updateProfile({ displayName: `${firstName} ${lastName}` });
            // Save extra profile info in Firestore
            await db.collection('users').doc(cred.user.uid).set({
                firstName, lastName, email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            showStatus('register-status', 'Account created! Redirecting…', false);
            setTimeout(() => window.location.href = 'dashboard.html', 1000);
        } catch (err) {
            showStatus('register-status', err.message, true);
        }
    });
}

// ---- LOGIN ----
const loginFormEl = document.getElementById('login-form-el');
if (loginFormEl) {
    loginFormEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            showStatus('login-status', 'Logged in! Redirecting…', false);
            setTimeout(() => window.location.href = 'dashboard.html', 800);
        } catch (err) {
            showStatus('login-status', err.message, true);
        }
    });
}

// ---- Keep login/register buttons in sync with auth state ----
// If someone is already logged in, change "Login"/"Register" buttons to "Dashboard"
auth.onAuthStateChanged((user) => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    if (user && loginBtn && registerBtn) {
        // Clone-and-replace strips the old "open login modal" click listener
        const newLoginBtn = loginBtn.cloneNode(true);
        newLoginBtn.textContent = 'Dashboard';
        newLoginBtn.addEventListener('click', () => window.location.href = 'dashboard.html');
        loginBtn.replaceWith(newLoginBtn);

        const newRegisterBtn = registerBtn.cloneNode(true);
        newRegisterBtn.textContent = 'Logout';
        newRegisterBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await auth.signOut();
            window.location.reload();
        });
        registerBtn.replaceWith(newRegisterBtn);
    }
});
