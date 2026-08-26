product = require("../models/product");
class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        // http://localhost:5173?keyword=apple
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        console.log(this.query, this.queryStr);
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        // { 'price[gte]': '100', 'price[lte]': '1000' }
        const queryCopy = { ...this.queryStr };
        // console.log(queryCopy);
        // Removing fields from the query
        const removeFields = ['keyword', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

        let priceFilter = {};
        if (queryCopy['price[gte]'] || queryCopy['price[lte]']) {
            priceFilter.price = {};
            if (queryCopy['price[gte]']) {
                priceFilter.price.$gte = Number(queryCopy['price[gte]']);
            }
            if (queryCopy['price[lte]']) {
                priceFilter.price.$lte = Number(queryCopy['price[lte]']);
            }
            // priceFilter {
            //     price: {
            //         $gte: 100,
            //         $lte: 1000
            //     }
            // }
            delete queryCopy['price[gte]'];
            delete queryCopy['price[lte]'];
        }

        console.log(queryCopy);

        this.query = this.query.find(priceFilter);
        return this;
    }
}
module.exports = APIFeatures