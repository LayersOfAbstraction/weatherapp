const ipLookUp = function(resolve) {
    fetch('https://ip-api.com/json')
        .then((res) => res.json())
        .catch((error) => undefined)
        .then((data) => resolve(data))
    
}
