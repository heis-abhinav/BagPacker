const { app, BrowserWindow } = require('electron');
let mainWindow;
app.on('ready',  () => {
	mainWindow = new BrowserWindow({
		width: 300,
		height: 600,
		minWidth: 300,
		minHeight: 300,
		show:false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation : false,
			enableRemoteModule :true
		}
	});
	mainWindow.loadFile('app/index.html');
	//mainWindow.loadURL(`file://${__dirname}/index.pug`)
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});
});