
const pool = require('../db/config'); 


exports.getUsers = (req, res) => {
    res.json({ message: "List of usersasdasdads" });
};


exports.getUserById = async (req, res) => {
    const { username } = req.params;
    console.info('paramsparamsparamsparamsparams', username);
    const query = "SELECT * FROM users WHERE username = $1"
    const result = await pool.query(query, [username]);
    
    if(result.rows[0].username == username) {
        console.info('resultresultresultresult', result.rows[0].username);
        res.json({ message: `Details of user`, data: result.rows, status: true });
    } else {
        res.json({ message: `user not found`, data: [], status: false });
    }
    
};



exports.getAppContracts = async (req, res) => {
    const query = "SELECT * FROM contract"
    const result = await pool.query(query);
    if(result.rows) {
        console.info('resultresultresultresult', result.rows[0].username);
        res.json({ message: `Details of user`, data: result.rows, status: true });
    } else {
        res.json({ message: `user not found`, data: [], status: false });
    }
};

exports.getContractor = async (req, res) => {
    const query = "SELECT * FROM users"
    const result = await pool.query(query);
    if(result.rows) {
        console.info('resultresultresultresult', result.rows[0].username);
        res.json({ message: `Details of user`, data: result.rows, status: true });
    } else {
        res.json({ message: `user not found`, data: [], status: false });
    }
};


exports.getContracts = async (req, res) => {
    const { contractor_id } = req.params;
    const query = "SELECT * FROM contract WHERE contractor_id = $1"
    const result = await pool.query(query, [contractor_id]);
    if(result.rows) {
        console.info('resultresultresultresult', result.rows[0].username);
        res.json({ message: `Details of user`, data: result.rows, status: true });
    } else {
        res.json({ message: `user not found`, data: [], status: false });
    }
};


exports.updateContract = async (req, res) => {
    console.info('updateContractupdateContractupdateContractupdateContract')
    const query = `
    UPDATE contract
    SET contract_name = $1, status = $2
    WHERE contractor_id = $3
    RETURNING *;
  `;
    const result = await pool.query(query, [req.body.contract_name, req.body.status, req.body.contractor_id]);
    if(result.rows) {
        console.info('resultresultresultresult', result.rows[0].username);
        res.json({ message: `Details of user`, data: result.rows, status: true });
    } else {
        res.json({ message: `user not found`, data: [], status: false });
    }
};




exports.createContract = async (req, res) => {
    const query = `
    INSERT INTO contract (contractor_id, contract_name, status)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    const result = await pool.query(query, [req.body.contractor_id, req.body.contract_name, req.body.status]);
    if(result.rows) {
        console.info('resultresultresultresult', result.rows[0].username);
        res.json({ message: `Details of user`, data: result.rows, status: true });
    } else {
        res.json({ message: `user not found`, data: [], status: false });
    }
};

