import mongoose, { Document, Schema } from "mongoose";

export interface IPurchase extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  createdAt: Date;
}

const PurchaseSchema = new Schema<IPurchase>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Purchase = mongoose.model<IPurchase>("Purchase", PurchaseSchema);
