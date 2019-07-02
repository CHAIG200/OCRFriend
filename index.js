
const data = require('./data/data2.json');

var titles = {
"Project Name" : {
    found : false,
    y: 0
},
"Attachments" :{
    found : false,
    y: 0
},
"Approver" : {
    found : false,
    y: 0
},
"Comments" : {
    found : false,
    y: 0
},
"Projected" : {
    found : false,
    y: 0
},
"D&B" : {
    found : false,
    y: 0
},
"Workflow Approvals" : {
    found : false,
    y: 0
}
};


data["text"].forEach(element => {
    if(titles["Project Name"].found == false && element.text == "Project"){
        titles["Project Name"].found = true;
        titles["Project Name"].y = parseInt(element.top) - 10;
    }

    if(titles["Project Name"].found  == false && titles["Attachments"].found == false && element.text == "Attachments"){
        titles["Attachments"].found = true;
        titles["Attachments"].y = parseInt(element.top) - 10;
    }

    if(titles["Approver"].found == false && element.text == "Approver"){
        titles["Approver"].found = true;
        titles["Approver"].y = parseInt(element.top) - 10;
    }

    if(titles["Approver"].found == false && titles["Comments"].found == false &&  element.text == "Comments"){
        titles["Comments"].found = true;
        titles["Comments"].y = parseInt(element.top) - 10;
    }

    if(titles["Projected"].found == false && element.text == "Projected"){
        titles["Projected"].found = true;
        titles["Projected"].y = parseInt(element.top) - 10;
    }

    if(titles["Projected"].found == false && titles["D&B"].found == false &&  element.text == "D&B"){
        titles["D&B"].found = true;
        titles["D&B"].y = parseInt(element.top) - 10;
    }

    if(titles["Workflow Approvals"].found == false && element.text == "Workflow"){
        titles["Workflow Approvals"].found = true;
        titles["Workflow Approvals"].y = parseInt(element.top) - 10;
    }
});

var m1,m2,m3,m4;

if(titles["Project Name"].found == true || titles["Attachments"].found == true){
    m1 = titles["Project Name"].found == true ? titles["Project Name"].y : titles["Attachments"].y;
    if(titles["Approver"].found == true || titles["Comments"].found == true){
        m2 = titles["Approver"].found == true ? titles["Approver"].y : titles["Comments"].y;
        if(titles["Projected"].found == true || titles["D&B"].found == true){
            m3 = titles["Projected"].found == true ? titles["Projected"].y : titles["D&B"].y;
            if(titles["Workflow Approvals"].found == true){
                m4 = titles["Workflow Approvals"].y;
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


function OCR(filename,callback){
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

OCR("./data/Test.jpg",(function(data){
    var json = data.ParsedResults;
}));

