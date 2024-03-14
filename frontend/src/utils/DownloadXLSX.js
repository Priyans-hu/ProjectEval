import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const DownloadXLSX = ({ data }) => {
    const downloadData = () => {
        const dataWithSerial = data.map((item, index) => ({
            ...item,
            "s.no": index + 1,
        }));

        const filteredData = dataWithSerial.map(({ "s.no": Serial, name, email, evaluation, mentor, isLocked }) => ({
            "s.no" : Serial,
            Name: name,
            Email: email,
            Ideation: evaluation.ideation,
            Execution: evaluation.execution,
            VivaPitch: evaluation.vivaPitch,
            Facultycode: mentor,
            Submitted: isLocked ? 'Yes' : 'No',
        }));

        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(file, 'data.xlsx');
    };

    return (
        <button onClick={downloadData}>Download XLSX</button>
    );
};

export default DownloadXLSX;