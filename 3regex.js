//1
/(Bills)/

//2
/[A-Z]\d{9,}/

//3
/\d\S+/

//4
/[$ | -]\d\S+/

//5
const allAmount = ['€145.10','89.00€']

const reduce = allAmount.map(x => x.replace("€", ' '))
console.log(reduce)







