# Architecture

- Keep the homepage hero website-focused and in normal document flow; use existing portfolio imagery rather than a pinned morph so the work remains visible across screen sizes.
- Render the public wordmark in the shared Logo component so navigation and footer stay consistent without altering existing operational domains or contact destinations.
- Hydrate only when the root has rendered element children; shell comments are not prerendered content and must use client rendering.
