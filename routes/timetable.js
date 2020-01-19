var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get("/", function (req,res) {
    try{
        var input = [];
        var maths = fs.readFileSync('./csvfiles/Teacher wise class timetable - Maths.csv','utf8');
        var science = fs.readFileSync('./csvfiles/Teacher wise class timetable - Science.csv','utf8');
        var english = fs.readFileSync('./csvfiles/Teacher wise class timetable - English.csv','utf8');
        var kannada = fs.readFileSync('./csvfiles/Teacher wise class timetable - Kannada.csv','utf8');
        var hindi = fs.readFileSync('./csvfiles/Teacher wise class timetable - Hindi.csv','utf8');

        input.push(CSVToArray(maths,','));
        input.push(CSVToArray(science,','));
        input.push(CSVToArray(english,','));
        input.push(CSVToArray(kannada,','));
        input.push(CSVToArray(hindi,','));

        var subjects = ['Maths', 'Science', 'English', 'Kannada', 'Hindi'];
        var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var time = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
        var dataObject = [];
        var count = 0;
        for(var data of input){
            var subject = subjects[count];
            var timeCount = 0;
            for (var d of data){
                if(timeCount > 0){
                    var period = time[timeCount-1];
                    for(var i = 1; i <d.length; i++) {
                        if(d[i] != '' && d[i] != ' ' && d[i] != null) {
                            dataObject.push({
                                subject,
                                day: weekdays[i-1],
                                time: period,
                                class: d[i]
                            });
                        }
                    }
                }
                timeCount++;
            }
            count++;
        }
        var six = [];
        var seven = [];
        var eight = [];
        var nine = [];
        var ten = [];
        
        for(var object of dataObject) {
            if(object.class == '6th') {
                six.push(object);
            } else if (object.class == '7th'){
                seven.push(object);
            } else if (object.class == '8th'){
                eight.push(object);
            } else if (object.class == '9th'){
                nine.push(object);
            } else if (object.class == '10th'){
                ten.push(object);
            }
        }

        res.status(200).send({classwise_timetable : {sixth_class:six,seventh_class:seven,eighth_class:eight,ninth_class:nine,tenth_class:ten}});
        res.end();
    } catch (e){
        console.log('+++++++++++++++++++++', e);
    }
});

function CSVToArray( strData, strDelimiter ){
    strDelimiter = (strDelimiter || ",");

    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );

    var arrData = [[]];

    var arrMatches = null;
    while (arrMatches = objPattern.exec( strData )){

        var strMatchedDelimiter = arrMatches[ 1 ];

        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            arrData.push( [] );
        }

        var strMatchedValue;
        if (arrMatches[ 2 ]){
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {
            strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    return( arrData );
}

module.exports = router;