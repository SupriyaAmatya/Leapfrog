var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
    return collection.map(function(value) {
        return tranFunc(value);
    });
}

var output = transform(numbers, function(num) {
    return num * 2;
});

console.log('Transformed Array >>> ', output);