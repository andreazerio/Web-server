function templating (template, data) {
    Object.keys(data).forEach(user => {
        let regex = new RegExp(`{{ ${user} }}`)
        template = template.replace(regex,data[user]);
    } )
     return template;
 }
 
 module.exports = templating;