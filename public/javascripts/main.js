// $('#demo').pagination({
//     dataSource: [1, 2, 3, 4, 5, 6, 7,8],
//     pageSize:2,
//     pageRange: 1,
//     onPage: function(pageNum, e) {
//         console.log(">>>>: "+pageNum);
//     },
//     afterPageOnClick: function(event, page) {
//         url(page)
//         console.log(page)
//     },
// })


const url = (page) => {
    window.location.href = `/admin/users/` + page
}

const afterPageOnClick = function (event, current) {
    console.log(">>>: " + current);
}



$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    pageSize: 2,
    formatResult: function (data) {
        var result = [];
        for (var i = 0, len = data.length; i < len; i++) {
            result.push(data[i] + ' - good guys');
        }
        return result;
    },
    afterPageOnClick: function (event, page) {
        url(page)
    },
})

