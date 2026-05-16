# Pickleball Tournament Web App

A modern, mobile-responsive web application designed to help you easily manage local pickleball tournaments. Instead of tracking matches on paper, you can generate teams, follow an automated round-robin schedule, and view live standings—all directly in your browser.

## 🌟 Key Features

- **Dynamic Player Support**: Host tournaments with anywhere from 4 to 16 players. The app automatically calculates the correct number of doubles teams.
- **Team Editor**: Review and customize your tournament before it starts! You can rename randomly generated teams (e.g., "Dink Dynamos") and easily tap to swap players between teams to ensure a fair matchup.
- **Smart Round-Robin Scheduling**: Uses an automated algorithm to schedule all round-robin matches. If you have an odd number of teams, it automatically handles "BYE" rounds so nobody misses out.
- **Live Standings**: The leaderboard updates in real-time as match results are submitted. It accurately calculates ranks based on total wins and utilizes head-to-head match results as a tiebreaker.
- **Finals Bracket**: Automatically pulls the top seeded teams from the round-robin stage to face off in a Championship Match and a 3rd Place Match.
- **Export & Share**: Once the tournament concludes and the confetti falls, you can click a single button to download a high-quality image of the final standings and champion to share in your group chats.

## 🛠 Tech Stack

- **Framework**: React (via Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: React Confetti
- **Image Generation**: html-to-image
- **Architecture**: 100% Client-side local state. No backend database required.

## 🚀 Getting Started

To run this project locally on your machine:

1. **Install Dependencies**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Open the App**
   Open your browser and navigate to the localhost URL provided in your terminal (typically `http://localhost:5173`).

## 📱 Usage

1. Select your number of players from the dropdown and enter their names.
2. Click **Generate Teams**.
3. On the **Review & Edit Teams** screen, tap team names to edit them, or tap players to swap them. Click **Start Tournament**.
4. Scroll through the Match Cards and click "Select Winner" to log results.
5. Watch the Standings table update dynamically.
6. Once all round-robin matches are completed, scroll down to complete the Finals.
7. Click **Export Final Results** to save your tournament summary!
