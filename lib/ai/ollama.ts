import http from "http";

const OLLAMA_HOST  = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL   ?? "llama3.2";

export function callOllama(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
      format: "json",
    });

    const url = new URL(`${OLLAMA_HOST}/api/generate`);

    const req = http.request(
      {
        hostname: url.hostname,
        port:     Number(url.port) || 11434,
        path:     "/api/generate",
        method:   "POST",
        headers: {
          "Content-Type":   "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
        timeout: 600_000, // 10 minutes — actual socket timeout, not undici
      },
      (res) => {
        let data = "";
        res.on("data",  (chunk) => { data += chunk; });
        res.on("end",   () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed.response ?? "");
          } catch {
            reject(new Error(`Ollama returned non-JSON: ${data.slice(0, 200)}`));
          }
        });
        res.on("error", reject);
      }
    );

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Ollama timed out after 10 minutes"));
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}