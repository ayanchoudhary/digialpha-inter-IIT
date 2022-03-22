import mongoose from 'mongoose';


const MONGOURI = "mongodb://admin:th3_b3es7_p4ss_1_h4d@20.102.85.148:27017/";


mongoose.connect(MONGOURI).then(() => logger
    .info('MongoDB successfully connected'))
    .catch((err) => logger.error(err));

