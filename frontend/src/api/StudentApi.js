import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class StudentApi {
    studentApi = axios.create({
        baseURL: `${API_BASE_URL}/api/student`,
        withCredentials: true,
    });

    getAllStudents() {
        return this.studentApi.get('/');
    }

    createStudent(studentData) {
        return this.studentApi.post('/', studentData);
    }

    getStudentById(studentId) {
        return this.studentApi.get(`/${studentId}`);
    }

    updateStudent(studentId, updatedStudentData) {
        return this.studentApi.put(`/${studentId}`, updatedStudentData);
    }

    updateEvaluation(studentId, evaluationData) {
        return this.studentApi.put(`/eval/${studentId}`, evaluationData);
    }

    lockStudent(studentId) {
        return this.studentApi.put(`/lock/${studentId}`);
    }

    deleteStudent(studentId) {
        return this.studentApi.delete(`/${studentId}`);
    }
}

const StudentApiInstance = new StudentApi();
export default StudentApiInstance;