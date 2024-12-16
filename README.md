# 環境構築

`volta`, `aws cli` を入れておく

リポジトリを clone

下記を実行

```sh
yarn install
yarn lefthook install
```

# コマンド

```sh
# リント + フォーマットの安全な修正 (よく使う)
yarn fix

# テストの実行 (よく使う)
yarn test

# aws環境に反映 (よく使う)
yarn deploy

# リント + フォーマットのチェック
yarn lint

# 型やインポートのチェック
yarn typecheck
```
