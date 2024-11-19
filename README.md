# Dev Overflow - A problem solving community

![demo](https://res.cloudinary.com/dgur3iyy9/image/upload/v1699372466/pffcb0rwxtn6dao1xm83.jpg)

## 🌐 Demo

Here is a working live demo: https://dev-overflow-five-kappa.vercel.app/

## 📝 Description

Welcome to my project! Here, I'll provide you with a brief overview of what inspired me to create it, why it solves a problem, and what I've learned throughout its development.

- Motivation: I was motivated to build this project to address a specific issue and to enhance my coding skills.
- Why I Built This Project: My main goal was to create a practical and user-friendly solution to a real-world problem.
- Problem Solved: This project aims to simplify a particular task, making it more efficient and accessible.
- What I Learned: Throughout the development process, I gained valuable insights into various technologies and programming concepts.

## 🛠️ Setup Project

To get this project up and running in your development environment, follow these step-by-step instructions.

### 🍴 Prerequisites

We need to install or make sure that these tools are pre-installed on your machine:

- [NodeJS](https://nodejs.org/en/download/): It is a JavaScript runtime build.

- [Git](https://git-scm.com/downloads): It is an open source version control system.

### 🚀 Install Project

1. Clone the Repository

```bash
git clone https://github.com/JafirRehman/Dev-Overflow.git
```

2. Install packages

```
npm install
```

3. create a `.env.local` file add necessary credencitals

```bash

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
WEBHOOK_SECRET=
NEXT_PUBLIC_TINY_EDITOR_API_KEY=
MONGODB_URL=
```

4. Run the project using command below

```bash
npm run dev
```

## Key Features

- Ask questions and answer questions.
- Upvote, Downvote, and save questions.
- Include code snippets in your answers.
- Searching and filtering.
- View Top Questions and Popular Tags.
- Built-in recommendation algorithm.
- Global Search across the database.
- View all tags and tag-related questions.
- View and Edit your profile.
- Built-in badge system for earning badges.
- View, search jobs or filter by location.
- Light and Dark Mode.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- Clerk for Authentication
- Shadcn UI for reusable components
- PrismJS for syntax highlighting
- React Icons
- Zod for Form validation
- TinyMCE for the editor
- Query String
- Next themes for theme management
- JSearch API for job searching
- Vercel for deployment
