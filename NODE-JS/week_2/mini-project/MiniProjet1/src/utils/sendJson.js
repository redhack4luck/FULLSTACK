// HADI FUNCTION LI KTSIFT RESPONSE 3LA CHKAL JSON 
function sendJson(res, data = null, codeStatus = 200) {
    let message;
// KANCHOFO codeStatus BACH PERSONNALISEW message dialna
    if (codeStatus >= 200 && codeStatus < 300) {
        switch (codeStatus) {
            case 200:
                message = 'Request successful';
                break;
            case 201:
                message = 'Resource created successfully';
                break;
            case 204:
                return res.status(204).end();
            default:
                message = 'Success';
        }
    } else if (codeStatus >= 400 && codeStatus < 500) {
        message = 'Client error';
    } else if (codeStatus >= 500) {
        message = 'Server error';
    } else {
        message = 'Unknown status';
    }
    // SAFI DB KNSAWBO Header 
    res.setHeader('Content-Type', 'application/json');
    // HNA NSIFTO data m3a message (en fonction du code) O codeStatus btabi3a l7al
    return res.status(codeStatus).json({
        message,
        data,
    });
}

module.exports = sendJson;
