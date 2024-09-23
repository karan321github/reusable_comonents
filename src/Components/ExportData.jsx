import React from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ExportData = ({
  data,
  fileName,
  allowedFormats = ["csv", "xlsx", "pdf"],
}) => {
  const handleExportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [Object.keys(data[0])],
      body: data.map(Object.values),
    });
    doc.save(`${fileName}.pdf`);
  };

  return (
    <div className="flex space-x-2">
      {allowedFormats.includes("csv") && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleExportCSV}
        >
          Export CSV
        </button>
      )}
      {allowedFormats.includes("xlsx") && (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleExportXLSX}
        >
          Export XLSX
        </button>
      )}
      {allowedFormats.includes("pdf") && (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleExportPDF}
        >
          Export PDF
        </button>
      )}
    </div>
  );
};

export default ExportData;
