const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const mongoose = require('mongoose');

mongoose.connect('mongodb://hfpp2012:hfpp2012@ds151068.mlab.com:51068/todos');

const todoSchema = new mongoose.Schema({
  item: String
});

const Todo = mongoose.model('Todo', todoSchema);
// let data = [{ item: 'item 1' }, { item: 'item 2' }, { item: 'item 3' }]


module.exports = (app) => {
  app.get('/todo', (req, res) => {
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    const itemOne = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', (req, res) => {
    // data = data.filter(function(todo) => {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    Todo.find({ item: req.params.item.replace(/-/g, " ") }).remove((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });
}
