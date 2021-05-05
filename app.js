const schedule = require('node-schedule');
const sendDingMsg = require('./libs/sendDingMsg.js');
const getDailyReadingInfo = require('./libs/getDailyReadingInfo.js');

const  scheduleCronstyle = ()=>{
  //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('8 9 10 * * *', async ()=>{ //每天的10点9分8秒执行
    // schedule.scheduleJob('10 * * * * *', async ()=>{ //每分钟的第十秒执行，测试用
        console.log('scheduleCronstyle:' + new Date());

        const {messageUrl,title,text} = await getDailyReadingInfo.getTodayReading()
        sendDingMsg.send({
          text,
          title,
          // picUrl:'',
          messageUrl,
        })
    }); 
}


scheduleCronstyle();
