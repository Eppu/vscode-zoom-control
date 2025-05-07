// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-zoom-control" is now active!');

	// Create a status bar item for zoom control with high priority (1000)
	const zoomStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
	zoomStatusBarItem.command = 'vscode-zoom-control.showZoomInput';
	zoomStatusBarItem.tooltip = 'Adjust VS Code Zoom Level';
	context.subscriptions.push(zoomStatusBarItem);

	// Update status bar item with current zoom level
	function updateZoomStatusBar() {
		const zoomLevel = vscode.workspace.getConfiguration().get('window.zoomLevel', 0);
		// Make the text more noticeable
		zoomStatusBarItem.text = `$(zoom-in) Zoom: ${zoomLevel}`;
		zoomStatusBarItem.show();
	}

	// Initial update - ensure it's called immediately
	updateZoomStatusBar();

	// Register command to show the zoom input box (primary method)
	const showZoomInputCmd = vscode.commands.registerCommand('vscode-zoom-control.showZoomInput', async () => {
		const currentZoom = vscode.workspace.getConfiguration().get('window.zoomLevel', 0);
		
		// Show input box for custom zoom level
		const newZoom = await vscode.window.showInputBox({
			title: 'Set Zoom Level',
			prompt: 'Enter a zoom level (e.g., 1.15, 0.75)',
			placeHolder: 'For example: 1.15, 0.85, 2.25, etc.',
			value: currentZoom.toString(),
			validateInput: (value) => {
				// Validate the input is a number
				const num = Number(value);
				return isNaN(num) ? 'Please enter a valid number' : null;
			}
		});
		
		if (newZoom !== undefined) {
			const newZoomValue = Number(newZoom);
			await vscode.workspace.getConfiguration().update('window.zoomLevel', newZoomValue, vscode.ConfigurationTarget.Global);
			updateZoomStatusBar();
		}
	});
	context.subscriptions.push(showZoomInputCmd);
	
	// Register command to show a compact quick pick menu (alternative method)
	const showZoomPickerCmd = vscode.commands.registerCommand('vscode-zoom-control.showZoomPicker', async () => {
		const currentZoom = vscode.workspace.getConfiguration().get('window.zoomLevel', 0);
		
		// Create list of zoom options with more precision
		const zoomOptions = [
			-2, -1.5, -1.25, -1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4, 5
		].map(level => ({
			label: level === 0 ? 'Reset Zoom (0)' : `${level > 0 ? '+' : ''}${level}`,
			description: level === currentZoom ? '(current)' : '',
			value: level
		}));
		
		// Define a type for our quick pick items
		interface ZoomQuickPickItem extends vscode.QuickPickItem {
			value: number | 'custom';
		}
		
		// Add a custom zoom level option
		const customOption: ZoomQuickPickItem = {
			label: '$(gear) Custom Zoom Level...',
			description: 'Enter a precise value (e.g., 1.15)',
			value: 'custom'
		};
		
		// Add the custom option to our list
		const allOptions: ZoomQuickPickItem[] = [...zoomOptions as ZoomQuickPickItem[], customOption];

		// Show quick pick to select zoom level
		const selected = await vscode.window.showQuickPick(allOptions, {
			placeHolder: 'Select zoom level',
			title: 'VS Code Zoom Control'
		});

		if (selected) {
			if (selected.value === 'custom') {
				// Show input box for custom zoom level
				vscode.commands.executeCommand('vscode-zoom-control.showZoomInput');
			} else {
				// Update zoom level with the selected preset
				await vscode.workspace.getConfiguration().update('window.zoomLevel', selected.value, vscode.ConfigurationTarget.Global);
				updateZoomStatusBar();
			}
		}
	});
	context.subscriptions.push(showZoomPickerCmd);

	// Register command to increase zoom
	const increaseZoomCmd = vscode.commands.registerCommand('vscode-zoom-control.increaseZoom', async () => {
		const currentZoom = vscode.workspace.getConfiguration().get('window.zoomLevel', 0);
		const newZoom = Math.round((currentZoom + 0.1) * 10) / 10; // Round to nearest 0.1
		await vscode.workspace.getConfiguration().update('window.zoomLevel', newZoom, vscode.ConfigurationTarget.Global);
		updateZoomStatusBar();
	});
	context.subscriptions.push(increaseZoomCmd);

	// Register command to decrease zoom
	const decreaseZoomCmd = vscode.commands.registerCommand('vscode-zoom-control.decreaseZoom', async () => {
		const currentZoom = vscode.workspace.getConfiguration().get('window.zoomLevel', 0);
		const newZoom = Math.round((currentZoom - 0.1) * 10) / 10; // Round to nearest 0.1
		await vscode.workspace.getConfiguration().update('window.zoomLevel', newZoom, vscode.ConfigurationTarget.Global);
		updateZoomStatusBar();
	});
	context.subscriptions.push(decreaseZoomCmd);

	// Register command to reset zoom
	const resetZoomCmd = vscode.commands.registerCommand('vscode-zoom-control.resetZoom', async () => {
		await vscode.workspace.getConfiguration().update('window.zoomLevel', 0, vscode.ConfigurationTarget.Global);
		updateZoomStatusBar();
	});
	context.subscriptions.push(resetZoomCmd);

	// Listen for configuration changes to update the status bar
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration('window.zoomLevel')) {
			updateZoomStatusBar();
		}
	}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
