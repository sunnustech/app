# Roadmap

## General

- Improve failed password response
- Recover (not reset) password via email
- Error pages
  - expo/local errors
  - firebase errors
- Splash screen (1s on first launch)
- **firebase:** Get user info on log in, and save it to cache
- Emergency button (send team name + location to admin, optional call button)
- Database snapshot tool

## SOAR

- Timer
  - **firebase:** send timestamp
  - **react:** add a context for local time-keeping
  - **firebase:** if react context somehow has no time, pull start time from firebase and calculate time difference with SGP time from internet.
- QR event handlers
  - **firebase:** send timestamp with event type (one of "start", "pause", "resume", or "stop")
  - **react:** update local context
- QR code generator (unique to team, for Facilitators to scan and give points)

## TSS

- Schedule screen
  - **firebase:** append user-specific events
  - **firebase:** live-update event day resuls
- Knockout table screen
  - **css:** display the tree itself
  - **css:** animate celebration and progression

## Stage

- Scoreboard screen
- Voting screen

## Admin console

- Broadcast notifications
- **SOAR:** give points to team
- **TSS:** add/edit match results
- Admin User's Guide
