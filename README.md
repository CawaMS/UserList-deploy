
# Setup a demo for using Datadog to monitor a node.js web app hosted in Azure

### 1. Clone Node.js project UserList from the following link:
[https://github.com/CawaMS/UserList-deploy.git](https://github.com/CawaMS/UserList-deploy.git)

### 2. Create a MongoDB

Create Azure Cosmos DB with Mongo interface


### 3. Change directory to the project root folder. Run:
```
npm install
```

### 4. Start the project locally by running:
```
db="replace_with_db_connection_string" npm start
```
Make sure the website works. Add a user with location at 'us' and zipcode '98052' to test the app works. Add another user with location different from 'us' or 'Canada', for example, 'Vancouver', and see how the website is not responding, but in console output there are error log messages.

### 5. Create an Azure Linux VM: [Intro to Ubuntu Virtual Machines on Azure](http://timmyreilly.azurewebsites.net/intro-to-ubuntu-virtual-machines-on-azure/)

### 6. Follow instructions from this doc to run the website in Azure Linux VM: [Running Node and Express on Ubuntu VM](http://timmyreilly.azurewebsites.net/running-node-and-express-on-ubuntu-vm/)

### 7. Login to [Datadog portal](https://www.datadoghq.com/). Create account if needed

### 8. Install Datadog Azure integration

### 9. Follow instructions at [Datadog logs onboarding](https://app.datadoghq.com/logs/onboarding/cloud) to create Azure functions to post messages in Event Hub to Datadog

### 10. Follow instructions at [Use Linux Diagnostic Extension to monitor metrics and logs](https://docs.microsoft.com/en-us/azure/virtual-machines/extensions/diagnostics-linux#introduction) to install and configure LAD to store data in event hub.

Winston logs are stored in a file configured in /config/winston.js.

Service Bus SAS token can be generated following instructions at [Service Bus access control with Shared Access Signatures](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-sas)



# Original README.md content: Creating a Simple RESTful Web App with Node.js, Express, and MongoDB

A complete sample project for Front-End developers teaching the basics of REST and using them to build an easy, fast, single-page web app.

## Quickstart

[Visit the tutorial online](http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/), follow along with it, write your own code, compare it to this working sample code.

**Note: If you want to run this sample code, you will need to do an NPM Install, as the node_modules directory has been removed from the repo.**


## Author

Christopher Buecheler is a front-end developer for a small San Francisco startup. Previously he's worked for companies like GameSpy, OkCupid, Crispy Gamer, and Comcast. You can visit him at [his website](http://cwbuecheler.com).


## Contents

* /public - static directories suchs as /images
* /routes - route files for tutorial project
* /views - views for tutorial project
* README.md - this file
* app.js - central app file for tutorial project
* package.json - package info for tutorial project
