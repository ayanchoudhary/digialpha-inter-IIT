import mongoose from 'mongoose';
import csv from 'csvtojson';
import companiesSchema from './companySchema.js';
import acquisitionSchema from './acquisitionSchema.js'
import revenueSchema from './revenueSchema.js';
import engagementSchema from './engagementSchema.js';
import unit_econsSchema from './unit_econsSchema.js';

const COMPANIES = './data.csv'
const MONGOURI = "mongodb://admin:th3_b3es7_p4ss_1_h4d@20.102.85.148:27017/";
// const MONGOURI = "mongodb+srv://admin:admin@cluster0.trmmq.mongodb.net/test";

const maptoCompanySchema = (data) => ({
    Company: data.Company,
    cik_number: data.cik_number,
    sentiment: data.sentiment,
    symbol: data.symbol,
    filingStart: data.filingStart,
    sic: data.sic
})
const mapToAcquisitionSchema = (data) => ({
    Company: data.Company,
    cik_number: data.cik_number,
    Number_of_new_accounts: data.Number_of_new_accounts,
    Sales_Cycle: data['Sales Cycle'],
    penetration: data['Percentage Conversion'],
    leads: data.leads,
    CAC: data.CAC,
    company_id: data.company_id,
})

const mapToEngagementSchema = (data) => ({
    company_id: data.company_id,
    Percentage_Conversion: data['Percentage Conversion'],
    nps: data['Net Promoter Score'],
    users: data['AU']

})
const mapToRevenueSchema = (data) => ({
    company_id: data.company_id,
    arpa: data.arpa,
    acv: data.acv,
    churnRate: data['churn rate'],
    rr: data['Revenue'],
    growth: data['Growth revenue rate']

})
const mapTounit_econs = (data) => ({
    company_id: data.company_id,
    ltv: data.ltv,
    ltvRatio: data['LTV/CAC'],
    payback: data['CAC Payback']

})


mongoose.connect(MONGOURI).then(async () => {

    console.log('MongoDB successfully connected, saving companies to db')

    const companiesList = await csv().fromFile(COMPANIES);

    await Promise.all(companiesList.map(async (company) => {

        // Save a company to db
        const newCompany = new companiesSchema(maptoCompanySchema(company));
        const result = await newCompany.save();

        // // Now save the aquisitions to the db
        const company_id = result._id;


        // TODO: Update filing id
        const newAquisition = new acquisitionSchema({ ...mapToAcquisitionSchema(company), company_id, filingStart: company_id });

        const result2 = await newAquisition.save();

        const newEngagement = new engagementSchema({ ...mapToEngagementSchema(company), company_id, filingStart: company_id });

        const result3 = await newEngagement.save();

        const newRevenue = new revenueSchema({ ...mapToRevenueSchema(company), company_id, filingStart: company_id });

        const result4 = await newRevenue.save();

        const newUnit_econs = new unit_econsSchema({ ...mapTounit_econs(company), company_id, filingStart: company_id });

        const result5 = await newUnit_econs.save();



    }))


    console.log("saved all companies!")
}).catch((err) => console.log("Connection Failed: ", err));


