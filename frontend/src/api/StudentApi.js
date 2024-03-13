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

    deleteStudent(studentId) {
        return this.studentApi.delete(`/${studentId}`);
    }

    updateEvaluation(studentId, evaluationData) {
        return this.studentApi.put(`/${studentId}/evaluation`, evaluationData);
    }
}

const StudentApiInstance = new StudentApi();
export default StudentApiInstance;