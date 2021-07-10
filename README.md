# riff-terminal

Portrait video viewer with extra steps.
Built for [Trier University of Applied Science](https://www.hochschule-trier.de/) on behalf of [Senckenberg Museum Frankfurt](https://museumfrankfurt.senckenberg.de/de/ausstellung/ausstellung/korallenriff/).

## Project setup

```sh
npm install
```

### Compiles and hot-reloads for development

```sh
npm run electron:serve
```

### Compiles and minifies for production

```sh
npm run electron:serve
```

### Lints and fixes files

```sh
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Mark your favourite issue high priority by bribing me with coffee!
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C256RKD)

## PC Lockdown Instructions

from CMD with admin privileges:

```
reagentc.exe /disable
bcdedit /set {bootmgr} displaybootmenu no
bcdedit /set bootstatuspolicy ignoreallfailures
bcdedit /set recoveryenabled no
bcdedit /set {default} bootstatuspolicy ignoreallfailures
bcdedit /set {default} recoveryenabled no
```