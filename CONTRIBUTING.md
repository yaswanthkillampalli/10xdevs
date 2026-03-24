# Contributing to 10xDevs

Thank you for considering a contribution. This project is built by students, for students, and your help makes it better for everyone.

This guide outlines the standard workflow for contributing to the repository.

## Prerequisites
- Node.js (v20 or higher)
- Git installed on your machine
- Basic familiarity with Next.js and Tailwind CSS

---

## Step-by-Step Contribution Guide

### 1. Choose an Issue
Before writing code, check the Issues tab on GitHub.
- If you find an issue you want to work on, leave a comment like: "I would like to work on this."
- If you want to build a feature that is not listed, open a new issue first and discuss it with maintainers.

### 2. Fork the Repository
You do not have direct push access to the main repository. Create your own fork.
- Click the Fork button in the top-right of the GitHub repository page.
- This creates a copy of the project in your personal GitHub account.

### 3. Clone Your Fork Locally
Open a terminal and clone your fork:

```bash
git clone https://github.com/<your-username>/10xdevs.git
cd 10xdevs
```

### 4. Set Up the Upstream Remote
Connect your local repository to the original repository so you can pull the latest changes:

```bash
git remote add upstream https://github.com/yaswanthkillampalli/10xdevs.git
```

### 5. Create a Feature Branch
Never work directly on `main`. Create a descriptive branch for your changes.

```bash
# Make sure your local main is up to date
git checkout main
git pull upstream main

# Create and switch to a new branch
git checkout -b feature/add-dark-mode
# or
git checkout -b fix/login-button-alignment
```

### 6. Make Your Changes
Write your code and make sure to:
- Follow the existing code style.
- Verify your changes locally:

```bash
npm install
npm run dev
```

- If you add a new dependency, explain why in your pull request.

### 7. Commit Your Changes
Use clear, descriptive commit messages.

```bash
git add .
git commit -m "feat: add dark mode toggle to navigation"
```

Use conventional prefixes when possible: `feat:`, `fix:`, `docs:`, `refactor:`.

### 8. Push to Your Fork
Push your feature branch to your fork:

```bash
git push origin feature/add-dark-mode
```

### 9. Open a Pull Request
- Go to the original repository on GitHub.
- Click Compare & pull request.
- Fill out the PR description with:
	- What changed
	- Why it changed
	- Related issue references (for example: "Fixes #12")
- Submit the PR and wait for review.

Maintainers may request a few updates before merge. That is normal and helps keep quality high.

Happy coding.