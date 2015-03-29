"use strict";

var Gitter = require("node-gitter");
var Vm = require("vm");
var DefaultConfig = require("./default-config");

/*
 * Class GitterBot.
 * @param {String} config.token token to gitter.im.
 * @param {String} config.gitterRoom name room gitter.im.
 */
var GitterBot = function(config) {
	config = config || {};
	this.token = config.token || DefaultConfig.token;
	this.gitterRoom = config.gitterRoom || DefaultConfig.gitterRoom;
};
/*
 * Starting the bot.
 */
GitterBot.prototype.run = function() {
	var gitter = new Gitter(this.token);
	gitter.rooms.join(this.gitterRoom)
		.then(this.onSuccessRoomJoin.bind(this))
		.fail(this.onFailRoomJoin.bind(this));
};
/*
 * Handler successfully joined the room.
 * @param {Object} room.
 */
GitterBot.prototype.onSuccessRoomJoin = function(room) {
	console.log("Joined room: ", room.name);
	room.listen().on("message", function(message) {
		this.processMessage(message, room);
	}.bind(this));
};
/*
 * Handler failure join the room.
 * @param {String} error.
 */
GitterBot.prototype.onFailRoomJoin = function(error) {
	console.log("Not possible to join this room: ", error);
};
/**
 * Returns the result of the expression.
 * @param {String} expression.
 * @returns {String} result.
 */
GitterBot.prototype.getResultOfExp = function(expression) {
	var result = Vm.runInNewContext(expression, {});
	return expression + "=" + result;
};
/**
 * Processes the message from Gitter
 * @param {Object} message.
 * @param {Object} room.
 */
GitterBot.prototype.processMessage = function(message, room) {
	if (message.text.match(/calc /) !== null) {
		var expression = message.text.replace(/[^\d\+\-\/\*\(\)]/g, "");
		if (expression !== "") {
			try {
				var answer = this.getResultOfExp(expression);
				room.send(answer);
			} catch (exception) {
				console.log("Error calculate expression because: ", exception);
			}
		}
	}
};
/*
 * Expose the module.
 */
module.exports = GitterBot;

