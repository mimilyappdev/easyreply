# EasyReply 引継ぎ資料（Claude Code向け）
> このドキュメントを読めば現状と次にやることがわかります。

---

## プロジェクト概要

- **サービス名**：EasyReply（ラクリプ）
- **対象ユーザー**：フリーランスのイラストレーター・デザイナー
- **目的**：コミッション（絵の依頼）対応の返信文を、ボタン選択だけで組み立てられるツール
- **リポジトリ**：https://github.com/mimilyappdev/easyreply

---

## ⚠️ 作業ファイルの注意

**作業対象は `src/` のみ。** `app/my.html` は古い並行ファイルで今後触らない。
- `src/index.html` + `src/main.js` → Viteビルド → `dist/` がリリース版
- i18nは `src/i18n/ja.json` / `src/i18n/en.json` で管理（i18nextライブラリ使用）
- `app/my.html` に入れた変更（カスタムボタン等）は `src/` へ移植すること

---

## フォルダ構成（確定）

```
easyreply/
├── index.html          ← LP
├── privacy.html
├── terms.html
├── manifest.json
├── icon-192.png
├── app/
│   ├── index.html      ← アプリ本体（メインファイル）
│   └── settings.html   ← 設定ページ
```

---

## 現在の実装状態

### アプリ本体（app/index.html）

**動いていること：**
- フェーズ選択（依頼前 / 依頼中 / 完了）
- 方向選択（受ける / 詳細確認 / 断る）
- コンテンツボタン選択 → プレビューテキスト自動生成
- 見積もり入力UI（品目・数量・単価 → 合計自動計算）
- コピーボタン・モバイル対応

**テンプレートの現状：**
- `const templates = { ... }` としてJSにハードコード（ベース）
- localStorageキー `er_templates` に保存する仕組みはあるが編集UIが未整備
- settings.htmlはJSON直貼りの粗削りな実装のみ

**localStorageキー：**
| キー | 内容 |
|---|---|
| `er_theme` | テーマ（warm / onyx）|
| `er_profile` | クリエイター名・SNS情報（JSON）|
| `er_templates` | カスタムテンプレート（JSON）|

---

## 確定した設計方針

| 項目 | 決定内容 |
|---|---|
| ベースボタン | 変更不可。既存のまま残す |
| 追加ボタン | 無料：3個まで／Pro・サブスク：無制限 |
| 保存場所 | localStorage |
| Firebase等 | 初期リリースでは使わない（サブスク版で将来対応） |

## プラン別機能

| 機能 | 無料 | Pro（買い切り） | サブスク |
|---|---|---|---|
| カスタムボタン | 3個まで | 無制限 | 無制限 |
| 自動保存 | ✗ | ✓ | ✓ |
| エクスポート | ✓ | ✓ | ✓ |
| インポート | ✗ | ✓ | ✓ |
| クラウド同期 | ✗ | ✗ | ✓（将来） |

---

## 次にやること（優先順）

### 🔴 Step 0：app/my.html の変更を src/ へ移植

`app/my.html` に実装したが `src/` に未反映のもの：
- カスタムボタン データ層（`customButtons` / `saveCustomButtons()` / `renderCustomButtonsFor()` / `renderCustomButtonsPanel()`）
- `buildPreview()` でのカスタムボタンテキスト参照
- during/done パネルのカスタムボタン表示コンテナ

EN対応（i18n）も同時に入れること（`src/i18n/ja.json` / `en.json` にキー追加）。

### 🔴 Step 1：追加ボタンUI実装

**仕様：**
- 各フェーズ・方向の画面に「＋ ボタンを追加」を表示
- タップ → ボタン名・本文を入力するモーダルまたはインライン入力
- 保存 → localStorageの `er_custom_buttons` キーに追記
- アプリ全体で3個に達したら → プレミアムモーダルを表示（買い切り誘導）
- 追加したボタンは編集・削除可能

**保存データ構造（案）：**
```json
{
  "er_custom_buttons": [
    {
      "id": "custom_001",
      "phase": "before",
      "direction": "accept",
      "label": "ボタン名",
      "text": "本文テキスト"
    }
  ]
}
```

### 🔴 Step 2：JSONエクスポート／インポート

- settings.htmlに「データをエクスポート」ボタンを追加（無料）
- `er_custom_buttons` の内容をJSONファイルとしてダウンロード
- インポート（復元）は課金機能（買い切り or サブスク）→ 上限モーダルと同様に誘導

### 🔴 Step 3：上限モーダル

- 10個に達したとき表示
- 「買い切りでもっと追加」のコピーを入れる
- 将来のサブスク移行を見越した設計にしておく（ボタンのリンク先はダミーでOK）

---

### 🟡 初期リリース後（触らなくていい）

- Firebaseログイン・クラウドバックアップ
- Stripe課金実装
- `er_profile` の `{{creator_name}}` をテンプレ内に展開
- 他アプリ（MiteOrder等）との連携

---

## 開発ルール（厳守）

- **いきなりコードを書かない** → 前提を確認してから
- **過剰実装しない** → 最小構成で解く
- **関係ないコードを触らない**
- **成功条件を決めてから検証まで回す**
- **不確実な成功は「成功」と言わない**

---

## ブランド・デザイン

**カラー（app/index.html）：**
```css
--brand: #3A6080;
--deep: #1A3A52;
--header-bg: #2C4A5E;
--bg: #F5F1EB;
--accent: #3A7CA5;
--premium: #B8860B;
--accept: #C8A030;
--decline: #6B7F8C;
```

**フォント：** BIZ UDGothic（本文）/ Tilt Warp（ロゴ）

**避けること：** スタートアップ女性向けアニメ調・強いSaaSブルー・過度に丸いフォント・幼稚な要素
