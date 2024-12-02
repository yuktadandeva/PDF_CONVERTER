window.addEventListener('DOMContentLoaded',bindEvents);

function bindEvents(){
        const base64PDF = localStorage.getItem('uploadedFile');
        if (base64PDF) {
            document.querySelector('.file-container').innerHTML = '';  // Clear previous content
            renderPDFFromBase64(base64PDF);  // Load and render the PDF from localStorage
        } else {
            alert('No PDF found in localStorage.');
        }

}
// Function to render a page of the PDF
function renderPage(pdf, pageNumber) {
    pdf.getPage(pageNumber).then(function(page) {
        const scale = 1.5;  // Adjust the zoom level
        const viewport = page.getViewport({ scale: scale });

        // Create a canvas element to render the PDF page
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Set canvas size
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render the page into the canvas
        page.render({
            canvasContext: context,
            viewport: viewport
        });

        // Append the canvas to the pdfContainer
        document.querySelector('.file-container').appendChild(canvas);
    });
}

// Function to load the PDF file and render the pages
function loadPDF(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const pdfData = new Uint8Array(event.target.result);

        // Convert the PDF to base64
        const base64PDF = arrayBufferToBase64(pdfData);

        // Store the PDF in localStorage
        localStorage.setItem('pdfFile', base64PDF);
        alert("PDF stored in localStorage!");

        // Render the PDF
        renderPDFFromBase64(base64PDF);
    };

    reader.readAsArrayBuffer(file); // Read the PDF file
}

// Convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
    const byteArray = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < byteArray.length; i++) {
        binary += String.fromCharCode(byteArray[i]);
    }
    return window.btoa(binary);
}

// Function to render the PDF from a base64 string
function renderPDFFromBase64(base64PDF) {
    const pdfData = atob(base64PDF);  // Decode base64 string
    const pdfArray = new Uint8Array(pdfData.length);
    for (let i = 0; i < pdfData.length; i++) {
        pdfArray[i] = pdfData.charCodeAt(i);
    }

    // Load the PDF using PDF.js
    pdfjsLib.getDocument({ data: pdfArray }).promise.then(function(pdf) {
        const totalPages = pdf.numPages;

        // Render each page of the PDF
        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            renderPage(pdf, pageNumber);
        }
    }).catch(function(error) {
        console.error("Error loading PDF: ", error);
    });
}

// Event listener for file input to upload a PDF
// document.getElementById('fileInput').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/pdf') {
//         document.getElementById('pdfContainer').innerHTML = '';  // Clear previous content
//         loadPDF(file);  // Load and display the PDF
//     } else {
//         alert('Please upload a valid PDF file.');
//     }
// });

// Event listener for the "Load PDF from LocalStorage" button
