const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const cheerio = require("cheerio");
const fs = require('fs');
const _ = require('lodash');


nightmare
  .goto('https://www.instagram.com/accounts/login/')
  .wait('input')

  .click("button")
  .wait(".coreSpriteDesktopNavProfile")
  .click(".coreSpriteDesktopNavProfile")
  // .wait("a[href*=following]")
  // .click("a[href*=following]")
  .wait("a[href*=followers]")
  .click("a[href*=followers]")
  .wait('.PZuss')
  .evaluate(() => {
    return new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.querySelector(".j6cq2").scrollHeight;
        document.querySelector(".j6cq2").scrollTop += distance;
        totalHeight += distance;
  
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve(document.querySelector('.PZuss').innerHTML);
        }
      }, 100);
    });
  })
  //.end()
  .then(body => {
    let $ = cheerio.load(body);
    getFollowers($)
  })
  .catch(error => {
    console.error('Search failed:', error)
  })


  //let $ = cheerio.load(fs.readFileSync('followers.html'));
//   

  

  function getFollowers($) {
    let allFollowers = $('li').map(function (){
      return {
        username: $(this).find('a').eq(1).text(),
        name: $(this).find('div').eq(4).text(),
        avatar: $(this).find('a').children().attr('src')
      };
    }).get();
    fs.writeFile('allFollowers.txt', JSON.stringify(allFollowers), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
  }
  