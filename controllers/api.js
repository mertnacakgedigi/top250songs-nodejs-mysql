const getList = (req,res) => {
    var sql="SELECT songs.id,songs.name,songs.artist,COUNT(ratings.rating) as c,ratings.rating as r, AVG(ratings.rating) as a FROM songs LEFT JOIN ratings ON ratings.song_id=songs.id GROUP BY songs.name ORDER BY a desc"
    db.query(sql,(err,result)=>{
        if (err) console.log(err)
        res.status(200).json(result)
    })
}

const getRating = (req,res) => {

    var sql="SELECT * FROM ratings"
    db.query(sql,(err,result)=>{
        if (err) console.log(err)
        res.status(200).json(result)
    })
}

const postRating = (req,res) => {
    var sql = "INSERT INTO ratings SET ?";
    db.query(sql,req.body,(err,result) => {
        if (err) return res.status(500).json({ status: 500, message: err })
        return res.status(200).json({ status: 200, message: "Ratings added",result })
    })
}

const getUserRating = (req,res) => {
   var sql = `SELECT songs.id as song_id,songs.name,songs.artist,COUNT(ratings.rating) as c,ratings.rating as r, AVG(ratings.rating) as a, ratings.user_id FROM songs LEFT JOIN ratings ON ratings.song_id=songs.id Right Join ratings as ra on ratings.user_id =${req.body.user_id} GROUP BY songs.name ORDER BY a desc`
    db.query(sql,(err,result) => {
        if (err) return res.status(500).json({ status: 500, message: err })
        return res.status(200).json({ status: 200, message: "User rating sent",result })
    })
}


module.exports = {
    getList,
    getRating,
    postRating,
    getUserRating
}