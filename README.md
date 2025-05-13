# ブログアプリケーション

## 概要
このプロジェクトは、React + TypeScriptで構築されたブログアプリケーションです。ユーザーは記事の投稿、閲覧、編集、削除ができます。

## 機能
- ユーザー認証（ログイン/新規登録）
- 記事の投稿、編集、削除
- マークダウン形式での記事作成
- 記事一覧表示
- 記事詳細表示

## 技術スタック
### フロントエンド
- React
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Markdown

### バックエンド
- Node.js
- Express
- MongoDB
- JWT認証

## セットアップ方法

### 必要条件
- Node.js (v14以上)
- npm または yarn
- MongoDB

### インストール手順

1. リポジトリのクローン
```bash
git clone [リポジトリURL]
cd blog
```

2. フロントエンドのセットアップ
```bash
cd front/blogfront
npm install
```

3. バックエンドのセットアップ
```bash
cd backend
npm install
```

4. 環境変数の設定
`.env`ファイルを作成し、必要な環境変数を設定します。

### 開発サーバーの起動

1. バックエンドサーバーの起動
```bash
cd backend
npm run dev
```

2. フロントエンドサーバーの起動
```bash
cd front/blogfront
npm run dev
```

## 使用方法

1. アプリケーションにアクセス
   - ブラウザで `http://localhost:5173` にアクセス

2. ユーザー登録/ログイン
   - 新規ユーザーは「新規登録」からアカウントを作成
   - 既存ユーザーは「ログイン」からアクセス

3. 記事の作成
   - ログイン後、「記事を投稿する」ボタンから新規記事を作成
   - マークダウン形式で記事を記述可能

4. 記事の閲覧
   - トップページで記事一覧を確認
   - 記事タイトルをクリックして詳細を表示

## ディレクトリ構造
```
blog/
├── front/
│   └── blogfront/          # フロントエンド
│       ├── src/
│       │   ├── components/ # Reactコンポーネント
│       │   ├── pages/      # ページコンポーネント
│       │   ├── contexts/   # Reactコンテキスト
│       │   └── ...
│       └── ...
└── backend/                # バックエンド
    ├── src/
    │   ├── controllers/    # コントローラー
    │   ├── models/        # データモデル
    │   ├── routes/        # APIルート
    │   └── ...
    └── ...
```