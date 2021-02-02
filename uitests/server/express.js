/**
 * @author Vinit
 */
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
const cors = require('cors');
const BUILD_DIR  = path.resolve(__dirname, '../../dist');
const development= 'development';
const production = 'production';
const post = 'POST';
const get = 'GET';
const mdelete = 'DELETE';
const put = 'PUT';   
/**
 * app router constants
 */
const host  = 'http://ssqa01:'; // REST Web Service HOST 
const port  = '1500';            // REST Web Service PORT
const username = 'CFWSUSER';  // REST Web Service USER
const password = 'bsi';  // REST Web Service PASS
/**
 * approuter
 * @param {*} app 
 */
approuter = (app) => {
    app.get('/*', function (req, res) {
        callServiceRequestGet(req.url, res);
    });
    app.post('/*', function (req, res) {
        callServiceRequestPost(req.url, req.body, res);
    });
    app.delete('/*', function (req, res) {
        callServiceRequestDelete(req.url, res);
    });
    app.put('/*', function (req, res) {
        callServiceRequestPut(req.url, req.body, res);
    });
}
/**
 * callServiceRequestGet
 * @param {*} requrl 
 * @param {*} res 
 */
callServiceRequestGet = (requrl, res) => {
    var url = requrl.replace("/api", "");
    let auth = eew2auth();
    const options = {
        url: `${host}${port}${url}`,
        method: get,
        headers: {
            Authorization: auth,
            'X-DATASET':'VINIT',
            'X-USER':'vinit'
        },
        credentials: 'same-origin'
    };
    request(options).pipe(res);
}
/**
 * callServiceRequestPost
 * @param {*} requrl 
 * @param {*} postData 
 * @param {*} res 
 */
callServiceRequestPost = (requrl, postData, res) => {
    var url = requrl.replace("/api", "");
    let auth = eew2auth();
    const options = {
        method: post,
        body: postData,
        json: true,
        url: `${host}${port}${url}`,
        headers: {
            Authorization: auth,
            'X-DATASET':'VINIT',
            'X-USER':'vinit'
        },
        credentials: 'same-origin'
    };
    request(options, function (err, res, body) {
        if (err) {
            console.error('error posting json: ', err)
            throw err
        }
    }).pipe(res);
}
/**
 * callServiceRequestDelete
 * @param {*} requrl 
 * @param {*} res 
 */
callServiceRequestDelete = (requrl, res) => {
    var url = requrl.replace("/api", "");
    const options = {
        method: mdelete,
        credentials: 'same-origin',
        'X-DATASET':'VINIT',
        'X-USER':'vinit',
        json: true,
        url: `${host}${port}${url}`,
    };
    request(options, function (err, res, body) {
        if (err) {
            console.error('error deleting json: ', err)
            throw err
        }
    }).pipe(res);
}
/**
 * callServiceRequestPut
 * @param {*} requrl 
 * @param {*} putData 
 * @param {*} res 
 */
callServiceRequestPut = (requrl, putData, res) => {
    var url = requrl.replace("/api", "");
    const options = {
        method: put,
        body: putData,
        credentials: 'same-origin',
        'X-DATASET':'VINIT',
        'X-USER':'vinit',
        json: true,
        url: `${host}${port}${url}`,
    };
    request(options, function (err, res, body) {
        if (err) {
            console.error('error posting json: ', err)
            throw err
        }
    }).pipe(res);
}
/**
 * eew2auth
 */
eew2auth = ()=> {
    let auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
    return auth
}
/**
 * Start Express Server localhost@port
 **/
if (process.env.NODE_ENV === development || process.env.NODE_ENV === production) {
    var express = require('express')
    const port = 2023;
    var app = express()
    app.use('/', express.static(BUILD_DIR))
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    app.use(cors({origin: 'http://localhost:2023'}));
    app.listen(port);
    console.log('======================================================>');
    console.log('Starting Web server at http://localhost:' + port + '/');
    console.log('======================================================>');
    approuter(app);
}