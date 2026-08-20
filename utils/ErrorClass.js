class ErrorClass extends Error{
    constructor(status,message){
        super(message);
        this.status=status;
    }
}

module.exports=ErrorClass;