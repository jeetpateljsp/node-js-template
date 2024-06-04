### Branch naming convention
Please name your branch using the following convention:
```
<type>/<description>
```
Where `<type>` is one of the following:
- `feat` - for new features
- `fix` - for bug fixes
- `docs` - for documentation changes
- `release` - for release management

And `<description>` is a short description of the changes, for example:
```
feat/add-new-module
fix/issue-with-login
docs/update-readme
release/v1.0
```

### Commit messages
Please use the following format for your commit messages:
```
<type> (scope): <subject>
```
Where:
- `<type>` is one of the following:
    - `feat` - for new features
    - `fix` - for bug fixes
    - `docs` - for documentation changes
    - `style` - for changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    - `refactor` - for code changes that neither fixes a bug nor adds a feature
    - `perf` - for performance improvements
    - `test` - for adding missing tests or correcting existing tests
    - `chore` - for changes to the build process or auxiliary tools and libraries such as documentation generation
    - `release` - for release management
- `<scope>` is a filename or a module name or a package name (userservice, admin, auth, ...)
- `<subject>` is a short description of the change (e.g. added new feature for admin, fixed the login issue, updated the readme, etc)
- The commit message should be in the present tense. For example, "add feature" instead of "added feature".
- The body should be a detailed description of the change, and the footer should be a place to reference issues or PRs related to the change.
- `JIRA` issue numbers should be referenced in the footer.

For example:
  ```
  feat (admin): added new feature for admin to login and return JWT token and session cookie. #123
  ```

### Pull requests
Please create a pull request for your changes and assign a reviewer to review your code. Once the reviewer approves your changes, you can merge your pull request into the main branch.

Use the pull request template provided in the `.github/pull_request_template.md` file to create your pull request.

### Code reviews
@Todo: Add instructions for code reviews.