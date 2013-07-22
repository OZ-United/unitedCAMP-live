# unitedCAMP-live

Live message feed.

MEAN Stack: mongoDB, express, AngularJS, node.js

## Configuration

You can set environment variable:  
- PORT

## Deployment

You need mongod service running and have forever module installed, then run:

    PORT=3000 forever start unitedCAMP-live.js

To view list of running tastk type

    forever list

    info:    Forever processes running
    data:        uid  command                        script             forever pid  logfile                           uptime     
    data:    [0] KlUJ /home/user/local/bin/node unitedCAMP-live.js 4716    4718 /home/user/.forever/KlUJ.log 0:0:0:6.95


To stop server type:

    forever stop 0

# License

The MIT License

Copyright (c) 2013 Jan Antala, https://github.com/janantala
