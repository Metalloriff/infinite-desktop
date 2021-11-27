const { app, BrowserWindow, Tray, Menu, screen, desktopCapturer } = require("electron");
const fs = require("fs");
const path = require("path");

let tray;
function initTray() {
	tray = new Tray(path.join(__dirname, "img", "icon.png"));

	const contextMenu = Menu.buildFromTemplate([
		{ label: "Hide", click: () => windows.forEach(window => window.hide()) },
		{ label: "Show", click: () => windows.forEach(window => window.show()) },
		{ label: "Quit", click: () => app.exit(1) }
	]);

	tray.setToolTip("Electron Boilerplate");
	tray.setContextMenu(contextMenu);
}

const windows = [];
async function init() {
	// Create the main window
	const screens = screen.getAllDisplays();
	for (const screen of screens) {
		const window = new BrowserWindow({
			x: screen.bounds.x,
			y: screen.bounds.y,
			width: screen.bounds.width,
			height: screen.bounds.height,
			type: "desktop",
			autoHideMenuBar: true,
			transparent: true,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false,
				enableRemoteModule: true
			}
		});

		await window.loadFile(path.join(__dirname, "frontend", "index.html"));
		windows.unshift(window);
	}

	desktopCapturer.getSources({ types: ["screen"] }).then(async sources => {
		for (let i = 0; i < sources.length; i++) {
			const source = sources[i];
			const window = windows[i];

			window.webContents.executeJavaScript(`initializeRenderer("${source.id}")`);
		}
	});

	initTray();
}

// Disable hardware acceleration because hardware acceleration is a useless sack of garbage that just slows apps down and causes them to crash randomly for no reason
app.disableHardwareAcceleration();
// And then initialize when ready :)
app.whenReady().then(init);
// When all windows are closed, die
app.on("window-all-closed", app.exit.bind(app, 1));