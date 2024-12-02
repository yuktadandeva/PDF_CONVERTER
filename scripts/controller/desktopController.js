window.addEventListener('DOMContentLoaded',bindEvents);

function bindEvents(){
    loadPDF();
}



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
        document.getElementById('pdfContainer').appendChild(canvas);
    });
}

// Function to load the PDF file and render the pages


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

function loadPDF(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const pdfData = new Uint8Array(event.target.result);

        // Load the PDF using PDF.js
        pdfjsLib.getDocument({ data: pdfData }).promise.then(function(pdf) {
            const totalPages = pdf.numPages;

            // Render each page of the PDF
            for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                renderPage(pdf, pageNumber);
            }
        }).catch(function(error) {
            console.error("Error loading PDF: ", error);
        });
    };

    reader.readAsArrayBuffer(file); // Read the PDF file
}
  

