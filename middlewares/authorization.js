module.exports = {
    authAdmin : async (req, res, next) => {
        try {
            if (req.users.role != "admin") throw new Error("Only Admin can do the request");

            next();
        } catch (error) {
            return res.status(401).json({
                status: "failed",
                message: error.message || "Bad Request"
            });
        }
    },

    authUser : async (req, res, next) => {
        try {
            if (req.users.id != req.params.id) throw new Error("Cannot do it to another User");

            next();
        } catch (error) {
            return res.status(401).json({
                status: "failed",
                message: error.message || "Bad Request"
            });
        }
    },
}