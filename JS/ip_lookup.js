const ipLookUp = function(resolve) {
    try{
    fetch('https://ip-api.com/json')
        .then((res) => res.json())
        .catch((error) => undefined)
        .then((data) => resolve(data))
    }catch(error){return undefined;}
}
