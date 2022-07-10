"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const configRef = __1.ref.child("config");
/** Pre-existing config for a specified guild. */
function getServerConfig(guildId) {
    return new Promise((resolve) => {
        configRef.child(guildId).once("value", (val) => resolve(val.val()));
    });
}
exports.default = getServerConfig;
//# sourceMappingURL=getServerConfig.js.map