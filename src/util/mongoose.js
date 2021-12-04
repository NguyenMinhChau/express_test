module.exports = {
    mutipleObject: function (lists) {
        return lists.map((item) => {
            return item.toObject();
        });
    },
    singleObject: function (list) {
        return list ? list.toObject() : list;
    },
};
