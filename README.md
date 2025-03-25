# music-player

Desktop music player app inspired by nashallery and the Barble The Island Princess CD player I used to have as a kid. Built using Javascript and HTML/CSS in Electron.

Currently features bops from the Ponyo album and anthems of various Barbie movies. Audio files are not included the repository for copyright reasons, but should be uploaded to assets/audios. May expand artwork into other albums in the future.


To run this music player, after cloning for the first time, run the following command
```shell
npm install electron --save-dev
```

Then, to launch the app, run
```shell
npm start
```

To build into a packaged app, first run the following commands to import into Forge:
```shell
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

Then to build a distributable, run
```shell
npm run make
```
