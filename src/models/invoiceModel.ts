import mongoose, { Schema, models } from "mongoose";

const invoiceSchema = new Schema({
  invoiceId: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    required: true,
  }
}, { _id: false });

const Invoice = models.Invoice || mongoose.model("Invoice", invoiceSchema);
export default Invoice;