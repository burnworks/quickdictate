# QuickDictate

QuickDictate is a browser-based tool that leverages the OpenAI Realtime API to turn what you say directly into text. It is designed to streamline tasks such as drafting emails, preparing Slack messages, or composing prompts through voice input. Japanese is the primary target language, but the tool can usually recognise and transcribe other languages automatically as well.

## Features

- 🎤 Real-time speech capture via WebRTC and OpenAI Realtime Sessions (`gpt-4o-realtime-preview`)
- 📝 Live transcription powered by `gpt-4o-mini-transcribe` (default setting)
- 📋 Buttons to copy the generated text immediately or clear it with a single click
- 🎚️ A VU meter that visualises the input volume level
- ⚙️ Centralised environment-variable management (`.env`) for the API key, ASR model, VAD thresholds, and debug mode
- 🪪 A debug log panel that appears only when `DEBUG_MODE=true`
- 🎨 UI styling provided by Tailwind CSS for easy customisation

## Requirements

The following are required:

- Node.js **v22** or later
- OpenAI API key
- A modern browser with WebRTC support (Chrome, Edge, Firefox, Safari, iOS Safari, etc.)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.sample` to `.env` and fill in the required values.

```env
OPENAI_API_KEY=your-api-key                  # Required
ASR_MODEL=gpt-4o-mini-transcribe             # You can also specify gpt-4o-transcribe
ASR_LANGUAGE=ja
ASR_VAD_THRESHOLD=0.5                        # Set speech detection sensitivity in the 0–1 range
ASR_VAD_SILENCE_MS=1000                      # How many milliseconds of silence trigger a line break
PORT=3000                                    # Server listen port (optional)
REALTIME_MODEL=gpt-4o-mini-realtime-preview  # Model used for real-time speech recognition
DEBUG_MODE=false                             # Set true to show debug logs
```

### 3. Build Tailwind CSS (only when you change styles)

```bash
npm run buildcss
```

This generates `public/css/styles.css`, which is referenced from `index.html`.

### 4. Start the server

```bash
npm run start
```

### 5. Open the app

Open `http://localhost:3000` in your browser. Click the “Start Dictation” button to begin voice input. Grant microphone access when prompted so that speech can be converted into text in real time.

## Usage Tips

- **Copy / Clear**: Use the “Copy Text” button to send the transcription to your clipboard. The “Clear Text” button resets the text area and the internal buffers.
- **Debug View**: Set `DEBUG_MODE=true` to display the debug panel and inspect WebRTC events. For day-to-day use, keeping it `false` provides a cleaner interface.
- **Silence Detection**: `ASR_VAD_SILENCE_MS` specifies the duration of silence (in milliseconds) before the text is committed and a new line is inserted. The default is 1 second; increase the value if you want longer pauses before line breaks.

## Notes

Using `gpt-4o-mini-transcribe` incurs usage costs. If you continuously transcribe long passages, your charges can grow quickly, so monitor your usage carefully.
