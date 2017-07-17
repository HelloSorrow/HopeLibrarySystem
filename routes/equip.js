const express=require("express");
const mysql_util=require("./mysql_util");
const router=express.Router();
const util = require("util");
const nodemailer = require("nodemailer");
const config=require("./../config");

const setSession = require('./../utils/set-session');
const hopeDB = require('./../utils/hopeDB.js');
const [userDB, equipDB] = [hopeDB.userDB, hopeDB.equipDB];

router.route("/").get(function(req,res){
    if(!req.session.userID || !req.session.userSign){
        res.redirect("/user/login");
        return;
    }
    const userID = req.session.userID;
    userDB.selectMessage(userID, (rows) => {
        const user = rows[0];
        const [userName, userImg, userPermission] = [user.readerName, user.userImgSrc, 'user'];
        equipDB.orderItems('equipLeft DESC,equipID DESC', 0, 20, (rows) => {
            const equip = rows;
            setSession(req, {userID: user.readerID, userSign: true});
            res.render("user/user-equip",{userImg:userImg,userName:userName,userPermission:userPermission,firstPath:'reservation',secondPath:'',equip:equip});
        });
    });
});
router.route("/equipemail").post(function(req,res){
	const equipID=parseInt(req.body.equipID);
	const query = 'SELECT adminName,equipName'
                  + ' FROM hopeadmin,hopeequip'
                  + ' WHERE hopeadmin.adminID=hopeequip.equipAdminID'
                  + ' AND hopeequip.equipID ='
                  + mysql_util.DBConnection.escape(equipID);
	equipDB.query(query, (rows) => {
        const message = {
            adminName:rows[0].adminName,
            equipName:rows[0].equipName
        };
        res.send(message);
    });
});

router.route("/equipreservation").post(function(req,res){
	let equipID=parseInt(req.body.equipID);
    let userID=req.session.userID;
	let info = req.body.info;
	let setDataJson = {
        equipLeft: 0
    };
	equipDB.updateMessage(equipID, setDataJson, (message) => {
        const query = 'INSERT equipborrow SET borrowEquipID='
            + equipID
            + ',borrowUserID='
            + userID
            + ',borrowTime=CURDATE(),returnBefore=ADDDATE(CURDATE(),30)'
            + ',reservationText=" '
            + info
            + '"';
        equipDB.query(query, (rows) => {
            const query = 'SELECT adminName,equipName,adminEmail,readerName'
                         + ' FROM hopeadmin,hopeequip,hopereader'
                         + ' WHERE hopeadmin.adminID=hopeequip.equipAdminID'
                         + ' AND hopeequip.equipID ='
                         + equipID
                         + ' AND hopereader.readerID='
                         + userID;
            equipDB.query(query, (rows) => {
                const adminEmail = rows[0].adminEmail;
                const readerName = rows[0].readerName;
                const equipName = rows[0].equipName;
                const adminName = rows[0].adminName;
                const transporter = nodemailer.createTransport({
                    host:config.email.transportOptions.host,
                    port:config.email.transportOptions.port,
                    secure:config.email.transportOptions.secure,
                    auth:{
                        user:config.email.userEmail,
                        pass:config.email.userEmailPassWord
                    }
                });
                const emailHTML=util.format(config.reservationEmail.emailHTML,adminName,readerName,equipName,info);
                const mailoption = {
                    from:config.email.userEmail,
                    to:adminEmail,
                    subject:config.reservationEmail.emailSubject,
                    html:emailHTML
                };
                transporter.sendMail(mailoption,function(err,info){
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log(info.response);
                });
                const message = {
                    message:"预约成功，请等待审核!"
                };
                res.send(message);
            });
        });
    });
});
module.exports=router;