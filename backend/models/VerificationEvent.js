const mongoose = require('mongoose');

const verificationEventSchema = new mongoose.Schema({
    claim: String,
    extraction: mongoose.Schema.Types.Mixed,
    evidence: mongoose.Schema.Types.Mixed,
    verification: mongoose.Schema.Types.Mixed,
    userEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.VerificationEvent || mongoose.model('VerificationEvent', verificationEventSchema);

