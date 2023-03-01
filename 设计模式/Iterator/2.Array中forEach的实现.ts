interface Array<T>{
    forEach2: any
}
Array.prototype.forEach2 = function(callback){
    for(let i=0; i< this.length; i++){
        callback.call(this, this[i], i, this);
    }
}

let array = [1,2,4];
array.forEach2((item, index, arr)=>{
    console.log({item, index, arr});
})