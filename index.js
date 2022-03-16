var express = require('express');
var app = express();
var fs = require('fs');
var { parse } = require('csv-parse');
// var data;
var parser = parse({ rows: true }, function (err, records) {
    // console.log(records);
    var newrecords = [];
    for (var i = 0; i < records.length; i++) {
        if (records[i].length == 49) {
            if (records[i][0] != 'kepid' && records[i][3] == 'CONFIRMED' && parseFloat(records[i][31]) >= .36 && parseFloat(records[i][31]) <= 1.11 && records[i][25] < 1.6) {
                newrecords.push(records[i]);
            }
        }
    }
    console.log("Required planet stats are as follows");
    console.log(newrecords);
    console.log("End");
});

fs.createReadStream('kepler_data.csv').pipe(parser);

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});