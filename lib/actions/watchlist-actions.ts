"use server";

import { connectToDatabase } from '@/database/mongoose';
import Watchlist from '@/database/watchlist.model';
import mongoose from 'mongoose';


export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
    try {
        await connectToDatabase();



        const User = mongoose.models?.User || mongoose.model('User', new mongoose.Schema({}, { strict: false }), 'users');


        const userDoc = await User.findOne({ email }).lean();
        if (!userDoc) return [];



        const userId = userDoc._id ? String(userDoc._id) : String(userDoc.id ?? '');
        if (!userId) return [];


        const watchlistItems = await Watchlist.find({ userId }).select('symbol -_id').lean();
        if (!watchlistItems || watchlistItems.length === 0) return [];


        const symbols = watchlistItems.map((w) => String((w as { symbol: string }).symbol).toUpperCase());
        return symbols;
        } catch (error) {

        console.error('getWatchlistSymbolsByEmail error:', error);
        return [];
    }
}