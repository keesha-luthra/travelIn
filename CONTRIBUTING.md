# Contributing to TravelIN

First off, thank you for considering contributing to TravelIN! It's people like you that make open-source such a great community to learn, inspire, and create.

## 1. Where do I go from here?

If you've noticed a bug or have a feature request, please **open an issue** first.

## 2. Setting up your environment

1. Ensure you have **Node.js 18+** installed.
2. Fork and clone the repository.
3. Run `npm install` to install backend and developer dependencies.
4. Run `npm run dev` to start the local development server with hot-reloading.

## 3. Making Changes

- **Code Style:** We use Prettier and ESLint. Run `npm run format` and `npm run lint` before committing.
- **Pre-commit Hooks:** Husky and lint-staged will automatically format your code when you commit.
- **Validation:** Ensure you run `npm run build` to validate that any new HTML assets or links are correctly resolved.

## 4. Pull Requests

- Provide a clear and descriptive PR title.
- Explain the problem your PR solves and how you solved it.
- Ensure all CI checks (GitHub Actions) pass.
