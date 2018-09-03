function sprintf(text){
    var i=1, args=arguments;
    return text.replace(/%s/g,function(){
        return (i<args.length) ? args[i++] : "";
    })
}

// function addItem(url,text){
//     var mylist = document.getElementById("mylist"),
//         templateText = mylist.firstChild.nodeValue,
//         result = sprintf(templateText, url, text);
//     mylist.insertAdjacentHTML("beforeend",result);
// }


function addItem(url,text){
    var mylist = document.getElementById("mylist"),
        script = document.getElementById("list-item"),
        templateText = script.text,
        result = sprintf(templateText, url, text),
        div = document.createElement('div');
    
    div.innerHTML=result.replace(/^\s*/, "");
    mylist.appendChild(div.firstChild);
}

addItem("https://www.baidu.com/","Fifth item")

