---
id: 244
title: Quickly serve html files from node, php, or python
date: 2016-05-03T23:48:21+00:00
categories:
  - Tools
---

There will be times where you need to server some files through a browser and instead of setting a local instance of apache or MAMP, it might just be easier to use something in the command-line. I would recommend the node option as it seems to have a few more options. Mac ships with python and PHP which make those easier in some cases. Also, the PHP server will handle php files along with standard html.

## Node

First install `http-server` globally via npm.

```shell
npm install -g http-server
```

Then it's as easy as

```shell
http-server
```

## PHP

```shell
php -S <domain>:<port>
```

ie: `php -s localhost:8000`

## Python

```
python -m SimpleHTTPServer
```

ie: `python -m SimpleHTTPServer 8000`
