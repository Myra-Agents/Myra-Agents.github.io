# App-side deep-link changes (stashed here temporarily)

This directory carries the **companion app-repo changes** for the patrol
templates feature — the `myra://patrol/new?template=<id>` deep-link handler that
the landing site's `/templates/` page links to.

These changes belong in **`Myra-Agents/Myra-Agents`** (the desktop app), NOT this
landing repo. They are parked here only because that repo could not be pushed to
from the automated session (authorization blocker). Relocate and delete this
directory once applied.

## What the patch contains

- `src-tauri/src/lib.rs` — recognize `myra://patrol/new?template=<id>`, route the
  main window to the prefilled editor (`/schedules/edit/?template=<id>`), buffer
  for cold-start, add the `take_pending_navigation` command.
- `src/app/(main)/_components/tray-action-listener.tsx` — drain the buffered
  navigation on mount.
- `src/lib/schedule-ideas.ts` — enable the "Popular" template group (dailyBrief,
  standupPrep, weeklyReview) so the landing deep links resolve to real templates.

## How to apply (in the app repo)

```bash
cd path/to/Myra-Agents          # the app checkout
git checkout -b claude/template-page-deep-linking-qy7bpl origin/develop
git am path/to/app-deep-link.patch   # preserves the original commit + message
# then push and open a PR against develop
```

`git am` replays it as the original commit. If it doesn't apply cleanly, use
`git apply app-deep-link.patch` to stage the working-tree changes instead.
