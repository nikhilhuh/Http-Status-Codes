# HTTP Status Codes Reference

A complete, interactive, and visually impressive frontend application built to teach developers about HTTP status codes. This tool serves as a quick reference when building APIs, helping you decide exactly what status code to return, why to return it, and what information you should (or shouldn't) include in the response payload.

## Features

- **Comprehensive Explorer**: Search and filter through standard HTTP status codes (1xx, 2xx, 3xx, 4xx, 5xx).
- **Interactive Simulator**: The "Which status code do I need?" simulator helps you select the correct status code based on common API scenarios.
- **Detailed Explanations**: Learn when to use and when NOT to use specific codes.
- **Playground**: Build an HTTP response interactively, configuring method, URL, and body content.
- **Dev vs Prod Context**: Toggle between Development and Production modes to see how error messages should change to avoid leaking sensitive data.
- **Knowledge Quiz**: Test your understanding of HTTP semantics with a 15-question interactive quiz.
- **Comparisons**: Understand the nuances between commonly confused codes (like 401 vs 403, or 400 vs 422).
- **Production Safety Guidelines**: Learn best practices for API error handling.

## Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (with custom semantic color palette)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the local development server:
```bash
npm run dev
```

### Production Build

To verify types and create a production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

- `src/components/`: Reusable UI elements (Buttons, Cards, Badges, CodeBlocks) and layout shells.
- `src/context/`: Global state management (e.g., ModeContext for Dev/Prod toggle).
- `src/data/`: Static typed data driving the application content.
  - `statusCodes.ts`: The core database of status codes.
  - `scenarios.ts`: Data for the quick-select simulator.
  - `comparisons.ts`: Data for the compare feature.
  - `quiz.ts`: Questions and answers for the quiz.
- `src/pages/`: Main application routes (Home, StatusCodes, Compare, Playground, etc.).
- `src/types/`: Strict TypeScript interfaces for the data models.

## How to Extend Data

Adding new content to the application is straightforward due to the clean data architecture.

### Add a New Status Code
Open `src/data/statusCodes.ts` and add a new object to the array following the `StatusCode` interface.

### Add a Quiz Question
Open `src/data/quiz.ts` and append a new `QuizQuestion` object.

### Add a Scenario or Comparison
Modify `src/data/scenarios.ts` or `src/data/comparisons.ts` similarly.

## Philosophy

This application is designed to teach the *mental model* behind HTTP semantics rather than just blind memorization. By categorizing codes, exploring edge cases, and simulating real-world scenarios, it helps developers build better, more robust APIs.
