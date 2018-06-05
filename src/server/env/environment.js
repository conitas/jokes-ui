const cosmosPort = process.env.APPSETTING_cosmosPort; // replace with your port
const dbName = process.env.APPSETTING_dbName;
const key = process.env.APPSETTING_key;
const useProxy = process.env.APPSETTINGS_useProxy;

module.exports = {
  dbName,
  key,
  cosmosPort,
  useProxy
};
