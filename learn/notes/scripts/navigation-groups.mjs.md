# scripts/navigation-groups.mjs

[Exact copy](../../original/scripts/navigation-groups.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
// Compatibility export for existing consumers; the browser shell is self-contained.
```

This comment documents the design intent here: Compatibility export for existing consumers; the browser shell is self-contained..

### Line 2

```text
export { setupNavigationGroups } from './index.js';
```

Re-exports the navigation helper so older consumers can keep using the same module path.
