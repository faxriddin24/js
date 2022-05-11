import { Telegraf } from 'telegraf'
import fetch from "node-fetch"
import client from './database.js'
const Token='5247095631:AAF-s6ebP-ZjDChQFkJCVm5GK0o0meEqMDY'
const bot = new Telegraf("5247095631:AAF-s6ebP-ZjDChQFkJCVm5GK0o0meEqMDY")
import  translator from 'translation-google'
var bir=0,ikki=0;
bot.start(ctx => {
    bir=0
    ikki=0
    client.query(`select * from uzen where chatid=${ctx.chat.id}`, (err, res) => {
        console.log(err);
       if (res.rowCount==0){
        client.query(`insert into uzen(chatid,bir,ikki) values(${ctx.chat.id},${bir},${ikki})`, (err1, res2) => {
            console.log(err1);
        })
       }
       else{
        client.query(`delete from uzen where chatid=${ctx.chat.id}`, (err1, res2) => {
            console.log(err1);
        })
        client.query(`insert into uzen(chatid,bir,ikki) values(${ctx.chat.id},${bir},${ikki})`, (err1, res2) => {
            console.log(err1);
        })
       }
    })
    ctx.reply("salom "+ctx.chat.first_name)
    ;(async () => { 
        let respose=await fetch(`https://api.telegram.org/bot${Token}/sendMessage`,{
            method:"POST",
            headers:{
               "Content-Type":"application/json"
            },
            body: JSON.stringify({
                 chat_id:ctx.chat.id,
                 text:"Tarjima yo'nalishini tanlang 🔽️",
                 reply_markup:{
                     one_time_keyboard:true,
                     resize_keyboard:true,
                     keyboard:[
                         [
                            {
                                text:"⚪️ Uz-En"
                             },
                             {
                                text:"⚪️ En-Uz"
                             }
                        ]
                    ]
                 }
            })
        })
        respose=await respose.json()
        console.log(respose);
    })()
})

bot.hears('🟢 Uz-En',ctx => {
    ;(async () => { 
        let respose=await fetch(`https://api.telegram.org/bot${Token}/sendMessage`,{
            method:"POST",
            headers:{
               "Content-Type":"application/json"
            },
            body: JSON.stringify({
                 chat_id:ctx.chat.id,
                 text:"<b>Uz-En</b> tarjima uchun matn yuboring 🔽️",
                 parse_mode:"HTML",
                 reply_markup:{
                     one_time_keyboard:true,
                     resize_keyboard:true,
                     keyboard:[
                         [
                            {
                                text:"🟢 Uz-En"
                             },
                             {
                                text:"⚪️ En-Uz"
                             }
                        ]
                    ]
                 }
            })
        })
        respose=await respose.json()
        console.log(respose);
    })()
})
bot.hears('🟢 En-Uz',ctx => {
    ;(async () => { 
        let respose=await fetch(`https://api.telegram.org/bot${Token}/sendMessage`,{
            method:"POST",
            headers:{
               "Content-Type":"application/json"
            },
            body: JSON.stringify({
                 chat_id:ctx.chat.id,
                 text:"<b>En-Uz</b> tarjima uchun matn yuboring 🔽️",
                 parse_mode:"HTML",
                 reply_markup:{
                     one_time_keyboard:true,
                     resize_keyboard:true,
                     keyboard:[
                         [
                            {
                                text:"⚪️ Uz-En"
                             },
                             {
                                text:"🟢 En-Uz"
                             }
                        ]
                    ]
                 }
            })
        })
        respose=await respose.json()
        console.log(respose);
    })()
})
bot.hears('⚪️ Uz-En', ctx => {
   bir=1
   ikki=0
   client.query(`update uzen set bir=${bir},ikki=${ikki} where chatid=${ctx.chat.id}`, (err, res) => {
    console.log(err);
   })
   ;(async () => { 
    let respose=await fetch(`https://api.telegram.org/bot${Token}/sendMessage`,{
        method:"POST",
        headers:{
           "Content-Type":"application/json"
        },
        body: JSON.stringify({
             chat_id:ctx.chat.id,
             text:"<b>Uz-En</b> tarjima uchun matn yuboring 🔽️",
             parse_mode:"HTML",
             reply_markup:{
                 one_time_keyboard:true,
                 resize_keyboard:true,
                 keyboard:[
                     [
                        {
                            text:"🟢 Uz-En"
                         },
                         {
                            text:"⚪️ En-Uz"
                         }
                    ]
                ]
             }
        })
    })
    respose=await respose.json()
    console.log(respose);
})()
})

// bot.hears('salom', ctx => {
//     if(bir===1){
//         ctx.reply("hello")
//     }
// })
bot.hears('⚪️ En-Uz', ctx => {
    ikki=2
    bir=0
    client.query(`update uzen set bir=${bir},ikki=${ikki} where chatid=${ctx.chat.id}`, (err, res) => {
        console.log(err);
    })
    ;(async () => { 
        let respose=await fetch(`https://api.telegram.org/bot${Token}/sendMessage`,{
            method:"POST",
            headers:{
               "Content-Type":"application/json"
            },
            body: JSON.stringify({
                 chat_id:ctx.chat.id,
                 text:"<b>En-Uz</b> tarjima uchun matn yuboring 🔽️",
                 parse_mode:"HTML",
                 reply_markup:{
                     one_time_keyboard:true,
                     resize_keyboard:true,
                     keyboard:[
                         [
                            {
                                text:"⚪️ Uz-En"
                             },
                             {
                                text:"🟢 En-Uz"
                             }
                        ]
                    ]
                 }
            })
        })
        respose=await respose.json()
        console.log(respose);
    })()
})
// bot.hears('apple', ctx => {
//     if(ikki===2){
//    ctx.reply("olma")
//     }
  
// })

// bot.hears('salom', ctx => {
//     ctx.reply("hello")
// })

bot.on('text', async (ctx) => {
    client.query(`select * from uzen where chatid=${ctx.chat.id}`, async (err, res) => {
        if(res.rows[0].bir==0 && res.rows[0].ikki==0){
            ctx.reply("Iltimos tilni tanlang!!!")
        }
        if(res.rows[0].bir==1){
            const text=ctx.update.message.text
            const translation=await translator(text,{from:'uz',to:'en'})
            ctx.reply(translation.text)
            ikki=0
        }
        if(res.rows[0].ikki==2){
            const text=ctx.update.message.text
            const translation=await translator(text,{from:'en',to:'uz'})
            ctx.reply(translation.text)
            bir=0
        }
    })

})
bot.launch()
