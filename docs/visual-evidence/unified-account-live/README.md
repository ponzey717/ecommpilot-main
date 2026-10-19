# Live authenticated public account panel

Captured on 2026-10-19 from `https://ecommpilot.net/learn` with a real owner app session in a local Chrome browser. The screenshots show the desktop and 390/360 pixel mobile panel; no credentials or token values appear in them.

The cross-domain session endpoint returned the real staff role and Editorial Desk capability. The panel linked to `https://app.ecommpilot.net/admin/editorial`, withheld member-only shortcuts, stayed within the viewport at all three widths, closed with Escape and restored focus to its trigger.

An isolated browser context proved guest → owner → guest transitions. Sign-out used POST, cleared that context's host-only app cookie and left the original owner browser session intact. Free, Pro and Premium accounts were not available for separate live login checks; their UI branches and route destinations were reviewed separately.
