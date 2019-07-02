
const data = require('./data/data2.json');
const templates = require('./templates.js');


OCR("./data/Test.jpg",(function(data){
    var json = data.ParsedResults;
    var end = new Date().getTime();
    var time = end - start;
    var m1,m2,m3,m4;
    var BreakException = {};


    json[0].TextOverlay.Lines.forEach( element =>{

        element.Words.forEach(word =>{
            if(m1 == undefined && m2 == undefined && m3 == undefined && m4 == undefined){
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



    if(templates.IED["Project Name"].found == true || templates.IED["Attachments"].found == true){
        
        m1 = templates.IED["Project Name"].found == true ? templates.IED["Project Name"].y : templates.IED["Attachments"].y;
        console.log("Setting Position : "  + m1);
        if(templates.IED["Approver"].found == true || templates.IED["Comments"].found == true){
            m2 = templates.IED["Approver"].found == true ? templates.IED["Approver"].y : templates.IED["Comments"].y;
            console.log("Setting Position : "  + m2);
            if(templates.IED["Projected"].found == true || templates.IED["D&B"].found == true){
                m3 = templates.IED["Projected"].found == true ? templates.IED["Projected"].y : templates.IED["D&B"].y;
                console.log("Setting Position : "  + m3);
                if(templates.IED["Workflow Approvals"].found == true){
                    m4 = templates.IED["Workflow Approvals"].y;
                    console.log("Setting Position : "  + m4);
                    console.log("============ Information ============")
                    console.log("All markers have been found.\nDocument Type: Internal Execution Document");
                    console.log("First Marker Position: " + m1);
                    console.log("Second Marker Position: " + m2);
                    console.log("Third Marker Position: " + m3);
                    console.log("Fourth Marker Position: " + m4);
                    console.log("============ Information ============")
                }

            }
        }
    }
    console.log("Document Took " + (time / 1000) + " seconds to OCR And Split document.")
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
