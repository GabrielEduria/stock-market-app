"use server";

import { sendSignUpEmail } from "../inngest/function";
import { getAllusersForNewsEmail } from "./user.action";

export const functions = inngest()
.on({ name: 'sendSignUpEmail' }, async ({ event }) => {
return await sendSignUpEmail(event);
});


// add daily news summary function
export const sendDailyNewsSummary = functions.on({
name: 'sendDailyNewsSummary',
// Cron: run daily at 12:00 UTC
schedule: '0 12 * * *',
// allow manual triggering via event
event: 'app/send.daily.news',
}, async ({ event }) => {
try {
// Get list of users eligible for news emails
const users = await getAllusersForNewsEmail();
if (!users || users.length === 0) return { success: true, details: 'no users' };


for (const user of users) {
try {
const email = String(user.email ?? '');
if (!email) continue;


const symbols = await getWatchlistSymbolsByEmail(email);
let articles = await getNews(symbols.length > 0 ? symbols : undefined);


if (!articles || articles.length === 0) {
// fallback to general news
articles = await getNews(undefined);
}


// At this point we have up to 6 articles. Placeholder: summarize via AI
// const summary = await summarizeArticlesWithAI(articles, user);


// Placeholder: send email via project's email util
// await sendNewsEmailToUser({ to: email, articles, summary, user });


// For now we just log that we'd send the email
// eslint-disable-next-line no-console
console.log(`Would send ${articles.length} news articles to ${email}`);
} catch (err) {
// eslint-disable-next-line no-console
console.error('sendDailyNewsSummary: failed for user', user, err);
continue; // keep processing other users
}
}


return { success: true };
} catch (err) {
// eslint-disable-next-line no-console
console.error('sendDailyNewsSummary failed:', err);
return { success: false, error: String(err) };
}
});