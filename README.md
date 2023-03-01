# odin-calculator
Update to my calculator project for The Odin Project, removing the old four-function calculator design entirely and adding in a simple interpreter for mathematical expressions inspired by the syntax used by Texas Instruments calculators. The overall design is specifically inspired by the TI-30XIIS.

Rough around the edges but the important parts work:
- editable input buffer using the control buttons
- entered expressions parsed and evaluated using a recursive descent parser and tree evaluation of the AST

Currently (March 2023) converting the project to TypeScript to familiarize myself with that technology.

Deployed link: https://strbytes.github.io/scientific-calculator/
