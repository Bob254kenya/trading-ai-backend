/**
 * SITE KNOWLEDGE BASE
 * ---------------------------------------------------------------
 * What the AI widget "knows" about your site. This is a written
 * summary, not a live scan — the AI only knows what's written here.
 * Edit this string any time you add a feature, rename something, or
 * want the assistant to explain things differently. Redeploy after
 * changes.
 *
 * Sourced from: src/pages/tutorials/constants.ts (official FAQ +
 * quick strategy copy), src/pages/*, and backend/server/routes/ai.js
 * (exact supported markets/trade types), as of the last edit.
 * ---------------------------------------------------------------
 */

export const SITE_KNOWLEDGE = `
PLATFORM OVERVIEW
Ramzfx Traders Hub is a web-based strategy builder for trading digital options
on Deriv, built on the open-source Deriv Bot engine. It lets users build their
own automated trading bot using drag-and-drop "blocks" — no coding required.
Users log in with their existing Deriv account via OAuth; there is no separate
Ramzfx password.

IS IT FREE?
Yes. The platform does not sell trading bots and does not charge a subscription
to build or run bots — Quick Strategy and Bot Builder are both free to use.

BROWSER-BASED, NOT ALWAYS-ON
Deriv Bot runs in the browser. It does NOT keep running if the browser is
closed. Users can run it in multiple tabs, but Deriv account limits (max open
positions, max aggregate payouts) still apply across all tabs — see
Settings > Account limits on app.deriv.com for specifics.

BOT BUILDER (visual, block-based)
A drag-and-drop workspace where users assemble a bot from blocks: entry
conditions, purchase blocks, trade parameters, and stop conditions.
- Finding blocks: open the Blocks menu, browse categories, and drag the block
  you want onto the workspace, or use the search bar above the categories.
- Removing a block: click it and press Delete on the keyboard.
- Creating variables: Blocks menu > Utility > Variables > name it > Create.
- Saving a strategy: hit Save on the toolbar, name the bot, and choose to
  download it to your device or Google Drive — it saves as an XML file.
- Importing a bot: drag an XML file onto the workspace, or hit Import in Bot
  Builder and choose Local (pick the file, hit Open) or Google Drive (pick the
  file, hit Select).
- Resetting the workspace: hit Reset on the toolbar — this clears everything,
  and unsaved changes are lost.
- Clearing the transaction log: hit Reset at the bottom of the stats panel,
  then confirm.
- Controlling losses: users typically set a "stop loss threshold" variable at
  the start of the bot, and stop trading once losses reach that amount — Bot
  Builder supports this via variables and conditional blocks.

QUICK STRATEGY (inside Bot Builder)
A ready-made way to get a working bot without touching blocks. There are 6
quick strategy templates: Martingale, D'Alembert, Oscar's Grind, Reverse
Martingale, Reverse D'Alembert, and 1-3-2-6. Martingale, D'Alembert, and
Oscar's Grind are the three most commonly used strategies in automated trading
generally.
To use one: go to Quick Strategy, pick a strategy, select the asset and trade
type, set trade parameters, hit Run. The blocks load onto the workspace
automatically and can still be tweaked afterward, then saved like any other
bot.
Quick Strategy form fields include:
- Asset — the market the bot trades
- Contract type — e.g. Rise/Fall, Even/Odd, Matches/Differs
- Purchase condition — the single trade type used each run
- Initial stake — minimum amount staked on the first trade
- Duration — how long each trade takes to expire
- Profit threshold — bot stops once total profit exceeds this
- Loss threshold — bot stops once total loss exceeds this
- Size (martingale multiplier) — how much the stake multiplies after a win or
  loss
- Growth rate / take-profit unit — for accumulator-style strategies

SUPPORTED MARKETS (Auto Trades / bot trading)
Volatility indices: Volatility 10, 15, 25, 30, 50, 75, 90, and 100 (both the
standard and "1s" versions), plus the standard Volatility 10, 25, 50, 75, and
100 indices. These are synthetic markets that trade 24/7, unaffected by
real-world market hours or holidays.

SUPPORTED TRADE TYPES (Auto Trades)
Digit contracts: Over, Under, Even, Odd, Matches, Differs. Rise/Fall-style
contracts: Call (Rise/Higher) and Put (Fall/Lower). Also Run High and Run Low.

CRYPTOCURRENCIES
Not supported — the platform does not offer cryptocurrency trading.

AUTO TRADES
A simplified, form-driven auto-trading panel (separate from Bot Builder) for
running the supported trade types automatically on the supported markets.
Users configure market, stake, martingale multiplier, take-profit, stop-loss,
and streak settings, then let it run. It also has an "ask in plain English"
helper that turns a written strategy description into Auto Trades settings
(and will say plainly if part of the request isn't supported, rather than
pretending it is).

BEST BOTS
A page that surfaces community/curated bots with tracked performance stats
(win rate, profit/loss), so users can browse and try bots other people have
already built rather than starting from scratch.

BOT IDEAS
A community space where users can submit trading strategy ideas, attach a bot
XML file to a submitted idea, and browse ideas submitted by others.

PRO SCANNER
A semi-manual trading tool: the user picks the contract and market, and the
scanner watches for the moment to fire the trade, with M1/M2 recovery logic to
help manage losing streaks. Aimed at users who want more control than a fully
automatic bot but don't want to watch charts and click manually.

SPEED BOT
A faster, streamlined trading mode for users who want to trade their own
patterns/strategy quickly, with built-in research/pattern tools to support
decision-making.

COPY TRADING
Lets a user copy trades from another trader's account/strategy automatically,
so trades executed on the source account are mirrored on the user's own
account.

MANUAL TRADING
A standard manual trading interface for placing trades directly (without a
bot), for users who want to trade by hand while still using the platform's
charts and tools.

CHART
An interactive price chart (candlesticks/ticks) for the selected market, used
across Bot Builder, Auto Trades, and manual trading to visualize price action.

TUTORIALS / GUIDED TOURS
Built-in step-by-step tours (an onboarding tour and a Bot Builder tour) that
walk new users through the interface directly inside the app, plus a user
guide, instructional videos, and the FAQ content summarized above.

WHERE IS IT AVAILABLE?
The service is offered in all countries except those excluded under Deriv's
terms and conditions (restricted-countries list lives in Deriv's own terms,
not on this site) — the assistant should not guess whether a specific country
is included or excluded and should point the user to Deriv's terms instead.

SUPPORT
For account-specific issues (deposits, withdrawals, verification, login
problems tied to a specific account), direct users to Deriv's own support
channels, since Ramzfx Traders Hub is a bot-building layer on top of Deriv and
does not hold user funds itself.

RISK
Trading always carries risk of loss. No strategy or bot — including Martingale,
D'Alembert, Oscar's Grind, or any other template — guarantees profit. The
assistant should never promise otherwise or give personalized financial advice.
`.trim();
