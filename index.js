
const data = require('./data/data.json');

var titles = [
"Project Name",
"Attachments",
"Project Description",
"Supplier Name",
"Sustainable product/service?",
"Diverse Supplier",
"Finance Approver",
"Finance Comments",
"Projected Marketing Revenue",
"D&B Results #1",
"Committed Spend",
"Projected Annual Spend",
"Projected Savings",
"Projected Revenue",
"Additional Financial Terms",
"Geographic Scope",
"Additional Business Terms",
"Additional Legal Terms",
"Effective Date",
"Contract Expiration Date",
"Legal Representative",
"Legal Comments",
"Legal Action Taken",
"Notice Address"
]

var approvals = [
    "1.",
    "2.",
    "3.",
    "4.",
    "5.",
    "6.",
    "7.",
    "8.",
    "9."
]
var top;
data["text"].forEach(element => {
    if(element.text == "Project" || element.text  == "Name" ){
        top 
        console.log(element)
    }
   
});




