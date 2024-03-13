import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class MentorApi {
    mentorApi = axios.create({
        baseURL: `${API_BASE_URL}/api/mentor`,
        withCredentials: true,
    });

    getAllMentors() {
        return this.mentorApi.get('/');
    }

    createMentor(mentorData) {
        return this.mentorApi.post('/', mentorData);
    }

    getMentorById(mentorId) {
        return this.mentorApi.get(`/${mentorId}`);
    }

    updateMentor(mentorId, updatedMentorData) {
        return this.mentorApi.put(`/${mentorId}`, updatedMentorData);
    }

    deleteMentor(mentorId) {
        return this.mentorApi.delete(`/${mentorId}`);
    }
}

const MentorApiInstance = new MentorApi();
export default MentorApiInstance;