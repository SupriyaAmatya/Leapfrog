var fruits = [{
        id: 1,
        name: 'Banana',
        color: 'Yellow'
    },
    {
        id: 2,
        name: 'Apple',
        color: 'Red'
    }
];

//search by name

function searchByName(array, name) {
    array.forEach(function(value) {
        if (value.name.toLowerCase() === name.toLowerCase()) {
            console.log('id: ' + value.id + ', name: ' + value.name + ', color: ' + value.color);
        }
    });
}
console.log('Search by name >>>');
searchByName(fruits, 'apple');

//search by key

function searchByKey(array, key, value) {
    array.forEach(function(val) {
        if (val[key.toLowerCase()].toLowerCase() === value.toLowerCase()) {
            console.log('id: ' + val.id + ', name: ' + val.name + ', color: ' + val.color);
        }
    });
}
console.log('Search by key >>>');
searchByKey(fruits, 'name', 'banana');