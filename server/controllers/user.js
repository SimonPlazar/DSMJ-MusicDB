import dotenv from "dotenv";
dotenv.config();

import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    const { credential } = req.body;

    // console.log('Google login request received', credential);

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        // console.log('Google login payload:', payload);

        // Check if user exists, if not create a new one
        let user = await User.findOne({ email: payload.email });
        if (!user) {
            console.log('Creating new user:', payload.email);
            user = new User({
                email: payload.email,
                first_name: payload.given_name,
                last_name: payload.family_name,
                picture: payload.picture,
            });
            await user.save();
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                picture: user.picture,
                settings: user.settings,
            },
        });
    } catch (error) {
        console.error('Error in Google authentication:', error);
        res.status(400).json({ success: false, message: 'Invalid credential' });
    }
}

export const checkLogin = async (req, res) => {
    // console.log('Checking login:', req.user);
    try {
        // Populate user details based on the ID from the token
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error in /me endpoint:', error);
        res.status(500).json({ error: 'Server error' });
    }
    // res.json({ user: req.user });
}

import mongoose from "mongoose";
import Song from "../models/Song.js";

export const getSettings = async (req, res) => {
    const userID = req.user;
    console.log('Fetching settings for user:', userID);
    try {
        const user = await User.findById(userID);
        res.status(200).json(user.settings);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const updateSettings = async (req, res) => {
    const userID = req.user;
    const settings = req.body;

    console.log('Updating settings for user:', userID, settings);

    try {
        const user = await User.findByIdAndUpdate(userID, { settings: settings }, { new: true });
        res.status(200).json(user.settings);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}



