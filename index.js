"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || '5000';
const poppler-server = (0, child_process_1.spawn)('poppler-server', { stdio: 'inherit' });
const app = (0, express_1.default)();
app.post('/convert', (req, res) => {
    // unoconvert [-h] [--convert-to CONVERT_TO] [--filter FILTER_NAME] [--interface INTERFACE] [--port PORT] infile outfile
    const convertTo = 'pdf';
    const unoconvert = (0, child_process_1.spawn)('unoconvert', ['--convert-to', convertTo, '-', '-']);
    req.body.pipe(unoconvert.stdin);
    unoconvert.stdout.pipe(res);
});
app.listen(Number(PORT), () => {
    console.log('start unoconv server on ', PORT);
});
