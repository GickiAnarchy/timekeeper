export function initializeAdminSectionToggles(root = document) {
  root.querySelectorAll('.admin-toggle[aria-controls]').forEach(toggle => {
    const controlledId = toggle.getAttribute('aria-controls');
    const controlledCard = controlledId && root.getElementById(controlledId);
    if (!controlledCard) return;

    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    controlledCard.hidden = !expanded;

    toggle.addEventListener('click', () => {
      const wasExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!wasExpanded));
      controlledCard.hidden = wasExpanded;
    });
  });
}
