const BaseController = require('./BaseController');
const url = require('url');
const qs = require('qs');

class StudentController extends BaseController {

    async showStudents(req, res) {
        let getStudents = `select * from student`
        let students = await this.querySQL(getStudents);
        let html = '';
        students.forEach((student, index) => {
            html += '<tr>';
            html += `<td>${index+1}</td>`;
            html += `<td><a href="/infor?Id=${student.Id}">${student.name}</a></td>`;
            html += `<td>${student.class}</td>`;
            html += `<td>${student.description}</td>`;
            html += `<td><a href="/update-student?Id=${student.Id}" class="btn btn-primary">Sửa</a> <a href="/delete-student?Id=${student.Id}" class="btn btn-danger" onclick="return confirm('Bạn có chắc xóa học viên này?')">Xóa</a></td>`;
            html += '</tr>';
        })

        let dataHtml = await this.getTemplate('./Src/View/main.html');
        dataHtml = dataHtml.replace('{list-of-students}', html);
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(dataHtml);
        res.end();
    }

    async showStuInforDetail(req, res) {
        let id = url.parse(req.url, true).query.Id;
        let getStudent = `select *
                          from student
                          where Id = '${id}'`;
        let studentArray = await this.querySQL(getStudent);
        let student = studentArray[0];
        let html = '';
        html += '<tr>';
        html += `<td>${student.Id}</td>`;
        html += `<td>${student.name}</td>`;
        html += `<td>${student.class}</td>`;
        html += `<td>${student.scoreLT}</td>`;
        html += `<td>${student.scoreTH}</td>`;
        html += `<td>${student.judgement}</td>`;
        html += `<td>${student.description}</td>`;
        html += `<td><a href="/update-student?Id=${student.Id}" class="btn btn-primary">Sửa</a> <a href="/delete-student?Id=${student.Id}" class="btn btn-danger" onclick="return confirm('Bạn có chắc xóa học viên này?')">Xóa</a></td>`;
        html += '</tr>';

        let dataHtml = await this.getTemplate('./Src/View/Student/infor.html');
        dataHtml = dataHtml.replace('{infor-of-student}', html);
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(dataHtml);
        res.end();
    }

    async showAddStudentForm(req, res) {
        let getClasses = `select name from class`
        let classes = await this.querySQL(getClasses);
        let html = '';
        classes.forEach(item => {
            html += `<option value="${item.name}">${item.name}</option>`
        });
        let dataHtml = await this.getTemplate('./Src/View/Student/add.html');
        dataHtml = dataHtml.replace('{list-of-classes}', html);
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(dataHtml);
        res.end();
    }

    async addStudent(req, res) {
        let data =''
        req.on('data', chunk => {
            data += chunk
        });
        req.on('end', async () => {
            const student = qs.parse(data);
            let addStudentSql = `insert into student values ("${student.Id}", "${student.name}", "${student.class}", +${student.scoreLT}, +${student.scoreTH}, "${student.judgement}", "${student.description}")`;
            await this.querySQL(addStudentSql);
            res.writeHead(301, {Location: '/main'});
            return res.end();
        })
    }

    async showUpdateStudentForm(req, res) {
        let Id = url.parse(req.url, true).query.Id;
        let getStudent = `select *
                          from student where Id = '${Id}'`;
        let student = await this.querySQL(getStudent);
        let getClasses = `select name from class`;
        let classes = await this.querySQL(getClasses);
        let html = '';
        html += `<option value="${student[0].class}">${student[0].class}</option>`;

        classes.forEach(item => {
            html += `<option value="${item.name}">${item.name}</option>`
        })

        let dataHtml = await this.getTemplate('./Src/View/Student/update.html');
        dataHtml = dataHtml.replace('{Id}', `<label for="exampleInputEmail16" class="form-label">Id</label>
    <input type="text" class="form-control" id="exampleInputEmail16" aria-describedby="emailHelp" name="Id" value="${student[0].Id}">`);
        dataHtml = dataHtml.replace('{name}', `<label for="exampleInputEmail1" class="form-label">Tên</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" value="${student[0].name}">`);
        dataHtml = dataHtml.replace('{list-of-classes}', html);
        dataHtml = dataHtml.replace('{scoreLT}', ` <label for="exampleInputEmail11" class="form-label">Điểm lý thuyết</label>
    <input type="number" class="form-control" id="exampleInputEmail11" aria-describedby="emailHelp" name="scoreLT" value="${student[0].scoreLT}">`);
        dataHtml = dataHtml.replace('{scoreTH}', ` <label for="exampleInputEmail11" class="form-label">Điểm thực hành</label>
    <input type="number" class="form-control" id="exampleInputEmail11" aria-describedby="emailHelp" name="scoreTH" value="${student[0].scoreTH}">`);
        dataHtml = dataHtml.replace('{judgement}', `<label for="exampleInputEmail14" class="form-label">Đánh giá</label>
    <input type="text" class="form-control" id="exampleInputEmail14" aria-describedby="emailHelp" name="judgement" value="${student[0].judgement}">`);
        dataHtml = dataHtml.replace('{description}', `<label for="exampleInputEmail15" class="form-label">Mô tả</label>
    <textarea class="form-control" id="exampleInputEmail15" name="description" cols="100" rows="6">
    ${student[0].description}
        </textarea>`);
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(dataHtml);
        res.end();
    }

    async updateStudent(req, res) {
        let Id = url.parse(req.url, true).query.Id;
        let data =''
        req.on('data', chunk => {
            data += chunk
        });
        req.on('end', async () => {
            const student = qs.parse(data);
            let updateStudentSql = `update student set Id = '${student.Id}', name = '${student.name}', class = '${student.class}', scoreLT = +${student.scoreLT}, scoreTH = +${student.scoreTH}, judgement = "${student.judgement}", description = '${student.description}' where Id = "${Id}"`
            await this.querySQL(updateStudentSql);
            res.writeHead(301, {Location: '/main'});
            return res.end();
        })
    }

    async deleteStudent(req, res) {
        let Id = url.parse(req.url, true).query.Id;
        let deleteStudentSql = `delete from student where Id = "${Id}"`
        await this.querySQL(deleteStudentSql);
        res.writeHead(301, {Location: '/main'});
        return res.end();
    }
}

module.exports = StudentController;
