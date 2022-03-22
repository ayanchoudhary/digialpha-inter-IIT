import mongoose from 'mongoose';

const { Schema } = mongoose;


const acquisitionSchema = new Schema({

    Company: String,
    company_id: String,
    Number_of_new_accounts: String,
    Sales_Cycle: String,
    Percentage_Conversion: String,
    CAC: String,
    cik_number: String,
    leads: String,
    // AU: String,
    // Penetration_rate: String,
    // nps: String,
    // rr: String,
    // churn_rate: String,
    // arpa: String,
    // acv: String,
    // ltv: String,
    // CAC_Payback: String,
    // LTV_CAC: String,

});

export default mongoose.model('acquisition', acquisitionSchema);
