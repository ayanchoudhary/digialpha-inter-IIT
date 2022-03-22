import mongoose from "mongoose";
const { Schema } = mongoose;

const unit_econsSchema = new Schema({
    ltv: String,
    payback: String,
    ltvRatio: String,
    company_id: String,
    filingDate: String,
});
export default mongoose.model('unit_econs', unit_econsSchema);