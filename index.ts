import { spawn } from "child_process";
import express from "express";

const PORT = process.env.PORT || "5000";

const app = express();

app.post("/pdf-to-text", async (req, res) => {
  const pdfToText = spawn("pdftotext", ["-", "-"]);
  req.pipe(pdfToText.stdin);
  pdfToText.stdout.pipe(res);
});

app.listen(Number(PORT), () => {
  console.log("start poppler server on ", PORT);
});
