const getList = (req,res) => {
    var sql="SELECT * FROM songs"
    db.query(sql,(err,result)=>{
        if (err) console.log(err)
        console.log(result)
        res.json(result)
    })
}

module.exports = {
    getList,
}