class APIFeatures {
    constructor(query, queryString) {
        this.query = query; 
        this.queryString = queryString
    }

    filter(){
        var queryObject = {...this.queryString} 
        const execludedFields = ['sort', 'page', 'limit', 'fields']
        execludedFields.forEach(el=> delete queryObject[el]);

        var stringQuery = JSON.stringify(queryObject);
        stringQuery = stringQuery.replace(/\b(gte|gt|lte|lt)\b/g, match=> `$${match}`);

        queryObject = JSON.parse(stringQuery);
        this.query = this.query.find(queryObject)

        return this; 
    }

    sort(){
        if (this.queryString.sort){
            const sortQuery = this.queryString.sort.split(',').join(' ')
            console.log(sortQuery)
            this.query = this.query.sort(sortQuery);
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    limitFields() {
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ') ;
            this.query =  this.query.select(fields)
        } else {
            this.query =  this.query.select('-__v'); 
        }
        return this; 
    }

    pagination(){
        console.log(this.queryString)
        const page = this.queryString.page * 1 || 1 ;
        var limit = this.queryString.limit * 1 || 2 ;
        const skip  = (page - 1) * limit 
        const remain = this.query.length - skip ; 
        if (remain < limit )
            limit = remain ; 
        this.query = this.query.skip(skip).limit(limit); 

        if (this.queryString.page){
            const numTours =  Tour.countDocuments();
            if(skip > numTours) throw new Error('this page does not exist')
        }
        return this; 
    }
}

module.exports = APIFeatures; 