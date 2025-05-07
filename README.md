# VS Code Zoom Control

A simple Visual Studio Code extension that allows you to control the zoom level from the status bar. This extension provides a convenient way to adjust the window zoom level without diving into settings.

## Features

- Status bar item showing the current zoom level
- Direct input box for precise zoom level control (up to two decimal points, e.g., 1.15)
- Quick pick menu with preset zoom levels (alternative access method)
- Keyboard shortcuts for increasing/decreasing/resetting zoom
- Global zoom level control that persists between VS Code sessions

## Installation

### From VSIX File

1. Download the `.vsix` file from the latest release (`vscode-zoom-control-0.0.1.vsix`).
2. Open VS Code
3. Go to the Extensions view (click the Extensions icon in the Activity Bar or press `Cmd+Shift+X`)
4. Click on the "..." (More Actions) button at the top of the Extensions view
5. Select "Install from VSIX..."
6. Navigate to and select the VSIX file you downloaded

Alternatively, you can install it using the VS Code command line:

```bash
code --install-extension path/to/vscode-zoom-control-0.0.1.vsix
```

### From VS Code Marketplace

*Coming soon*

## Usage

After installing the extension, you'll see a zoom level indicator in the status bar (bottom right corner of VS Code). 

- Click on the zoom indicator to open a direct input box where you can type your desired zoom level
- Enter any numeric value (e.g., 1.15, 0.75, 2.25) for precise zoom control
- Use keyboard shortcuts for quick adjustments, or the Command Palette for additional options

## Quick Pick Menu

As an alternative to direct input, you can use the quick pick menu (via Command Palette) which offers:
- Preset zoom levels for quick selection
- A "Custom Zoom Level" option to enter precise values
- Quick access to frequently used zoom levels

## Keyboard Shortcuts

This extension provides the following keyboard shortcuts:

- Increase Zoom: 
  - `Ctrl+NumpadAdd` (Windows/Linux) or `Cmd+NumpadAdd` (Mac)
  - `Ctrl+Alt+Plus` (Windows/Linux) or `Cmd+Option+Plus` (Mac)
- Decrease Zoom: 
  - `Ctrl+NumpadSubtract` (Windows/Linux) or `Cmd+NumpadSubtract` (Mac)
  - `Ctrl+Alt+Minus` (Windows/Linux) or `Cmd+Option+Minus` (Mac)
- Reset Zoom: 
  - `Ctrl+Numpad0` (Windows/Linux) or `Cmd+Numpad0` (Mac)
  - `Ctrl+Alt+0` (Windows/Linux) or `Cmd+Option+0` (Mac)

## Commands

The following commands are available in the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

- `Zoom Control: Enter Custom Zoom Level` - Opens an input box to enter a precise zoom level
- `Zoom Control: Select Zoom Level` - Opens a quick pick menu with preset zoom levels
- `Zoom Control: Increase Zoom Level` - Increases the zoom level by 0.1
- `Zoom Control: Decrease Zoom Level` - Decreases the zoom level by 0.1
- `Zoom Control: Reset Zoom Level` - Resets the zoom level to 0

## Publishing to VS Code Marketplace

If you'd like to publish this extension to the VS Code Marketplace, follow these steps:

1. **Create a Personal Access Token (PAT)** on Azure DevOps:
   - Go to [Azure DevOps](https://dev.azure.com/)
   - Sign in with your Microsoft account
   - Click on your profile icon in the top right corner
   - Select "Personal access tokens"
   - Click "New Token"
   - Give it a name (e.g., "VS Code Extensions")
   - Set Organization to "All accessible organizations"
   - Set Scopes to "Full access" or select "Marketplace" with "Manage" permission
   - Click "Create" and save the token securely

2. **Login with your PAT**:
   ```bash
   npx vsce login <publisher-name>
   ```
   When prompted, enter your PAT as the password.

3. **Prepare your extension**:
   - Update the metadata in `package.json` with your information
   - Ensure you have a good README, changelog, and an attractive icon
   - Test the extension thoroughly

4. **Package and publish**:
   ```bash
   npx vsce publish
   ```

5. **Verify your extension**:
   - After publishing, visit the [VS Code Marketplace](https://marketplace.visualstudio.com/) to verify your extension appears
   - It may take a few minutes for your extension to appear in the marketplace

For more details, check the [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) guide in the VS Code documentation.

## Contributing & Release Process

This extension is managed through GitHub. Here's how we handle development and releases:

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Release Process

We use GitHub Releases to distribute new versions. The process is:

1. **Update Version**: Change version number in `package.json`
2. **Update CHANGELOG.md**: Document changes under a new version heading
3. **Commit Changes**: 
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "Prepare release v0.0.2"
   ```
4. **Create Tag**: 
   ```bash
   git tag -a v0.0.2 -m "Version 0.0.2"
   git push origin v0.0.2
   ```

The GitHub Actions workflow will automatically:
- Build the extension
- Package it as a VSIX file
- Create a GitHub Release with the VSIX attached
- Use CHANGELOG.md content as release notes

Users can then download the VSIX file directly from the GitHub Releases page or install from the VS Code Marketplace if published there.

### Version Naming Convention

We follow Semantic Versioning (SemVer):
- MAJOR version when making incompatible API changes
- MINOR version when adding functionality in a backward compatible manner
- PATCH version when making backward compatible bug fixes

## Release Notes

### 0.0.1

- Initial release
- Status bar zoom indicator
- Direct input for precise zoom level control
- Quick pick zoom selector
- Keyboard shortcuts for zoom adjustment

---

**Enjoy!**
