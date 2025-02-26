import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    picture: { type: String },
    settings: {
        theme: { type: String, default: 'light' },
        table_rows: { type: Number, default: 5 },
        table_cols: { type: Number, default: 3 }
    }
});

const User = mongoose.model('User', userSchema);

export default User;