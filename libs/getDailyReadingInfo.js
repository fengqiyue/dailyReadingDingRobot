const got = require('got');
const cheerio = require('cheerio');
const htmlparser2 = require("htmlparser2");

// 获取科技爱好者周刊最新的一篇文章的标题和链接 有 rss ，但我不用，就是去解析网页取 dom，就是玩（要是出问题，我就换回 rss）
const getRuanYiFengArticle = async ()=>{

  const {body} = await got.get(`https://github.com/ruanyf/weekly`);

  const $ = cheerio.load(body);
  const hostname = 'https://github.com';
  const lastArticleHref =  $('.markdown-body ul>li>a').first().attr('href')
  const articletitle = $('.markdown-body ul>li>a').first().text()
  const articleLink = hostname + lastArticleHref

  return {
    title:articletitle,
    messageUrl:articleLink,
  }
};

// 掘金
const getJuejinArticle = async () => await getInfoFromRSS(`https://juejin.cn/rss`)

// slate -technology 板块的 rss 
const getQuoraArticle = async () => await getInfoFromRSS(`https://slate.com/feeds/technology.rss`)

// segmentfault
const getSFArticle = async () => await getInfoFromRSS(`https://segmentfault.com/articles/feeds`)

// 奇舞团的文章，用了 rss 获取
const get75TeamArticle = async () => await getInfoFromRSS(`https://weekly.75.team/rss`)

// 少数派的文章
const getSspaiArticle = async () => await getInfoFromRSS(`https://sspai.com/feed`)

// 知乎
const getZhihuArticle = async () => await getInfoFromRSS(`https://www.zhihu.com/rss`)

// 好奇心日报
const getQDailyArticle = async () => await getInfoFromRSS(`http://www.qdaily.com/feed`)


const getInfoFromRSS = async rss =>{
  const {body} = await got.get(rss);
  const feed = htmlparser2.parseFeed(body);
  const lastArticle = feed.items[0]
  return {
    title:lastArticle.title,
    messageUrl:lastArticle.link,
    desc:lastArticle.description,
  }
}

// 周一，获取少数派文章
// 周二，Slate的文章，看看英文
// 周三，sf 的文章
// 周四，获取奇舞团周刊文章
// 周五，获取阮一峰先生科技爱好者周刊的文章
// 周六 知乎
// 周日 好奇心日报
const getTodayReading = async () => { //获取今日阅读内容

  const whatDay = ['日', '一', '二', '三', '四', '五', '六'][(new Date().getDay())]

  let result
  switch(whatDay){
    case '日':
      result = await getQDailyArticle();
      break;
    case '一':
      result = await getSspaiArticle();
      break;
    case '二':
      result = await getQuoraArticle();
      break;
    case '三':
      result = await getSFArticle();
      break;
    case '四':
      result  =  await get75TeamArticle();
      break;
    case '五':
      result  =  await getRuanYiFengArticle();
      break;
    case '六':
      result  =  await getZhihuArticle();
      break;
  }

  return {
    messageUrl:result.messageUrl,
    title:result.title,
    text:result.desc,
  }
}

exports.getTodayReading = getTodayReading