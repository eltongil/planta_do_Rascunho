import assert from "node:assert";
import process from "node:process";
import {createServer} from "../src/server.ts";

console.assert(process.env.OPENROUTER_API_KEY, "OPENROUTER_API_KEY environment variable should be defined");
console.assert(createServer, "createServer function should be defined");