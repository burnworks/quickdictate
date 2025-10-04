import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("public"));

const portFromEnv = Number(process.env.PORT);
const port = Number.isFinite(portFromEnv) && portFromEnv > 0 ? Math.floor(portFromEnv) : 3000;

const toFiniteNumber = (raw) => {
    if (raw === undefined || raw === null || raw === "") return Number.NaN;
    const num = Number(raw);
    return Number.isFinite(num) ? num : Number.NaN;
};

const debugMode = String(process.env.DEBUG_MODE || "false").toLowerCase() === "true";
const realtimeModel = (process.env.REALTIME_MODEL || "gpt-4o-mini-realtime-preview").trim();

app.get("/api/debug-config", (_req, res) => {
    res.json({ debug: debugMode });
});

app.get("/api/realtime-token", async (_req, res) => {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
        return res.status(500).send("OPENAI_API_KEY is not configured.");
    }

    try {
        const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: realtimeModel,
            }),
        });
        if (!r.ok) {
            const detail = await r.text();
            return res.status(500).send(detail || "Failed to create realtime session.");
        }
        const data = await r.json();
        res.json({ client_secret: data.client_secret });
    } catch (e) {
        res.status(500).send(String(e));
    }
});

app.get("/api/asr-config", (_req, res) => {
    const defaultThreshold = 0.5;
    const defaultSilenceMs = 300;

    const rawThreshold = toFiniteNumber(process.env.ASR_VAD_THRESHOLD);
    const threshold = Number.isFinite(rawThreshold) && rawThreshold >= 0 && rawThreshold <= 1 ? rawThreshold : defaultThreshold;

    const rawSilenceMs = toFiniteNumber(process.env.ASR_VAD_SILENCE_MS);
    const silenceDurationMs = Number.isFinite(rawSilenceMs) && rawSilenceMs > 0 ? Math.round(rawSilenceMs) : defaultSilenceMs;

    res.json({
        model: process.env.ASR_MODEL || "gpt-4o-mini-transcribe",
        realtime_model: realtimeModel,
        language: process.env.ASR_LANGUAGE || "ja",
        vad: {
            threshold,
            silence_duration_ms: silenceDurationMs,
        }
    });
});

app.listen(port, () => console.log(`\x1b[32mhttp://localhost:${port}\x1b[0m`));



