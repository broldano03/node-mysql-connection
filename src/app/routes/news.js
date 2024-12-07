const dbConnection = require('../../config/dbConnection')

module.exports = app => {
    const connection = dbConnection()
    
    app.get('/', (req, res) => {
        connection.query('SELECT * FROM news', (err, result) => {
            if (err) {
                console.error('Error fetching news:', err);
                return res.status(500).send('Error fetching news');
            }
            res.render('news/news', {
                news: result
            });
        });
    });

    app.post('/news', (req, res) => {
        console.log('Request body:', req.body); // Depuración
        const { title, news } = req.body;
    
        if (!title || !news) {
            console.error('Missing title or news content');
            return res.status(400).send('Title and news content are required');
        }
    
        connection.query('INSERT INTO news SET ?', { title, news }, (err, result) => {
            if (err) {
                console.error('Error inserting news:', err);
                return res.status(500).send('Error inserting news');
            }
            res.redirect('/');
        });
    });
}