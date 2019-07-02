const templates = require('./templates.js');
const Jimp = require('jimp');

OCR("./data/Test.jpg",(function(data){
    console.log("OCR Starting...")
    var json = data.ParsedResults;

    var m8,m4,m9,m7;
    var fl = 5000, fr = 0;

    /*
    | Q0ZI |================================================================================================================================|
    Section takes the json that is outputted by the api and parses it and looks for the markers and stores the location of specific keyword
    | Q0ZI |================================================================================================================================|
    */
    json[0].TextOverlay.Lines.forEach( element =>{

        element.Words.forEach(word =>{
            if(word.Left < fl){
                fl = word.Left;
            }
            if(word.Left > fr){
                fr = word.Left;
            }
            if(m8 == undefined && m4 == undefined && m9 == undefined && m7 == undefined){
                if(templates.IED["Project Name"].found == false && word.WordText == "Project"){
                    templates.IED["Project Name"].found = true;
                    templates.IED["Project Name"].y = parseInt(word.Top) - 10;
                }
            
                if(templates.IED["Project Name"].found  == false && templates.IED["Attachments"].found == false && word.WordText == "Attachments"){
                    templates.IED["Attachments"].found = true;
                    templates.IED["Attachments"].y = parseInt(word.Top) - 10;
                }
            
                if(templates.IED["Approver"].found == false && word.WordText == "Approver"){
                    templates.IED["Approver"].found = true;
                    templates.IED["Approver"].y = parseInt(word.Top) - 10;
                }
            
                if(templates.IED["Approver"].found == false && templates.IED["Comments"].found == false &&  word.WordText == "Comments"){
                    templates.IED["Comments"].found = true;
                    templates.IED["Comments"].y = parseInt(word.Top) - 10;
                }
            
                if(templates.IED["Projected"].found == false && word.WordText == "Projected"){
                    templates.IED["Projected"].found = true;
                    templates.IED["Projected"].y = parseInt(word.Top) - 10;
                }
            
                if(templates.IED["Projected"].found == false && templates.IED["D&B"].found == false &&  word.WordText == "D&B"){
                    templates.IED["D&B"].found = true;
                    templates.IED["D&B"].y = parseInt(word.Top) - 10;
                }
            
                if(templates.IED["Workflow Approvals"].found == false && word.WordText == "Workflow"){
                    templates.IED["Workflow Approvals"].found = true;
                    templates.IED["Workflow Approvals"].y = parseInt(word.Top) - 10;
                }
            }

        })

    });

    fl = fl - 30;
    fr = fr + 30;

    /*
    | Q0ZI |==============================================================================================================================================|
    Section Uses two markers to identify the locations of each section in the event one of the markers are not found via the OCR. Increasing the Accuracy
    | Q0ZI |==============================================================================================================================================|
    */

    if(templates.IED["Project Name"].found == true || templates.IED["Attachments"].found == true){
        m8 = templates.IED["Project Name"].found == true ? templates.IED["Project Name"].y : templates.IED["Attachments"].y;
        if(templates.IED["Approver"].found == true || templates.IED["Comments"].found == true){
            m4 = templates.IED["Approver"].found == true ? templates.IED["Approver"].y : templates.IED["Comments"].y;
            if(templates.IED["Projected"].found == true || templates.IED["D&B"].found == true){
                m9 = templates.IED["Projected"].found == true ? templates.IED["Projected"].y : templates.IED["D&B"].y;
                if(templates.IED["Workflow Approvals"].found == true){
                    m7 = templates.IED["Workflow Approvals"].y;
                    console.log("============ Information ============")
                    console.log("All markers have been found.\nDocument Type: Internal Execution Document");
                    console.log("First Marker Position: " + m8);
                    console.log("Second Marker Position: " + m4);
                    console.log("Third Marker Position: " + m9);
                    console.log("Fourth Marker Position: " + m7);
                    console.log("============ Information ============")
                }

            }
        }
    }
    console.log("OCR Complete...")
    console.log("Split Starting...")
    seperate("./data/Test.jpg",[m8,m4,m9,m7,fl,fr],(function(end){
        var time = end - start;
        console.log("Document Took " + (time / 1000) + " seconds to OCR.");
        console.log("Document Completed.");
    }))

    

}));





var start;
function OCR(filename,callback){
    start = new Date().getTime();
    var fs = require("fs");
    var request = require("request");

    var options = { method: 'POST',
    url: 'https://api.ocr.space/parse/image',
    headers: {'Cache-Control': 'no-cache','content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
    formData: { apikey: '5a64d478-9c89-43d8-88e3-c65de9999580',file: { value: fs.createReadStream(filename),options: { filename: filename,contentType: null } },isCreateSearchablePdf: 'true' } };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    callback(JSON.parse(body));
});

}


function seperate(file, locations,callback){
    console.log(locations);
    var minX = locations[4];
    var width = locations[5] - locations[4];

   var sections = 
       [
       {
        id : 1,
        beginY : locations[0],
        height : locations[1] - locations[0]
       },{
        id : 2,
        beginY : locations[1],
        height : locations[2] - locations[1]
       },{
        id : 3,
        beginY : locations[2],
        height : locations[3] - locations[2]
       },{
        id : 4,
        beginY : locations[3],
        height : locations[3]
       }
    ]

    sections.forEach(section =>{


        Jimp.read(file, (err, img) => {
            if (err) throw err;
            var y  = section.beginY;
            var height = section.height;
           var newHeight = y > locations[2] ? img.bitmap.height - height : height;
         
                img.crop(minX, y,Math.round(width),newHeight).quality(100).invert().write('./test/' + idGenerator() + "/" + section.id + "-" + file.split('/')[2]);
          });
     
    });
    callback(new Date().getTime());
}
function idGenerator() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
