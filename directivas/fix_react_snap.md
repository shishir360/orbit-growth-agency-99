# Directive: Fix React Snap Timeout

## Objective
Fix the `TimeoutError: Navigation Timeout Exceeded` error encountered during the `react-snap` prerendering phase.

## Inputs
- `package.json`

## Outputs
- Updated `package.json` with `concurrency` setting added to `reactSnap` configuration.

## Logic Flow
1. Read `package.json`.
2. Parse JSON.
3. Add `"concurrency": 1` inside `"reactSnap"`.
4. Add `"puppeteerArgs": ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]` inside `"reactSnap"` if not perfectly matching to prevent further crashes.
5. Write back to `package.json`.

## Known risks and constraints
- Must preserve existing `package.json` formatting.
- The `react-snap` process times out because it runs too many headless browser tabs concurrently or because of shared memory limits.

## Rules
- Only update `reactSnap` configuration.
