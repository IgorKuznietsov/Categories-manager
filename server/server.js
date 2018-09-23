const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const bodyParser = require('body-parser')

const mongodbUrl = 'mongodb://localhost:27017'
const dbName = 'data'
const usersCollectionName = 'users'
const groupsCollectionName = 'groups'
const sessionsCollectionName = 'sessions'


MongoClient.connect(mongodbUrl, { useNewUrlParser: true }, (err, client) => {
    
    if (err) {
        console.log(err)
        return
    }
    
    const db = client.db(dbName)
    const usersCollection = db.collection(usersCollectionName)
    const groupsCollection = db.collection(groupsCollectionName)
    const sessionsCollection = db.collection(sessionsCollectionName)

    const lifetime = 300000 //maximum without activity session duration 

    app.use( function (req, res, next) {
        console.log(req.path)
        if (req.path == '/auth' || req.path == '/createDemoUser/') {
            next()        
        } else {
            let sessionId = req.get('SessionId')
            if (!sessionId) {
                res.status(401).end() //SessionId header should be passed
                return
            }

            let objSessionId = new ObjectID(sessionId)
            sessionsCollection.find({_id: objSessionId}).toArray( (err, sessions) => {
                if (!sessions.length) {
                    res.status(401).end()  //wrong sessionId
                    return
                }
                if ( new Date().getTime() > sessions[0].expires){
                    res.status(401).end()  //session expired
                    return
                }
                sessionsCollection.updateOne({_id: objSessionId}, {$set: {expires: new Date().getTime() + lifetime}}, (err, response) => {})  //session prolongation  
                next()
            } )
        }    
    } )

    app.use(bodyParser.json())

    function getGroups(req, res) {
        groupsCollection.find({parent: req.body.parent}).toArray( (err, groups) => {
            groups.map( 
                (group) => {
                    if (group.id == undefined) {
                        group.id = group._id
                    }
                }
            )
            res.json({groups: groups})    
        })
    }

    //create demo user via browser request
    app.get('/createDemoUser/', (req, res) => {
       usersCollection.insertOne({login: 'demo', password: '111'})
       res.send('user \'demo\' with password \'111\' added')
    })

    app.post('/auth', (req, res) => {
        usersCollection.find({login: req.body.login, password: req.body.password}).hasNext( (err, hasNext) => {
            if (hasNext) {
                let sessionId = new ObjectID
                expires = new Date().getTime() + lifetime
                sessionsCollection.insertOne({_id: sessionId, expires: expires}) //TODO: add a callback and call the next line from it
                res.json({sessionId: sessionId.toHexString()})    
            } else {
                res.json({sessionId: null})    
            }    
        })
    })

    app.post('/getGroups', (req, res) => {
        getGroups(req, res)
    })

    app.post('/addGroup', (req, res) => {
        groupsCollection.insertOne({parent: req.body.parent, name: req.body.name}, (err, response) => {
            if(!err) {
                getGroups(req, res)
            }
        })
    })

    app.post('/updateGroup', (req, res) => {
        groupsCollection.updateOne({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name}}, (err, response) => {
            if(!err) {
                getGroups(req, res)
            }
        })
    })

    app.post('/deleteGroup', (req, res) => {
        groupsCollection.deleteOne({_id: ObjectID(req.body.id)}, (err, response) => {
            if(!err) {
                getGroups(req, res)
            }
        })
    })

    app.listen(3001, () => {console.log('web server started')})
})




