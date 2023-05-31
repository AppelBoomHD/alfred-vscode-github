# alfred-vscode-github
> Easily create new projects with GitHub source-control or open existing projects in [Visual Studio Code](https://code.visualstudio.com) with this [Alfred 5](https://www.alfredapp.com) workflow.
## Commands
- newproject: creates a new project in your project directory or a subdirectory, automatically initializes a matching GitHub repository and opens the project in Visual Studio Code.
- openproject: opens an existing project from your project directory or subdirectory in Visual Studio Code.
## Requirements
- [Visual Studio Code](https://code.visualstudio.com) (including the "[code](https://code.visualstudio.com/docs/setup/mac)" shell command)
- [Node.js](https://nodejs.org)
- [git](https://git-scm.com)
- A GitHub Api token (how to obtain: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#about-personal-access-tokens)
## Installation
### Automatic
Run this command in your shell to automatically install the workflow
```bash
npm install --global alfred-vscode-github
```

### Manual
1. Download the [workflow file](https://github.com/AppelBoomHD/alfred-vscode-github/releases/download/v1.0.1/alfred-vscode-github.alfredworkflow).
2. Double-click the downloaded file to install the workflow.

## Inspiration
[alfred-vscode](https://github.com/kbshl/alfred-vscode)
