import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
    },
    userType: {
        type: String,
    },
    location: {
        type: String,
    },
}, {
    timestamps: true,
});

const CompanyModal = new mongoose.model("Company", schema);

export default CompanyModal;