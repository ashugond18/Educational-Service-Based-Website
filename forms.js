// ============================================================
// FORMS.JS — sends Contact + Tutor Application forms to your email
// via Formspree (free, no backend needed, works on GitHub Pages)
// ============================================================
// Setup (2 minutes, free):
// 1. Go to https://formspree.io and sign up with your email
// 2. Click "New Form", name it "Contact", copy the endpoint URL
//    it gives you (looks like https://formspree.io/f/abcdwxyz)
// 3. Paste that URL into the contact form's action="..." in index.html
//    (search for YOUR_FORM_ID)
// 4. Repeat for a second form "Tutor Applications" and paste its URL
//    where you see YOUR_FORM_ID_2
// 5. Formspree will email you every time someone submits — check your
//    inbox and confirm the first verification email from them
// ============================================================

function showFormStatus(elId, message, isError) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.textContent = message;
    el.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
    el.classList.add(isError ? 'bg-red-100' : 'bg-green-100', isError ? 'text-red-700' : 'text-green-700');
}

async function submitViaFormspree(form, statusElId) {
    const formData = new FormData(form);
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            showFormStatus(statusElId, "Thanks! We've received your message and will contact you soon.", false);
            form.reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch (err) {
        showFormStatus(statusElId, "Something went wrong sending the form. Please try WhatsApp instead using the green button.", true);
    }
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitViaFormspree(contactForm, 'contact-form-status');
    });
}

const tutorForm = document.getElementById('tutor-form');
if (tutorForm) {
    tutorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitViaFormspree(tutorForm, 'tutor-form-status');
    });
}
