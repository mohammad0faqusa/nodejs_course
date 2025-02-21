module.exports = (template, data) =>{ 
    template = template.replace('{NAME}', data.name);
    template = template.replace('{ID}', data.id); 
    return template; 
}

