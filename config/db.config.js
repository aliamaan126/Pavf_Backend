const dbConfig = {
    local:{
        mongo:{
            uri:'mongodb://localhost:27017/PAVF'
        }
    },
    server:{
        mongo:{
            uri:'mongodb+srv://aliamaan126:f5UkKvxM5rNAWm3N@pavf.xdyjfey.mongodb.net/PAVF_Mobile?retryWrites=true&w=majority'
        }
    }

}

export default dbConfig;