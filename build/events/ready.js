"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ready = {
    name: 'ready',
    once: true,
    execute: function (client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setActivity("/help", { type: "WATCHING" });
    }
};
exports.default = ready;
//# sourceMappingURL=ready.js.map