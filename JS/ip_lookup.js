const ipLookUp = function(resolve) {
    try{
    fetch('http://ip-api.com/json')
        .then((res) => res.json())
        .catch((error) => undefined)
        .then((data) => resolve(data))
    }catch(err){return undefined;}
}
