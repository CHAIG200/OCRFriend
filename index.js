
const data = require('./data/data.json');

var titles = {
"Project Name" : {
    found : false,
    y: 0
},
"Attachments" :{
    found : false,
    y: 0
},
"Finance Approver" : {
    found : false,
    y: 0
},
"Finance Comments" : {
    found : false,
    y: 0
},
"Projected Marketing Revenue" : {
    found : false,
    y: 0
},
"D&B Results #1" : {
    found : false,
    y: 0
},
"Workflow Approvals" : {
    found : false,
    y: 0
}
};

console.log(titles["Project Name"].found)

data["text"].forEach(element => {
    if(titles["Project Name"].found == false && data["text"].text == "Project"){
        titles["Project Name"].found = true;
        titles["Project Name"].y = parseInt(top) - 10;
    }
});
