# Brainly - Your Digital Second Brain

Brainly is a minimal, futuristic bookmarks manager designed to help you curate and organize your digital mind. Easily save, embed, and search your YouTube videos, X/Twitter bookmarks, and rich text documents in a unified, private dashboard.

## Key Features

- **YouTube Embeds**: Preview and watch videos directly inside your dashboard.
- **Twitter Bookmarks**: Embedded Tweets rendered efficiently with client-side lazy loading.
- **Documents & Notes**: Draft descriptions, ideas, and text snippets in a markdown-friendly container.
- **Real-time Sharing**: Generate a unique public link to share your curated brain space with the world, with toggle-to-disable control.
- **Search**: Fast, real-time query searching across all saved notes and resources.

---

## Quick Start (Local Setup)

Follow these simple steps to run the project locally.

### Prerequisites
Make sure you have [Bun](https://bun.sh) installed, and a PostgreSQL database running locally (configured in the backend `.env`).

---

### 1. Setup the Backend

1. Navigate to the `backend` directory.
2. Create a `.env` file containing:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database"
   JWT_SECRET="your_secret_key"
   ```
3. Install dependencies:
   ```bash
   bun install
   ```
4. Run migrations:
   ```bash
   bun run db:generate
   bun run db:migrate
   ```
5. Start the server:
   ```bash
   bun run dev
   ```
   The backend will start on `http://localhost:8000`.

---

### 2. Setup the Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`.
