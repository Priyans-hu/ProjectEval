# ProjectEval 🚀

ProjectEval is a web application designed to streamline the evaluation process for mentors assessing students' semester-long projects in college. The application provides a platform for mentors to assign students, assign marks based on predefined parameters, and submit evaluations efficiently.

## Features ✨

- **Student Assignment**: Mentors can add students to be evaluated, ensuring that each mentor accommodates a minimum of 3 and a maximum of 4 students at a time.
- **Mark Assignment**: Mentors can assign marks to each student based on various parameters such as ideation, execution, viva/pitch, and more. Total marks are calculated and visible to the mentor.
- **Edit/Remove Functionality**: Mentors can edit or remove assigned students and marks, subject to the same conditions as adding new students.
- **Submission Lock**: After submitting marks, they are locked and cannot be edited. If some students have unassigned marks, mentors cannot submit until all marks are assigned.
- **Viewing and Filtering**: Mentors can view all students and their assigned marks, with filters for viewing students with unassigned marks and viewing students with assigned marks.
- **Email Notifications**: Automatically send email notifications to assigned students once the mentor submits the evaluation, notifying them that the evaluation has been completed.

## Upcoming Features 🌟

- **Marksheet Generation**: Generate a mark sheet for each mentor in PDF or document format, providing a summary of all students' marks.

## Technologies Used 💻

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB

## Getting Started 🚀

To get started with ProjectEval, follow these steps:

### Backend

1. Clone the repository: `git clone https://github.com/Priyans-hu/ProjectEval`
2. Navigate to the backend directory: `cd ProjectEval/backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the `backend` directory and add your MongoDB URL as `DB_PATH` and a port number as `PORT` (e.g., `DB_PATH=mongodb://localhost:27017/projecteval` and `PORT=5000`)
5. Run the backend server: `npm start`

### Frontend

1. Navigate to the frontend directory: `cd ProjectEval/frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `frontend` directory and add your backend API base URL (e.g., `REACT_APP_API_BASE_URL=http://localhost:5000/api`)
4. Build the frontend: `npm run build`
5. Run the frontend server: `npm start`

## Contributing 🤝

We welcome contributions to ProjectEval! If you'd like to contribute, please follow these guidelines:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

Feel free to modify and add more features to enhance ProjectEval! 🌈