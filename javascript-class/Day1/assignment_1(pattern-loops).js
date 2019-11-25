var i, j;

function pattern(num) {
    for (i = num; i >= 0; i--) {
        var star = '';
        for (j = i; j > 0; j--) {
            star = star.concat('*');
        }
        console.log(star);
    }

}
pattern(5);