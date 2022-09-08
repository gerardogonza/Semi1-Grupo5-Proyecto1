const oracledb = require('oracledb');
// hr schema password
// checkConnection asycn function
async function checkConnection() {
    try {
        connection = await oracledb.getConnection({
            user: "diego",
            password: "diego",
            connectString: "localhost:1521/ORCL18"
        });
        console.log('connected to database');
    } catch (err) {
        console.error(err.message);
    } finally {
        if (connection) {
            try {
                // Always close connections
                await connection.close();
                console.log('close connection success');
            } catch (err) {
                console.error(err.message);
            }
        }
    }
}

checkConnection();