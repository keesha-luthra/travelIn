document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('dropdown-toggle');
  const menu = document.getElementById('dropdown-menu');

  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener('click', function (event) {
    event.preventDefault();
    let isOpen = menu.classList.toggle('show');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', function (event) {
    if (
      event.target instanceof Node &&
      !toggle.contains(event.target) &&
      !menu.contains(event.target)
    ) {
      menu.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});
