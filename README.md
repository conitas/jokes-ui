
# Modification for Demo purposes

Current repo is the modification of the repo made by by [John Papa](http://twitter.com/john_papa) to demonstrate the consume of another one external rest services.


The best way to test the app is to build and run a docker image. The current one can be obtained from docker.io:

 ```
  docker pull itasgmbhde/jokes-ui
 ```

## Building the app

 ```bash
   docker build -t itasgmbhde/jokes-ui .
 ```

## Running the app

 ```
 docker run -it --rm -p 8080:80 -e "APPSETTING_cosmosPort=10255"  -e "APPSETTING_dbName=<databaseName>" -e "APPSETTING_key=<databasekey>" -e "APPSETTING_useProxy=<true|false>"  itasgmbhde/jokes-ui
 ```
 
## Environment Variables
Variables are prefixed by APPSETTING_ because the naming conventions of Azure Webapps

Variable | Usage | Sample value
--- | --- | ---
*cosmosPort* | Port | 10255 
*dbName* | Cosmos DB/MongoDB Collection | heroes
*key* | Database Password / Secret | xYzasfwewe12334==
*useProxy* | Should node act as proxy to serve /jokes path? if true, it routes to localhost:8080, only for development | true 

See also [https://github.com/itasgmbh/jokes](https://github.com/itasgmbh/jokes) for correspondig jokes microservice

       
=======
       
=======

# Angular Cosmos DB

by [John Papa](http://twitter.com/john_papa)

You can [watch me build the app as part of my series here](https://johnpapa.net/angular-cosmosdb-1/)

You can [view all videos together here](/VIDEOS.md)

[Learn more about developing Node.js apps with Azure's cloud services here](https://docs.microsoft.com/en-us/nodejs/azure)

## Docker

Create the Docker image and run it locally

```bash
dockerImage=angular-cosmosdb
docker build -t $dockerImage .
docker run -d -p 3000:80 $dockerImage
```

## Requirements

1. Install the Angular CLI

    ```bash
    npm install -g @angular/cli
    ```

1. Install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

## Getting Started

1. Clone this repository

    ```bash
    git clone https://github.com/johnpapa/angular-cosmosdb.git
    cd angular-cosmosdb
    ```

1. Install the npm packages

    ```bash
    npm i
    ```

1. Configure Cosmos DB server settings

    Rename the `example-environment.js` file to `environment.js` in the `server/env/` folder and update it with your Cosmos DB settings. Replace the database name key, and port with your specific configuration.

    ```javascript
    // server/env/environment.js
    const cosmosPort = 1234; // replace with your port
    const dbName = 'your-cosmos-db-name-goes-here';
    const key = 'your-key-goes-here';

    module.exports = {
      cosmosPort,
      dbName,
      key
    };
    ```

## Running the app

1. Build the Angular app

    ```bash
    ng build
    ```

1. Launch the server

    ```bash
    node src/server/index.js
    ```

1. Open the browser to http://localhost:3000

## Problems or Suggestions

[Open an issue here](https://github.com/johnpapa/angular-cosmos/issues)
