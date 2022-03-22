import mongoose from 'mongoose';
import csv from 'csvtojson';


const MONGOURI = "mongodb://admin:th3_b3es7_p4ss_1_h4d@20.102.85.148:27017/";



const csvFilePath = './list3.csv'
// csv()
//     .fromFile(csvFilePath)
//     .then((jsonObj) => {
//         console.log(jsonObj);
//     })

mongoose.connect(MONGOURI).then(() => console.log(
    'MongoDB successfully connected'))
    .catch((err) => console.log(err));


// Async / await usage
const jsonArray = await csv().fromFile(csvFilePath);
console.log({ jsonArray, count: jsonArray.length })