const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
};

export default validate;
