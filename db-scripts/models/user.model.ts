import mongoose, { StringExpressionOperatorReturningBoolean } from 'mongoose';
import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    id?: string;
    avatar?: string;
    passwordChangedAt?: Number;
    facebookID?: String,
    googleID?: String,
    githubID?: String,
    lastname?: string;
    firstname?: string;
    username?: string;
    password?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    active?: boolean;
    verify?: boolean;
    role?: string;
}
export interface IUserMethods {
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
    {
        avatar: { type: String },
        phoneNumber: {type: String},
        username: { type: String},
        googleID: {type: String},
        facebookID: {type: String},
        githubID: {type: String},
        firstname: { type: String },
        lastname: { type: String},
        role: {type: String},
        address: {type: String},
        password: { 
            type: String,
            select: false, // never show up password field in the output if select == false
        },
        email: { type: String},
        active: {
            type: Boolean,
            default: true
        },
        verify: {
            type: Boolean,
            default: false
        },
        passwordChangedAt: { type: Number },
    },
    {
        toJSON: {
            virtuals: true,
            versionKey: false,
        },
        toObject: {
            virtuals: true,
            versionKey: false,
        },
    }
);

UserSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

UserSchema.virtual('fullname').get(function() {
    return `${this.firstname ?? ''} ${this.lastname ?? ''} `;
})

UserSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


const UserModel = mongoose.model<IUser, UserModel>('User', UserSchema);

export default UserModel;