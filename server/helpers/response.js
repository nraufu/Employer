
const responseHandler = (res, status, message) => {
    res.status(status).json(message);
}

export default responseHandler;