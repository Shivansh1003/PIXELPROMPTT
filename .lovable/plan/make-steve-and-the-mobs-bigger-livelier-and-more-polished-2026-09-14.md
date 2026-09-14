# Make Steve and the mobs bigger, livelier, and more polished

## What will change

- Use the uploaded Minecraft portfolio as the app, preserving its current sections, artwork, copy, and blocky visual style.
- Increase Steve’s on-screen size so he is easier to notice without covering nearby content.
- Upgrade Steve’s idle motion from a simple repeated bob to a more characterful sequence with gentle breathing, weight shifts, and occasional playful movement.
- Make Steve’s click reaction feel punchier and cleaner with better timing, impact movement, particles, and rotating comic callouts.
- Give each mob a distinct movement style instead of relying mainly on the same bob:
  - Creeper: cautious stalking and a brief charge-up pulse and blow up
  - Zombie: uneven shuffling and head/body sway.
  - Skeleton: alert aiming movement and shoot arrow and recoil-like reactions.
  - Enderman: subtle looming motion, jitter, and cleaner teleport effects.
- Refine hit, dodge, defeat, item-drop, and respawn transitions so they remain readable and fun without becoming chaotic.
- Keep all interactions keyboard accessible and provide a calm reduced-motion version.

## Visual and layout checks

- Confirm Steve and every mob stay sharp, correctly sized, and unobstructed on desktop and mobile.
- Check that animation layers, labels, particles, and cards do not clip or overlap.
- Verify the page loads cleanly and all click interactions complete and reset correctly.

## Technical details

- Import source files and assets from the ZIP without copying repository metadata.
- Keep the existing React/TanStack structure and Minecraft design tokens.
- Separate transforms where needed so idle and impact animations combine smoothly rather than overwriting one another.
- Use CSS keyframes and small React state updates only; no backend or new services are required.