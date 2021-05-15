module.exports = function(app,url) {

    app.get('/', (req,res) =>{
        res.render('login.ejs')
    })

    app.get('/dashboard', (req,res)=>{
        res.render('./portal/dashboard.ejs',{
            title:"dashboard"
        })
    })

    app.get('/list/:pageNum', (req, res) => {
        var itemsPerPage = 10
        var pageNo = req.params['pageNum']
        var users = req.db.get('customers');
        users.find({}, { skip: (itemsPerPage * (pageNo - 1)), limit: itemsPerPage }, function(e, docs) {
            console.log(docs)
            res.render('./portal/list.ejs', {
                title: 'Users',
            });
        });

    })

}