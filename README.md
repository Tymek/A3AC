# Arma 3 Artillery Calculator
_for manual fire without in-game Artillery Computer._

### <strong align="center">**Last build: [a3ac.vercel.app](https://a3ac.vercel.app/)**</strong>

---

## Instructions


### Usage
If you don't know how to manual fire, watch [this video tutorial](https://www.youtube.com/watch?v=v6m232CL1Aw).

![screenshot](https://a3ac.vercel.app/screenshot.png)

1. Artillery type
	- mortar (MK6 Mortar / Mobile Mortar Truck)
	- MLRS (M5 Sandstorm)
	- howitzer (2S9 Sochor / M4 Scorcher)
2. Mode
	- map coordinates (default)
	- direct range
3. Main input area
	- X/Y coordinates &ndash; 4 digits per field!
	- altitude / range in meters
4. Adjustment
	- available (clickable) when yellow
	- in-game default key is F
5. Elevation
	- in-game PageUp/PageDown
	- hold Shift for precise manipulation
6. Direction
	- azimuth with up to 2 decilal places
7. Estimated round travel time
	- in seconds


__No "submit/calculate" button__ &ndash; live output triggered by every input change


---
### How to run
Just download this and open `www/index.html`

### ~~Build~~
~~__You need to meet all standard requirements for android compilation with Cordova__, or send files to build server.~~

~~cordova prepare~~

~~cordova build android~~


### This is a legacy hobby project
Made on Foundation framework with AngularJS and some jQuery. Sorry for poorly structured and undocumented (except some comments in Polish) code. Some logic in HTML file. App was not made to be public at first. On the plus side, code is very short, with main js file ~150 lines.

## Changelog
Changes tracked from first public version (v2). Repository initialized on v2.03

#### 2.5
- redeploy with Vercel
- depriciate Android "native" version
- update readme

#### 2.04
- save last settings (battery type and calculation mode)

#### 2.03
- viewpoint and zoom fix for mobile devices
- minor hotfixes

#### 2.02 RC
- image background
- font (Dezen Pro Regular)
- custom android app icon

#### 2.01 beta
- dark colours
- ETA (shell travel time) calculation fixed
- web favicon

### Scheduled changes
- ETA in minutes and seconds
- background align fix when showing keyboard
- calculation near range boundry with ground elevation difference (NaN error)

### Planned features
- **REWRITE** - maybe, someday, no promises
- shell spread (at least approximate value)
- indication if low angle fire is unavailable
- modded artillery (if existst and requested)
