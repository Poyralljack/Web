
exports.getDate=function(){
    let today = new Date();
    let options = { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric' 
    };
    return day=today.toLocaleDateString("en-US",options);
}

exports.getDay=function(){
    let today = new Date();
    let options = { 
        weekday: 'long',
    };
    return day=today.toLocaleDateString("en-US",options);
}