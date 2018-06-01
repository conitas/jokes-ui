const cosmosPort = process.env.APPSETTING_cosmosPort; // replace with your port
const dbName = process.env.APPSETTING_dbName;
const key = process.env.APPSETTING_key;

module.exports = {
  dbName,
  key,
  cosmosPort
};
