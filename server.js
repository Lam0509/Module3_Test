const http = require('http');
const url = require('url');
const StudentController = require('./Src/Controller/StudentController');

const studentController = new StudentController();

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;

    switch (path) {
        case '/main':
            studentController.showStudents(req, res).catch(err => {
                console.log(err.message);
            });
            break;
        case '/infor':
            studentController.showStuInforDetail(req, res).catch(err => {
                console.log(err.message);
            })
            break;
        case '/add':
            if (req.method === 'GET') {
                studentController.showAddStudentForm(req, res).catch(err => {
                    console.log(err.message);
                })
            } else {
                studentController.addStudent(req, res).catch(err => {
                    console.log(err.message);
                })
            }
            break;
        case '/update-student':
            if (req.method === 'GET') {
                studentController.showUpdateStudentForm(req, res).catch(err => {
                    console.log(err.message);
                })
            } else {
                studentController.updateStudent(req, res).catch(err => {
                    console.log(err.message);
                })
            }
            break;
        case '/delete-student':
            studentController.deleteStudent(req, res).catch(err => {
                console.log(err.message);
            })
            break;
    }
})

server.listen(3000, 'localhost', () => {
    console.log('Server running on port ' + 3000)
});