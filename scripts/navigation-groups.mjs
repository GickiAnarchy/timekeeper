// Native buttons retain Enter/Space activation and the shared focus-visible ring.
// The current page's category stays open; other categories can be browsed freely.
export function setupNavigationGroups(root) {
  const groups = [...(root?.querySelectorAll('.nav-group') || [])].map(group => ({
    group,
    toggle: group.querySelector('.nav-group-toggle'),
    panel: group.querySelector('.nav-group-pages')
  }));
  let activeGroup = null;

  function setExpanded(entry, expanded) {
    entry.toggle.setAttribute('aria-expanded', String(expanded));
    entry.panel.hidden = !expanded;
  }

  for (const entry of groups) {
    setExpanded(entry, entry.toggle.getAttribute('aria-expanded') === 'true');
    entry.toggle.addEventListener('click', () => {
      if (entry === activeGroup) return;
      setExpanded(entry, entry.panel.hidden);
    });
  }

  return function reveal(button) {
    const nextGroup = groups.find(entry => entry.group.contains(button));
    if (!nextGroup) return;
    activeGroup = nextGroup;
    for (const entry of groups) {
      const isActive = entry === activeGroup;
      setExpanded(entry, isActive);
      if (isActive) {
        entry.toggle.setAttribute('aria-disabled', 'true');
        entry.toggle.setAttribute('title', 'Contains the current page; stays expanded');
      } else {
        entry.toggle.removeAttribute('aria-disabled');
        entry.toggle.removeAttribute('title');
      }
    }
  };
}
