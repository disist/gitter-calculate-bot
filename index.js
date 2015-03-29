"use strict";

var GitterBot = require("./lib/gitter-bot");

var gitterBot = new GitterBot({
	gitterRoom: process.argv[2],
	token: process.argv[3]
});

gitterBot.run();
