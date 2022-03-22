import mongoose from "mongoose";
const { Schema } = mongoose;

const engagementSchema = new Schema({
    company_id: String,
    penetration: String,
    // filingDate: String,
    users: String,
    nps: String,

})

export default mongoose.model('engagement', engagementSchema);