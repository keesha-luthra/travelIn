document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const toggleButtons = document.querySelectorAll('.toggle-form');
  const loginFormEl = document.getElementById('login-form-el');
  const signupFormEl = document.getElementById('signup-form-el');

  if (toggleButtons.length > 0) {
    toggleButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!loginForm || !signupForm) return;
        // Proper toggle checking computed style or simple class
        const loginIsHidden = window.getComputedStyle(loginForm).display === 'none';
        if (loginIsHidden) {
          loginForm.style.display = 'block';
          signupForm.style.display = 'none';
        } else {
          loginForm.style.display = 'none';
          signupForm.style.display = 'block';
        }
      });
    });
  }

  if (loginFormEl) {
    loginFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(
        'Demo only: no credentials are submitted or stored. Connect this form to a secure authentication service before enabling accounts.',
      );
    });
  }

  if (signupFormEl) {
    signupFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(
        'Demo only: no credentials are submitted or stored. Connect this form to a secure authentication service before enabling accounts.',
      );
    });
  }
});
