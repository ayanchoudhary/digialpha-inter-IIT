import mongoose from "mongoose";
const { Schema } = mongoose;

const revenueSchema = new Schema({
    company_id: String,
    arpa: String,
    acv: String,
    churnRate: String,
    growth: String,
    rr: String,
    filingDate: String,

})

export default mongoose.model('revenue', revenueSchema);
