const ipLookUp = function(resolve) {
    fetch('http://ip-api.com/json')
        .then((res) => res.json())
        .catch((error) => undefined)
        .then((data) => resolve(data))
    
}
