import { success } from "better-auth/*"
import { inngest } from "./client"
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts"
import { sendWelcomeEmail } from "../nodemailer"
import { getAllusersForNewsEmail } from "../actions/user.action";


export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email' },
    { event: 'app/user.created' },
    async ({ event, step }) => {
        const userProfile = `
            - Country: ${event.data.country}
            - Investment Goals: ${event.data.investmentGoals}
            - Risk tolerance: ${event.data.riskTolerance}
            - Preferred industry: ${event.data.preferredIndustry}
        `


        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }), 
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {text: prompt }
                        ]
                    } 
                ]
            }
        })

        await step.run('send-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining Stock Market by Gabbbyyyy. You now have the tools to track market and make smarter moves';

            const { data: { email, name }} = event;
            return await sendWelcomeEmail({ email, name, intro: introText })
        })

        return {
            success: true,
            message: 'Welcome email sent successfully'
        }
    }
)

export const sendDailyNewsSummary = inngest.createFunction(
    { id: 'daily-news-summary' },
    [ { event: 'app/send.daily.news' }, {cron: '0 12 * * *'} ],
    async ({ step }) => {
        const users = await step.run('get-all-users', getAllusersForNewsEmail)

        if(!users || users.length === 0) return { success: true, message: 'No users found for news email' };

        for (const user of users) {
            try {
                const email = String(user.email ?? '');
                if (!email) continue;

                const symbols = await step.run('get-watchlist-symbols', async () => {
                    const { getWatchlistSymbolsByEmail } = await import('../actions/watchlist-actions');
                    return getWatchlistSymbolsByEmail(email);
                });

                let articles = await step.run('fetch-news', async () => {
                    const { getNews } = await import('../actions/finnhub.actions');
                    return getNews(symbols.length > 0 ? symbols : undefined);
                });

                if (!articles || articles.length === 0) {
                    articles = await step.run('fetch-general-news', async () => {
                        const { getNews } = await import('../actions/finnhub.actions');
                        return getNews(undefined);
                    });
                }

                // Placeholder: Summarize news via AI
                const userNewsSummaries: { user: User; newsContent: string | null}[] = [];

                for (const { user, news} of results) {
                    try {

                    } catch (e) {
                        console.error('Failed to summarize news for : ', user.email);
                    }
                }

                // const summary = await step.ai.infer('summarize-news', { ... });

                // Placeholder: Send the emails
                // await step.run('send-email', async () => { ... });

                // For now, log the action
                await step.run('log-email', async () => {
                    console.log(`Would send ${articles.length} news articles to ${email}`);
                });
            } catch (err) {
                console.error('sendDailyNewsSummary: failed for user', user, err);
                continue;
            }
        }

        return { success: true };
    }
)
