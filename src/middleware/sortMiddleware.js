module.exports = function SortMiddleware(req, res, next) {
    //Tạo 1 object mới đẩy qua view
    res.locals._sort = {
        enabled: false, //ban đầu vào thì mặc định là không sort
        type: 'default'
    }
    if(req.query.hasOwnProperty('_sort')){
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column
        })
    }
    next();
}
//Sau đó apply trên toàn bộ tuyến đường của chúng ta