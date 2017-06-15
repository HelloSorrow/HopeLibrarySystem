const dbCommon = require('./db-common');
const mysqlUtil = require('./../router/mysql_util');
const connection = mysqlUtil.DBConnection;

const adminOperate = new dbCommon.operate(connection, 'hopeadmin');
const userOperate = new dbCommon.operate(connection, 'hopereader');
const bookOperate = new dbCommon.operate(connection, 'hopebook');
const equipOperate = new dbCommon.operate(connection, 'hopeequip');
const borrowOperate = new dbCommon.operate(connection, 'bookBorrow');
const reservateOperate = new dbCommon.operate(connection, 'equipborrow');

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
    selectItem: (dataJson, callback) => {
        adminOperate.selectItem(dataJson, (err, rows, fields) => {
            if(err) {
                console.log(err);
                retrun;
            }
            callback&&callback(rows);
        })
    },
    selectExceptID: (adminID, callback) => {
        let dataJson = {
            adminID: adminID
        };
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
        };
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
    },
    delItem: (adminID, callback) => {
        let searchDataJson = {
            adminID : adminID
        };
        adminOperate.delItem(searchDataJson, (err, rows, fields) => {
            const message = queryResult(err, '删除成功');
            callback&&callback(message);
        });
    },
    query: (query, callback) => {
        adminOperate.query(query, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
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
        };
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
            readerPassword: newPassword
        };
        userOperate.updateItem(searchDataJson, setDataJson, (err, rows, fields) => {
            const message = queryResult(err, '修改成功');
            callback&&callback(message);
        });
    },
    addItem: (setDataJson, callback) => {
        userOperate.insertItem(setDataJson, (err, rows, fields) => {
            const message = queryResult(err, '增加成功');
            callback&&callback(message);
        });
    },
    delItem: (userID, callback) => {
        let searchDataJson = {
            readerID : userID
        };
      userOperate.delItem(searchDataJson, (err, rows, fields) => {
          const message = queryResult(err, '删除成功');
          callback&&callback(message);
      });
    },
    query: (query, callback) => {
        userOperate.query(query, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
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
    selectItem: (dataJson, callback) => {
        bookOperate.selectItem(dataJson, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        })
    },
    selectMessage: (bookID, callback) => {
        let dataJson = {
            bookID : bookID
        };
        bookOperate.selectItem(dataJson,(err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    updateMessage: (bookID, setDataJson, callback, message = '修改成功') => {
        const searchDataJson = {
            bookID : bookID
        };
        bookOperate.updateItem(searchDataJson, setDataJson,(err, rows, fields) => {
            message = queryResult(err, message);
            callback&&callback(message);
        });
    },
    addItem: (setDataJson, callback) => {
        bookOperate.insertItem(setDataJson, (err, rows, fields) => {
            const message = queryResult(err, '增加成功');
            callback&&callback(message);
        });
    },
    showColumns: (columnName, callback) => {
        bookOperate.showColumns(columnName, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    orderItems: (columnName, start, end, callback) => {
        bookOperate.orderItems(columnName, start, end, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        })
    },
    orderSearchItems: (searchDataJson, orderColumn, start, end, callback ) => {
        bookOperate.orderSearchItems(searchDataJson, orderColumn, start, end, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    countItems: (columnName, callback) => {
        bookOperate.countItems(columnName, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        })
    },
    countItemsGroup: function(left, callback) {
        let query;
        if(left){
            query = 'SELECT bookCate AS cate, COUNT(*) AS count FROM hopeBook WHERE bookLeft =' + left + ' GROUP BY bookCate ORDER BY count DESC';
        } else {
            query = 'SELECT bookCate AS cate, COUNT(*) AS count FROM hopeBook GROUP BY bookCate ORDER BY count DESC';
        }
        this.query(query,callback)
    },
    countSearchItems: (searchDataJson, columnName, callback) => {
        bookOperate.countSearchItems(searchDataJson, columnName, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        })
    },
    delItem: (bookID, callback, message = '删除成功') => {
        const searchDataJson = {
            bookID : bookID
        };
        bookOperate.delItem(searchDataJson,(err, rows, fields) => {
            message = queryResult(err, message);
            callback&&callback(message);
        });
    },
    query: (query, callback) => {
        bookOperate.query(query, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    }
};
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
    selectItem: (dataJson, callback) => {
        equipOperate.selectItem(dataJson, (err, rows, fields) => {
            if(err) {
                console.log(err);
                retrun;
            }
            callback&&callback(rows);
        })
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
    updateMessage: (equipID, setDataJson, callback, message = '修改成功') => {
        const searchDataJson = {
            equipID : equipID
        };
        equipOperate.updateItem(searchDataJson, setDataJson,(err, rows, fields) => {
            message = queryResult(err, message);
            callback&&callback(message);
        });
    },
    addItem: (setDataJson, callback) => {
        equipOperate.insertItem(setDataJson, (err, rows, fields) => {
            const message = queryResult(err, '增加成功');
            callback&&callback(message);
        });
    },
    orderItems: (columnName, start, end, callback) => {
        equipOperate.orderItems(columnName, start, end, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        })
    },
    orderSearchItems: (searchDataJson, orderColumn, start, end, callback ) => {
        equipOperate.orderSearchItems(searchDataJson, orderColumn, start, end, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
    countItems: (columnName, callback) => {
        equipOperate.countItems(columnName, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        })
    },
    query: (query, callback) => {
        equipOperate.query(query, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    }
};
const borrowDB = {
  selectMessage: (borrowID, callback) => {
    const query = 'SELECT borrowID, bookName, readerName, borrowTime, returnWhe FROM bookBorrow join hopeBook on bookBorrow.borrowBookID = hopeBook.bookID join hopeReader on bookBorrow.borrowUserID = hopeReader.readerId WHERE borrowID=' + mysqlUtil.DBConnection.escape(borrowID);
    borrowOperate.query(query, (err, rows, fields) => {
      if(err) {
        console.log(err);
        return;
      }
      callback&&callback(rows);
    });
  },
  selectItemsByBook: (book,callback)=>{
      const query = 'SELECT borrowID, bookName, readerName, borrowTime, returnWhe FROM bookBorrow join hopeBook on bookBorrow.borrowBookID = hopeBook.bookID join hopeReader on bookBorrow.borrowUserID = hopeReader.readerId WHERE hopeBook.bookName=' + mysqlUtil.DBConnection.escape(book);
      borrowOperate.query(query, (err, rows, fields) => {
        if(err) {
            console.log(err);
            return;
      }
      callback&&callback(rows);
    });
  },
  selectItemsByReader:(reader,callback)=>{
      const query = 'SELECT borrowID, bookName, readerName, borrowTime, returnWhe FROM bookBorrow join hopeBook on bookBorrow.borrowBookID = hopeBook.bookID join hopeReader on bookBorrow.borrowUserID = hopeReader.readerId WHERE hopeReader.readerName=' + mysqlUtil.DBConnection.escape(reader);
      borrowOperate.query(query, (err, rows, fields) => {
        if(err) {
          console.log(err);
          return;
        }
        callback && callback(rows);
      })
  },
  countItems:(dataJson,callback) =>{
    let query;
    let group = 'readerName';
    let name = 'readerName';
    let join = 'JOIN hopeReader ON bookBorrow.borrowUserID = hopeReader.readerId';
    if(dataJson.groupby){
      if(dataJson.groupby=='\'hopegroup\''){
        group = 'readerGroup';
        name = 'readerGroup';
      } else if(dataJson.groupby=='\'cate\'') {
        group = 'bookCate';
        name = 'bookCate';
        join = 'JOIN hopeBook ON hopeBook.bookID = bookBorrow.borrowBookID'
      }
    }
    console.log(dataJson);
    if(!dataJson.timeAfter && !dataJson.timeBefore){
      query = 'SELECT ' + name + ' AS name, COUNT(*) AS count FROM bookBorrow ' + join + ' WHERE UNIX_TIMESTAMP(SUBDATE(CURDATE(),30)) < UNIX_TIMESTAMP(borrowTime) GROUP BY ' + group + ' ORDER BY count DESC';
    }else{
      if(dataJson.timeAfter && !dataJson.timeBefore){
        query = 'SELECT ' + name + ' AS name, COUNT(*) AS count FROM bookBorrow ' + join + ' WHERE UNIX_TIMESTAMP(borrowTime) > UNIX_TIMESTAMP('+ dataJson.timeAfter + ') GROUP BY ' + group + ' ORDER BY count DESC';
      } else if(dataJson.timeBefore && !dataJson.timeAfter){
        query = 'SELECT ' + name + ' AS name, COUNT(*) AS count FROM bookBorrow  ' + join + '  WHERE UNIX_TIMESTAMP(borrowTime) < UNIX_TIMESTAMP('+ dataJson.timeBefore + ')  GROUP BY ' + group + ' ORDER BY count DESC';
      } else if(dataJson.timeBefore && dataJson.timeAfter) {
        query = 'SELECT ' + name + ' AS name, COUNT(*) AS count FROM bookBorrow  ' + join + '  WHERE UNIX_TIMESTAMP(borrowTime) < UNIX_TIMESTAMP('+ dataJson.timeBefore + ')  AND UNIX_TIMESTAMP(borrowTime) > UNIX_TIMESTAMP('+ dataJson.timeAfter +')GROUP BY ' + group + ' ORDER BY count DESC';
      }
    }
    borrowOperate.query(query, (err, rows, fields) => {
      if(err) {
        console.log(err);
        return;
      }
      callback && callback(rows);
    });
  },
  selectItemsByQuery:(dataJson,callback) =>{
    let query = 'SELECT borrowID, bookName, readerName, borrowTime, returnWhe FROM bookBorrow join hopeBook on bookBorrow.borrowBookID = hopeBook.bookID join hopeReader on bookBorrow.borrowUserID = hopeReader.readerId WHERE ';
    let condition = '';
    for(let key in dataJson) {
      if(key=='timeBefore'){
        condition += 'UNIX_TIMESTAMP('+ mysqlUtil.DBConnection.escape(dataJson[key]) + ') > UNIX_TIMEsTAMP(borrowTime) AND ';
      }else if(key=='timeAfter'){
        condition += 'UNIX_TIMESTAMP('+ mysqlUtil.DBConnection.escape(dataJson[key]) + ') < UNIX_TIMEsTAMP(borrowTime) AND ';
      }else{
        condition += key + '=' + mysqlUtil.DBConnection.escape(dataJson[key]) + ' AND ';
      }
    }
    condition = condition.replace(/\s*AND\s*$/gi,'');
    query = query + condition;
    borrowOperate.query(query, (err, rows, fields) => {
      if(err) {
        console.log(err);
        return;
      }
      callback && callback(rows);
    })
  },
    addItem: (setDadaJson, callback) => {
        borrowOperate.insertItem(setDadaJson, (err, rows, fields) => {
            const message = queryResult(err, '增加成功');
            callback&&callback(message);
        });
    },
    updateMessage: (borrowID, setDataJson, callback,  message = '修改成功') => {
        const searchDataJson = {
            borrowID : borrowID
        };
        borrowOperate.updateItem(searchDataJson, setDataJson,(err, rows, fields) => {
            message = queryResult(err, message);
            callback&&callback(message);
        });
    },
    query: (query, callback) => {
        borrowOperate.query(query, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    }
};
const reservateDB = {
    addItem: (setDadaJson, callback) => {
        reservateOperate.insertItem(setDadaJson, (err, rows, fields) => {
            const message = queryResult(err, '增加成功');
            callback&&callback(message);
        });
    },
    updateMessage: (borrowID, setDataJson, callback,  message = '修改成功') => {
        const searchDataJson = {
            borrowID : borrowID
        };
        reservateOperate.updateItem(searchDataJson, setDataJson,(err, rows, fields) => {
            message = queryResult(err, message);
            callback&&callback(message);
        });
    },
    query: (query, callback) => {
        reservateOperate.query(query, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    }
};

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
}
module.exports = {
    adminDB: adminDB,
    userDB: userDB,
    bookDB: bookDB,
    equipDB: equipDB,
    borrowDB: borrowDB,
    reservateDB: reservateDB
};