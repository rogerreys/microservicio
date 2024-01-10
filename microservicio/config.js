module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret'
    },
    mysql: {
        host: process.env.HOST || 'my_mysql', 
        user: process.env.USER || 'root',
        password: process.env.PASSWORD || 'root',
        database: process.env.DATABASE || 'maindb'
    },
    mysqlService:{
        port: process.env.MYSQL_SRV_PORT || "3001"
    }
}