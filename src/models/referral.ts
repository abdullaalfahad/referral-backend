import mongoose, { Document, Schema } from "mongoose";

export interface IReferral extends Document {
  referrer: mongoose.Types.ObjectId; 
  referred: mongoose.Types.ObjectId; 
  status: "pending" | "converted";   
  createdAt: Date;
  convertedAt?: Date | null;
}

const ReferralSchema = new Schema<IReferral>(
  {
    referrer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    referred: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "converted"], default: "pending" },
    convertedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

ReferralSchema.index({ referrer: 1, referred: 1 }, { unique: true });

export const Referral = mongoose.model<IReferral>("Referral", ReferralSchema);
