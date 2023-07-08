class APIFeatures {
    constructor(query, queryStr){// query means ask a question 
        this.query = query;
        this.queryStr = queryStr;
    }

    search (){
        const keyword = this.queryStr.keyword ? {
            name : { // name indicates you will be able to search name property in the database
                $regex: this.queryStr.keyword, // this is mongodb feature.
                // with the help of the $regex operator, we create a pattern(i.e., {position: {$regex: “developer”}})
                // that will return only those documents that contain developer string. 
                $options : 'i'// i means case insensetive
                // i: To match both lower case and upper case pattern in the string.
            }
        }:{}

        
        // console.log(keyword)
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}
        // console.log(queryCopy);
        //removing fields from the query
        const removeFields = ['keyword','limit','page']
        removeFields.forEach(el => delete queryCopy[el])
        //  console.log(queryCopy);

        //Advance filter for price, ratings etc
          console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match => `$${match}`)
        console.log(queryStr)
        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }

    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage  - 1)// if we need to go to second page then we skip products of first say 10 if 10 products per page.
        this.query = this.query.limit(resPerPage).skip(skip)
        return this 
    }
}


module.exports = APIFeatures 

