const bcrypt = require('bcryptjs');

function encrypt(rawPW) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(rawPW, saltRounds);
    return hash;
};

function checkPw(rawPW, hashedPW) {
    return bcrypt.compareSync(rawPW, hashedPW);
};

module.exports = { encrypt, checkPw }