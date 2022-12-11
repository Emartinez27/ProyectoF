const mongoose = require('mongoose');

const getConnection = async () => {
    try {
       // const url = 'mongodb://usuario-test:umuewA2r4KYgQnvM@ac-kywdwnj-shard-00-00.vs2swdm.mongodb.net:27017,ac-kywdwnj-shard-00-01.vs2swdm.mongodb.net:27017,ac-kywdwnj-shard-00-02.vs2swdm.mongodb.net:27017/inventarios-g?ssl=true&replicaSet=atlas-eikhsg-shard-0&authSource=admin&retryWrites=true&w=majority'
       // const url = 'mongodb://leidyocampo:IUD43181564@ac-8zyjpcr-shard-00-00.d78lq3c.mongodb.net:27017,ac-8zyjpcr-shard-00-01.d78lq3c.mongodb.net:27017,ac-8zyjpcr-shard-00-02.d78lq3c.mongodb.net:27017/test-jwt?ssl=true&replicaSet=atlas-yaq17h-shard-0&authSource=admin&retryWrites=true&w=majority'
        const url = 'mongodb://leidyocampo:IUD43181564@ac-8zyjpcr-shard-00-00.d78lq3c.mongodb.net:27017,ac-8zyjpcr-shard-00-01.d78lq3c.mongodb.net:27017,ac-8zyjpcr-shard-00-02.d78lq3c.mongodb.net:27017/test-jwt?ssl=true&replicaSet=atlas-yaq17h-shard-0&authSource=admin&retryWrites=true&w=majority'

        await mongoose.connect(url);

        console.log("Conexión Exitosa")


    } catch (error) {
        console.log(error);
        throw new error('Error de conexión', error);
    }
}

module.exports = { getConnection, }