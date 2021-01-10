export default async (mongoose) => {
    try {
        const dburi = process.env.CONN_MONGOCLOUD
        await mongoose.connect(dburi,  { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        return true
    } catch (error) {
        console.log("Error de conexión")
        console.log(error)
        return false
    }
}
