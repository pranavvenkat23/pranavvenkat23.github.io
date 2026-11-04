---
permalink: /projects/emercity/
title: "Emercity: architecture notes"
description: "Design, architecture, testing, and known limits of Emercity, an offline-first household emergency app built with React Native, SQLCipher, and Firestore."
---

<article class="case" markdown="1">

<p class="case__back"><a href="{{ '/#project-emercity' | relative_url }}">&larr; Back to projects</a></p>

# Emercity: architecture notes

<p class="case__summary">An offline-first household emergency app that ranks who in a home needs help first, for each hazard, and keeps working with no signal. Congressional App Challenge 2026 entry.</p>

<ul class="evidence">
  <li><a href="https://github.com/pranavvenkat23/emercity">Code</a></li>
  <li><a href="https://github.com/pranavvenkat23/emercity/blob/main/docs/PROGRESS.md">Progress log</a></li>
</ul>

<figure class="case__figure">
  <img src="{{ '/images/projects/emercity-screens.png' | relative_url }}" alt="Three Emercity screens: the household home view, the per-hazard priority order with an explanation sheet, and an active Emergency Mode step" width="767" height="544">
  <figcaption>Home, the flood priority order with its &ldquo;why&rdquo; explanation, and an Emergency Mode step. Demo household, simulated data.</figcaption>
</figure>

## Problem and constraints

In a power outage or flood, the hard question for a household is not &ldquo;what is the general advice&rdquo; but &ldquo;who here needs help first, and how long do we have.&rdquo; That depends on the specific people in the home: an oxygen concentrator with four hours of battery, refrigerated insulin, an infant, an older adult who needs help moving. Emercity answers that question per hazard, at the household's address.

The constraints shaped every decision:

- **It must work with no network.** Emergencies are exactly when connectivity fails.
- **Its decisions must be explainable and testable.** A safety ranking that cannot say why it ranked someone first cannot be trusted or checked.
- **It runs on Firebase's free Spark plan.** No Cloud Functions, so no server-side code.

## Architecture

```
screens/     UI, grouped by area (thin; render state, dispatch actions)
stores/      app state (Zustand)
domain/      pure business rules: priority engine, countdowns, risk, playbooks
data/        encrypted SQLite (SQLCipher), record store, sync queue
services/    Firebase, National Weather Service, NOAA, FEMA, openFDA clients
reference/   bundled, cited data: storage rules, guides, playbooks
```

The `domain/` layer has no I/O. Every function takes its inputs, including the current time through an injectable clock, and returns a value. That is what makes the safety logic testable against fixed fixture households instead of a live device.

## Design decisions

<div class="case__table" markdown="1">

| Decision | Chosen | Alternative | Why |
|---|---|---|---|
| Source of truth | Encrypted SQLite on the phone | Cloud database | The app has to be fully usable offline; the UI never waits on a request. |
| Emergency logic | Deterministic, rule-based functions | A generative model | Every ranking can be explained to the user and asserted in a test. No AI participates in any emergency decision. |
| Missing data | Treat it conservatively | Guess a typical value | A life-sustaining device with no runtime entered is scored as having under two hours of backup. Countdowns with no sourced rule say &ldquo;no safe-time data&rdquo;. |
| Cloud layout | Flat collections under each household | Nested sub-collections from the spec | Flat paths keep Firestore listeners and security rules simple. |
| Alerts | Checked every 5 minutes while the app is open | Background push | Background push needs Cloud Functions, which the free plan lacks. The app says so rather than implying it is monitoring. |

</div>

## The priority engine

Each person and pet is placed in a tier (critical, urgent, important, standard) by the highest-severity rule that fires for them under the selected hazard. Within a tier, a 0-1000 score orders people. During an active outage the score uses the live remaining backup time on life-sustaining devices and the countdown on critical medications, so the order updates as time passes.

Every placement records the rules that fired, which is what the &ldquo;Why Grandma is here&rdquo; sheet displays. A household can pin someone higher or lower; pins are keyed to that person's recorded needs, so if their conditions or devices change, the pin resets rather than silently overriding the new facts.

## Sync

Every write commits to SQLCipher first. For shared households the same database transaction appends an entry to a `sync_queue` table, so a record and its pending upload can never disagree. The queue drains to Firestore with field-level merges when a connection is available, and each phone listens for the others' changes. When two phones check off the same emergency step, the earliest check-off wins.

Firestore security rules restrict each household's records to its members by role. The rules are deployed and have their own test suite that runs against the Firebase emulator.

## Testing and verification

- **462 passing unit tests across 35 suites** on the current revision (`npm test`), including the priority engine against 46 fixture households, countdowns, readiness, the sync queue's pure logic, and colour-contrast checks on the design tokens.
- **Firestore rules suite** on the emulator (`npm run test:rules`), kept separate because it needs Java and a running emulator.
- **Strict TypeScript** (`npm run typecheck`).
- **Simulator verification.** The [progress log](https://github.com/pranavvenkat23/emercity/blob/main/docs/PROGRESS.md) marks a screen &ldquo;verified&rdquo; only after it was exercised in the iOS Simulator, and records each known gap next to the screen it affects.

## Known limits

- The emergency rules and guides **have not been reviewed by a qualified professional**. The app states this on its About screen, and it is the main blocker before real use.
- No push notifications to closed phones and no grounded &ldquo;Ask&rdquo; answers, both of which need server code beyond the free plan.
- Apple and Google sign-in need a paid Apple Developer account; email sign-in was verified on the Auth emulator.
- Spanish menus exist but are unreviewed; guides and safety steps are English-only by design until a human translation is available.
- A full VoiceOver walkthrough has not been done.

## Next steps

1. Professional review of the priority rules and emergency guides.
2. Server-side background alerts once on a paid plan.
3. A recorded VoiceOver and Switch Control walkthrough.

</article>
