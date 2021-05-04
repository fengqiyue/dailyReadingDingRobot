const got = require('got');

const config = require('../config');

const dLinkList = config.dLinkList; //从配置文件中获取钉钉机器人的 Webhook

const keyWorld = 'hello' //使用了关键字的机器人安全方式;

const send = params =>{
  const {
    msgtype = 'link',
    text = '今日阅读',
    title = '今日标题',
    picUrl = '',
    messageUrl = 'http://cheri.love',
  } = params;

  console.log('dLinkList',dLinkList)

  dLinkList.forEach(dLink =>{
    (async () => {

      console.log('任务开始：dLink',dLink,)
      console.log('title',title,)
      console.log('messageUrl',messageUrl,)
      console.log('text',`${text}，${keyWorld}，世界`,)
      const {body} = await got.post(dLink, {
        json: {
          'msgtype': msgtype, 
          'link': {
            "text": `${keyWorld},${text}`, 
            "title": title, 
            "picUrl": picUrl, 
            "messageUrl": messageUrl
          }
        },
        responseType: 'json'
      });
    })();
  })

  
}

exports.send = send;