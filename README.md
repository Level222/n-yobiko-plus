# N予備校+

N予備校サイトに様々な機能を追加するChrome拡張機能です。

**現時点ではN/S高のレポートのみに対応しています。他のコースはページの構造があまりにも異なるため、今のところ対応しておりません。**

## インストール

![インストール](screenshots/install.png)

### 一般向け

1. https://github.com/Level222/n-yobiko-plus/releases/latest/download/n-yobiko-plus.zip をダウンロード。 `zip` は解凍してもしなくてもよい。
2. `Google Chrome` を開き、 `chrome://extensions` とアドレスバーに入力して開く。
3. 右上の `デベロッパーモード` を有効にする。
4. ダウンロードした `zip` ファイルまたは解凍したフォルダを、左上の `パッケージ化されていない拡張機能を読み込む` から読み込むか、ドラッグアンドドロップする。

### 開発者向け

1. このレポジトリを `git clone` するか、 `zip` 形式でダウンロードして解凍。
2. `cd n-yobiko-plus`
3. `npm install`
4. `npm run build`
5. `./dist/unpacked` フォルダを一般向けと同じように読み込む。

## 機能一覧

### 動画の合計時間の表示

![動画の合計時間](screenshots/video-time.png)

動画を再生しているページ、各コースの章一覧のページ、月間レポートのページに以下の内容が表示されます。

- 全動画の総時間と視聴済みの総時間
- メイン動画の総時間と視聴済みの総時間
- Nプラス動画の総時間と視聴済みの総時間

### 成績確認表のハイライト

![成績確認表のハイライト](screenshots/highlight.png)

成績確認ページの表を月ごとにハイライトします。

### テキスト入力時の単語数の表示

![テキスト入力時の単語数の表示](screenshots/word-count.png)

テキスト入力時に文字数だけでなく単語数も表示します。

### キーボードショートカット

|コマンド|機能|補足|
|:---:|:---|:---|
|`Shift+ArrowRight`<br>`Shift+ArrowDown`|次の動画またはテスト||
|`Shift+ArrowLeft`<br>`Shift+ArrowUp`|前の動画またはテスト||
|`P`|ピクチャインピクチャ|動画にフォーカスがあるときのみ動作する|

### アクセシビリティの向上

- 動画や問題を開いた瞬間に、その動画や最初の問題にフォーカスが移動します。
- `Tab` キーで選択問題と完了のボタンをフォーカスできるようにします。
- `MathJax` の `Tab` キーによるフォーカスを無効にします。

## プライバシー保護方針

この拡張機能は、ユーザーのプライバシー保護を重視しており、以下のような方法でデータの収集、保存、外部への送信を行いません。

### データの収集と保存

この拡張機能は、ユーザーのブラウジングデータや個人情報を収集したり保存したりすることはありません。ユーザーが拡張機能を使用する際には、個人情報や機密情報の漏洩の心配はありません。

### 外部へのデータ送信

この拡張機能は、データを外部に送信することはありません。ユーザーのデータは、ユーザーのデバイス上でのみ処理され、拡張機能の機能の提供にのみ使用されます。データの第三者への提供や共有も行いません。

### オンライントラッキングや広告

この拡張機能は、ユーザーのオンライントラッキングやパーソナライズド広告の目的でデータを使用しません。ユーザーのプライバシーを尊重し、追跡や広告に関する操作は行いません。

## ライセンス

MIT
