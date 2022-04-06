function isSignIn (req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json("Please Sign In. Otherwise you're not authorized to access this endpoint")
    };
    next();
}

module.exports = { isSignIn };