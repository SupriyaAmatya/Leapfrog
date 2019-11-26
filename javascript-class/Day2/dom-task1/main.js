var parent = document.getElementById('main-container');

// var child = document.createElement('div');

parent.style.width = '600px';
parent.style.height = '600px';
parent.style.background = '#ececec';
parent.style.position = 'relative';
parent.style.margin = '50px 200px';

// parent.appendChild(child);

// child.style.background = 'blue';
// child.style.width = '15px';
// child.style.height = '15px';
// child.style.borderRadius = '50px';
// child.style.position = 'absolute';
// child.style.top = '10px';
// child.style.left = '20px';

var points = [
    { x: 30, y: 20 },
    { x: 70, y: 50 },
    { x: 260, y: 200 },
    { x: 30, y: 220 },
    { x: 400, y: 40 },
    { x: 160, y: 20 },
    { x: 330, y: 160 }
];

points.forEach(function(value) {
    var child = document.createElement('div');
    child.style.background = 'blue';
    child.style.width = '15px';
    child.style.height = '15px';
    child.style.borderRadius = '50px';
    child.style.position = 'absolute';

    child.style.top = value.y + 'px';
    child.style.left = value.x + 'px';
    parent.appendChild(child);
});