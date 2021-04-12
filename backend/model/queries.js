const mongoose = require('mongoose');
const Users = mongoose.model(
    'Users',
    {
        user_name: String,
        email: String,
        password: String,
        role: String
    },
    'Users'
);

const readAllUsers = () => {
    return new Promise((success, fail) => {
        Users.find({}, (err, data) => {
            if (err) {
                return fail();
            }
            return success(data);
        });
    });
};

const createNewUsers = (data) => {
    return new Promise((success, fail) => {
        let p = new Users(data);
        p.save((err) => {
            if (err) {
                return fail();
            }
            console.log("asdasdasd as das ")
            return success();
        });
    });
};

const removeUsers = (id) => {
    return new Promise((success, fail) => {
        Users.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const updateUsers = (id, data) => {
    return new Promise((success, fail) => {
        Users.updateOne({ user_name: userName }, data, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const getByEmailUsers = (email) => {
    return new Promise((success, fail) => {
        Users.findOne({ email: email }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}



const Products = mongoose.model(
    'Products',
    {
        company_name: String,
        category:String,
        subCategory:String,
        subsubCategory:String,
        date: String,
        Life:Number,
    },
    'Products'
);

const readAllProduct = () => {
    return new Promise((success, fail) => {
        Products.find({}, (err, data) => {
            if (err) {
                return fail();
            }
            return success(data);
        });
    });
};

const createNewProduct = (data) => {
    return new Promise((success, fail) => {
        let p = new Products(data);
        p.save((err) => {
            if (err) {
                return fail();
            }
            console.log("asdasdasd as das ")
            return success();
        });
    });
};

const removeProduct = (id) => {
    return new Promise((success, fail) => {
        Products.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const updateProduct = (id, data) => {
    return new Promise((success, fail) => {
        Products.updateOne({ _id: id }, data, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const getByEmailProduct = (email) => {
    return new Promise((success, fail) => {
        Products.findOne({ email: email }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}

const Partners = mongoose.model(
    'Partners',
    {
        company_name: String,
        category:String,
        subCategory:String,
        subsubCategory:String,
        date: String,
        Life:Number,
    },
    'Partners'
);

const readAllPartner = () => {
    return new Promise((success, fail) => {
        Partners.find({}, (err, data) => {
            if (err) {
                return fail();
            }
            return success(data);
        });
    });
};

const createNewPartner = (data) => {
    return new Promise((success, fail) => {
        let p = new Partners(data);
        p.save((err) => {
            if (err) {
                return fail();
            }
            console.log("asdasdasd as das ")
            return success();
        });
    });
};

const removePartner = (id) => {
    return new Promise((success, fail) => {
        Partners.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const updatePartner = (id, data) => {
    return new Promise((success, fail) => {
        Partners.updateOne({ _id: id }, data, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const getByEmailPartner = (email) => {
    return new Promise((success, fail) => {
        Partners.findOne({ email: email }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}

const Sales = mongoose.model(
    'Sales',
    {
        company_name: String,
        category:String,
        subCategory:String,
        subsubCategory:String,
        date: String,
        Life:Number,
    },
    'Sales'
);

const readAllSale = () => {
    return new Promise((success, fail) => {
        Sales.find({}, (err, data) => {
            if (err) {
                return fail();
            }
            return success(data);
        });
    });
};

const createNewSale = (data) => {
    return new Promise((success, fail) => {
        let p = new Sales(data);
        p.save((err) => {
            if (err) {
                return fail();
            }
            console.log("asdasdasd as das ")
            return success();
        });
    });
};

const removeSale = (id) => {
    return new Promise((success, fail) => {
        Sales.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const updateSale = (id, data) => {
    return new Promise((success, fail) => {
        Sales.updateOne({ _id: id }, data, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const getByEmailSale = (email) => {
    return new Promise((success, fail) => {
        Sales.findOne({ email: email }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}

module.exports = {
    Users,
    readAllUsers,
    createNewUsers,
    removeUsers,
    updateUsers,
    getByEmailUsers,
    Products,
    readAllProduct,
    createNewProduct,
    removeProduct,
    updateProduct,
    getByEmailProduct,
    Partners,
    readAllPartner,
    createNewPartner,
    removePartner,
    updatePartner,
    getByEmailPartner,
    Sales,
    readAllSale,
    createNewSale,
    removeSale,
    updateSale,
    getByEmailSale,
};