var student = {
    name: 'Supriya',
    address: 'ktm',
    email: 'abc',
    interst: 'ahs',
    education: [{
            name: 'ABC School of Schoolery',
            enrolledDate: 2000
        },
        {
            name: 'BCD School of Trickery',
            enrolledDate: 2006
        }
    ]
};

student.education.forEach(function(value) {
    console.log('Name: ' + value.name + ', Date: ' + value.enrolledDate);
});