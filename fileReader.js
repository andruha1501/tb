const fs = require('fs');
const _ = require('lodash');

fs.readFile('allFollowers.txt', 'utf8',(err, data) => {
    if (err) throw err;
    let oldF = JSON.parse(data);
    fs.readFile('unfollowers.txt', 'utf8',(err, data) => {
        if (err) throw err;
        let newF = JSON.parse(data);
        console.log(_.differenceWith(oldF, newF, _.isEqual));
    })
});

