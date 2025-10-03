# QuickDictate

QuickDictate は、OpenAI Realtime API を利用して話した内容をそのままテキスト化するブラウザツールです。  
メールや Slack の文面づくり、AI に渡すプロンプトの作成などを音声入力で効率化することを目的にしています。  
日本語での利用を想定していますが、日本語以外の言語でも自動的に判別して変換してくれるはずです。

## 特長

- 🎤 WebRTC と OpenAI Realtime セッション（`gpt-4o-realtime-preview`）によるリアルタイム音声キャプチャ
- 📝 `gpt-4o-mini-transcribe`（デフォルト設定）を使ったリアルタイム文字起こし
- 📋 生成済みテキストをすぐにコピーしたり、ワンクリックでクリアできる操作ボタン
- 🎚️ 入力音量を視覚的に確認できる音声入力レベル（VU）メーター
- ⚙️ API キー、ASR モデル、VAD の閾値、デバッグモードなどを環境変数ファイル `.env` で一括管理
- 🪪 `DEBUG_MODE=true` のときだけ表示されるデバッグログパネル機能
- 🎨 UI のスタイルは、Tailwind CSS を使用しており、カスタマイズが容易

## 必要環境

以下は必須です。

- Node.js **v22** 以上
- OpenAI API キー
- WebRTC に対応した最新版のブラウザ（Chrome、Edge、Firefox、Safari、iOS Safari など）

## はじめ方

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定  

`.env.sample` をコピーして `.env` を作成し、必要な値を設定します。

```env
OPENAI_API_KEY=your-api-key # 設定必須
ASR_MODEL=gpt-4o-mini-transcribe # gpt-4o-transcribe を指定することも可能
ASR_LANGUAGE=ja
ASR_VAD_THRESHOLD=0.5   # 0〜1 の範囲で音声検出感度を設定
ASR_VAD_SILENCE_MS=1000 # 無音が何ミリ秒続いたら改行するか
PORT=3000               # サーバーの待受ポート（任意）
DEBUG_MODE=false        # true にするとデバッグログを表示
```

### 3. Tailwind CSS のビルド（スタイルを変更した場合のみ実行）

```bash
npm run buildcss
```

`public/css/styles.css` が生成され、`index.html` から参照されます。

### 4. サーバを起動

```bash
npm run start
```

### 5. アプリにアクセス

ブラウザで `http://localhost:3000` を開きます。  
「音声入力開始」ボタンをクリックすると音声入力が始まり、マイクに向かって話した内容がテキストにリアルタイム変換されて表示されます。  
初回のみブラウザがマイクアクセスの使用許可を求めますので許可してください。

## 使い方のヒント

- **コピー / クリア**: 「テキストをコピー」ボタンでテキストの内容がクリップボードコピーされます。「テキストをクリア」ボタンを押すとテキストがリセットされます。
- **デバッグ表示**: `DEBUG_MODE=true` を設定するとデバッグパネルが表示され WebRTC のイベントを確認できます。通常は false のままにしてください。
- **無音検知**: `ASR_VAD_SILENCE_MS` は無音とみなす時間をミリ秒で指定します。デフォルトは 1 秒で、その時間、無音が続くと、テキストは改行されます。改行までの待ち時間を伸ばしたい場合は `ASR_VAD_SILENCE_MS` の値を大きくしてください。

## 注意点

`gpt-4o-mini-transcribe` の利用にはコストがかかります。あまり長文を変換し続けていると金額が大きくなる可能性がありますので十分注意してください。