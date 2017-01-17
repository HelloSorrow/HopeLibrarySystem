const dbCommon = require('./db-common');
const mysqlUtil = require('./../router/mysql_util');
const connection = mysqlUtil.DBConnection;

const adminOperate = new dbCommon.operate(connection, 'hopeadmin');
const userOperate = new dbCommon.operate(connection, 'hopereader');
const bookOperate = new dbCommon.operate(connection, 'hopebook');
const equipOperate = new dbCommon.operate(connection, 'hopeequip');

const adminDB = {
    selectAll: (callback) => {
        adminOperate.selectAll((err, rows, fields) => {
            if(err){
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    selectExceptID: (adminID, callback) => {
        let dataJson = {
            adminID: adminID
        }
        adminOperate.selectExcept(dataJson, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        })
    },
    selectMessage : (adminID,callback) => {
        let dataJson = {
            adminID: adminID
        }
        adminOperate.selectItem(dataJson, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    updateMessage: (adminID,setDataJson,callback) => {
        const searchDataJson = {
            adminID : adminID
        };
        adminOperate.updateItem(searchDataJson, setDataJson,(err, rows, fields) => {
            const message = queryResult(err, '修改成功')
            callback&&callback(message);
        })
    },
    resetPassword: (adminID, newPassword, callback) => {
        const searchDataJson = {
            adminID: adminID
        };
        const setDataJson = {
            adminPassword: newPassword
        };
        console.log('adminID' +adminID)
        adminOperate.updateItem(searchDataJson, setDataJson, (err, rows, fields) => {
            const message = queryResult(err, '修改成功');
            callback&&callback(message);
        });
    },
    addItem: (setDadaJson, callback) => {
        adminOperate.insertItem(setDadaJson, (err, rows, fields) => {
            const message = queryResult(err, '增加成功');
            callback&&callback(message);
        });
    }
};
const userDB = {
    selectAll: (callback) => {
        userOperate.selectAll((err, rows, fields) => {
            if(err){
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    selectMessage: (userID, callback) => {
        let dataJson = {
            readerID : userID
        }
        userOperate.selectItem(dataJson,(err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    updateMessage: (userID, setDataJson, callback) => {
        const searchDataJson = {
            readerID : userID
        };
        userOperate.updateItem(searchDataJson, setDataJson,(err, rows, fields) => {
            const message = queryResult(err, '修改成功');
            callback&&callback(message);
        });
    },
    resetPassword: (userID, newPassword, callback) => {
        let searchDataJson = {
            readerID : userID
        };
        let setDataJson = {
            userPassword: newPassword
        };
        userOperate.updateItem(searchDataJson, setDataJson, (err, rows, fields) => {
            const message = queryResult(err, '修改成功');
            callback&&callback(message);
        });
    },
    addItem: (setDataJson, callback) => {
        userOperate.insertItem(setDadaJson, (err, rows, fields) => {
            const message = queryResult(err, '增加成功');
            callback&&callback(message);
        });
    }
};
const bookDB ={
    selectAll: (callback) => {
        bookOperate.selectAll((err, rows, fields) => {
            if(err){
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    selectMessage: (bookID, callback) => {
        let dataJson = {
            bookID : bookID
        }
        bookOperate.selectItem(dataJson,(err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    updateMessage: (bookID, setDataJson, callback) => {
        const searchDataJson = {
            bookID : bookID
        };
        bookOperate.updateItem(searchDataJson, setDataJson,(err, rows, fields) => {
            const message = queryResult(err, '修改成功');
            callback&&callback(message);
        });
    },
    addItem: (setDataJson, callback) => {
        bookOperate.insertItem(setDadaJson, (err, rows, fields) => {
            const message = queryResult(err, '增加成功');
            callback&&callback(message);
        });
    }
}
const equipDB ={
    selectAll: (callback) => {
        equipOperate.selectAll((err, rows, fields) => {
            if(err){
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    selectMessage: (equipID, callback) => {
        let dataJson = {
            equipID : equipID
        }
        equipOperate.selectItem(dataJson,(err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    updateMessage: (equipID, setDataJson, callback) => {
        const searchDataJson = {
            equipID : equipID
        };
        equipOperate.updateItem(searchDataJson, setDataJson,(err, rows, fields) => {
            const message = queryResult(err, '修改成功');
            callback&&callback(message);
        });
    },
    addItem: (setDataJson, callback) => {
        equipOperate.insertItem(setDadaJson, (err, rows, fields) => {
            const message = queryResult(err, '增加成功');
            callback&&callback(message);
        });
    }
}


function queryResult(err, mes,callback) {
    if(err) {
        console.log(err);
        return;
    }
    const message ={
        message: mes
    };
    callback&&callback();
    return message;
};
module.exports = {
    adminDB: adminDB,
    userDB: userDB,
    bookDB: bookDB,
    equipDB: equipDB
};