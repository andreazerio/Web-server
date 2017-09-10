function showHandles (template, list) {
   let view = template.replace('{{handles}}',list);
    return view;
}

module.exports = showHandles;