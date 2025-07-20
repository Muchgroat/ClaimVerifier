const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
let response;
async function extractEventInfo(claim) {
    
    try {
        const prompt = `Extract the event name, location, and time from this claim: "${claim}". Respond in JSON with keys: event, location, time.`;
        response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
            } 
        );
        const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text.replace(/```json/g, '').replace(/```/g, '');
        console.log('Gemini extractEventInfo response:', text);
        return text;
    } catch (err) {
        console.error('Gemini verifyClaimWithEvidence error:', err.message);
        return 'Unverified: Error during verification.';
    }
}

async function getTrustedSourcesForClaim(claim) {
    console.log('Getting trusted sources for claim IN:', claim);
    try {
        const prompt = `Given the following claim: "${claim}", list the most relevant and reputable news or official domains (e.g., bbc.com, reuters.com, gov.in) that would be trusted sources to verify this claim. Respond with a JSON array of domain names only (no explanation).`;
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
            }
        );
        const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text.replace(/```json/g, '').replace(/```/g, '');
        console.log('Gemini getTrustedSourcesForClaim response:', text);
        return JSON.parse(text);
    } catch (err) {
        console.error('Gemini getTrustedSourcesForClaim error:', err.message);
        return [];
    }
}
async function verifyClaimWithEvidence(claim, evidence) {
    console.log('Gemini verifyClaimWithEvidence IN:', claim, evidence);
    try {
        const prompt = `Given the following claim: "${claim}"
And the following evidence from trusted news sources:
${JSON.stringify(evidence, null, 2)}

Does the given claim can occur in the given evidence? These sources are mostly about the image and video content that mislead the event details, They wont give the confirmation of the event, But they will give the information about the event.
if you cant decided due to lack of information, search the internet for the event and give the result.
Respond with one of: Occurred, Unlikely, Unverified. Also provide a short reasoning. Return JSON Object with keys: result, reasoning.`;
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
            }
        );
        const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text.replace(/```json/g, '').replace(/```/g, '');
        console.log(text);
        return text;
    } catch (err) {
        console.error('Gemini verifyClaimWithEvidence error:', err.message);
        return 'Unverified: Error during verification.';
    }
}

module.exports = { extractEventInfo, verifyClaimWithEvidence, getTrustedSourcesForClaim };    