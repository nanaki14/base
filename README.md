## info

- gulp: ^4.0.2
- webpack: ^4.44.1

## setup

### node version

`10.11.0`

### install

```
npm install
```

or

```
yarn
```

### commands

usage `yarn [COMMAND_NAME]` or `npm run [COMMAND_NAME]`

#### dev

開発用タスク、ソースマップが使用可能なことやソースの minify がされないなど

#### build

公開用ファイルの生成、ソースマップの削除やソースの minify が可能

#### lint

eslint(standard)

#### format

prettier

#### VSCode setting.json

```
{
  "editor.formatOnSave": true,
  "html.format.unformatted": "wbr,%"
}
```

## EJS

### global 変数

`Develop` - `NODE_ENV=development` 時に true を返す

`Date` - `new Date().getTime()` を返す、主にタイムスタンプに使用
