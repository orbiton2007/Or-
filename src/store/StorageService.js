
function store(key, any) {
    localStorage[key] = JSON.stringify(any);
}

async function load(key) {
    var str = localStorage[key] || 'null';
    return await JSON.parse(str); 
}

export default {
    store,
    load
}