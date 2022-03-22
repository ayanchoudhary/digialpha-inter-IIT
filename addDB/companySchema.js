import mongoose from 'mongoose';

const { Schema } = mongoose;


const companiesSchema = new Schema({

	Company: String,
	cik_number: String,
	sentiment: String,
	symbol: String,
	filingStart: String,
	sic: String,
});

export default mongoose.model('companies', companiesSchema);
