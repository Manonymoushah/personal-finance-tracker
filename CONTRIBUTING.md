# Contributing to Personal Finance Tracker

Thank you for considering contributing to this project! 

## How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/my-money-map-67.git
cd my-money-map-67

# Install dependencies
npm install

# Create .env file with your Supabase credentials
cp .env.example .env
# Edit .env with your values

# Run development server
npm run dev
```

## Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Run `npm run lint` before committing
- Write meaningful commit messages

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Update documentation if needed
- Ensure the app builds without errors (`npm run build`)
- Test your changes in both demo mode and with Supabase

## Reporting Bugs

Please open an issue with:
- A clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (browser, OS)

## Feature Requests

Feature requests are welcome! Please open an issue describing:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

## Questions?

Feel free to open an issue for any questions or clarifications.
