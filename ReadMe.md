# 每日阅读钉钉机器人推送程序

## 原理

做了两件事：

### 获取要推送的文章

获取文章的消息：标题、详情、链接等

用了两个做法

#### 爬虫

用爬虫取获取一个文章的信息
这要求你有一个目标网页，这个网页上的某一个信息是你需要的

#### 解析rss

信息类网站大多数都有 rss；解析出来就可以了，比较简单，也好用

### 让机器人推送

这一步钉钉的文档说的挺清楚了：https://developers.dingtalk.com/document/app/custom-robot-access?spm=ding_open_doc.document.0.0.6d9d28e1g2FCXo#topic-2026027