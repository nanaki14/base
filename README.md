## info
  - gulp: 4.0.0
  - webpack: 4.25.1

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

開発用タスク、ソースマップが使用可能なことやソースのminifyがされないなど

#### build

公開用ファイルの生成、ソースマップの削除やソースのminifyが可能

#### lint

eslint(standard)

#### format

prettier(standard)

## styleguide

aigisを使用

### 使用方法

scssにこの形でコメントを記述してgulpタスクを実行すると `styleguide/` に出力

~~~
/*
---
name: ComponentName
category: CategoryName
tag: TagName
---

## TITLE

* DESC
* Markdown形式

```html
<div class="c-comp">lorem</div>
```

*/
~~~

## EJS

### global変数

`Develop` - `NODE_ENV=development` 時にtrueを返す

`Date` - `new Date().getTime()` を返す、主にタイムスタンプに使用


