const socketIo = require('socket.io')
const { sequelize } = require('../models')
const users = new Map()
const userSockets = new Map()

const SocketServer = (server) => {
    const io = socketIo(server)

    io.on('connection', (socket) => {
        socket.on('join', async (user) => {
            let sockets = []
            if(users.has(user.id)) {
                const existingUser = users.get(user.id)
                existingUser.sockets = [...existingUser.sockets, ...[socket.id]]
                users.set(user.id, existingUser)
                sockets = [...existingUser.sockets, ...[socket.id]]
                userSockets.set(socket.id, user.id)
            } else {
                users.set(user.id, { id: user.id, sockets: [socket.id] })
                sockets.push(socket.id)
                userSockets.set(socket.id, user.id)
            }
            const onlineFriends = [] //ids
            const chatters = await getChatters(user.id) //query

            console.log(chatters);

            // notify his friend that user is now online
            for (let i=0; i<chatters.length; i++) {
                if(users.has(chatters[i])) {
                    const chatter = users.get(chatters[i])
                    chatters.sockets.forEach(socket => {
                        try {
                            io.to(socket).emit('online', user)
                        } catch (error) {
                            
                        }
                    })
                    onlineFriends.push(chatter.id)
                }
            }

            //send to user sockets which of his friends are online
            sockets.forEach(socket => {
                try {
                    io.to(socket).emit('friends', onlineFriends)
                } catch (error) {
                    
                }
            })

            console.log('New user joined: ', user.firstName);

            io.to(socket.id).emit('typing', 'User typing...')
        })

        socket.on('disconnect', async() => {
            if(userSockets.has(socket.id)) {
                const user = users.get(userSockets.get(socket.id))
                if(user.sockets.length > 1) {
                    user.sockets = user.sockets.filter(sock => {
                        if(sock !== socket.id) return true
                        userSockets.delete(sock)
                        return false
                    })
                    users.set(user.id, user)
                }else{
                    const chatters = getChatters(user.id)
                    for (let i=0; i<chatters.length; i++){
                        if (users.has(chatters[i])){
                            users.get(chatters[i]).sockets.forEach(socket => {
                                try{
                                    io.to(socket).emit('offline', user)
                                }catch(error){

                                }
                            })
                        }
                    }
                    userSockets.delete(socket.id)
                    users.delete(user.id)
                }
            }
        })
    })
}

const getChatters = async (userId) => {
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT "cu"."userId" FROM "ChatUser" as cu
            INNER JOIN (
                SELECT "c"."id" FROM "Chats" as c
                WHERE exists (
                    SELECT "u"."id" FROM "Users" as u
                    INNER JOIN "ChatUsers" on u.id = "ChatUsers"."userId"
                    WHERE u.id = ${parseInt(userId)} and c.id = "ChatUsers"."chatId"
                )
            ) AS cjoin on cjoin.id = "cu"."chatId"
            WHERE "cu"."userId" != ${parseInt(userId)}
        `)
        return results.length > 0 ? results.map(el => el.userId) : []
    } catch (error) {
        console.log(error);
        return []
    }
}

module.exports = SocketServer