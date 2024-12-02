window.addEventListener('DOMContentLoaded',bindEvents);

function bindEvents(){
    handleDesktopFileInput();
}

function handleDesktopFileInput(){

    const { pdfjsLib } = window;
  
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.9.124/+esm";
  
    let pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 0.8,
        canvas = document.getElementById('the-canvas'),
        ctx = canvas.getContext('2d');
  
    // Retrieve and decode PDF from local storage
    const storedPDF = localStorage.getItem('uploadedFile');
    if (!storedPDF) {
      console.error('No PDF found in local storage!');
      return;
    }
    const base64PDF = storedPDF.split(',')[1];
    const binaryString = atob(base64PDF);
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
  
    // Render a page
    function renderPage(num) {
      pageRendering = true;
      pdfDoc.getPage(num).then(function (page) {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        const renderTask = page.render(renderContext);
  
        renderTask.promise.then(function () {
          pageRendering = false;
          if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
          }
        });
      });
  
      document.getElementById('page_num').textContent = num;
    }
  
    // Queue page rendering
    function queueRenderPage(num) {
      if (pageRendering) {
        pageNumPending = num;
      } else {
        renderPage(num);
      }
    }
  
    // Previous page
    document.getElementById('prev').addEventListener('click', function () {
      if (pageNum <= 1) {
        return;
      }
      pageNum--;
      queueRenderPage(pageNum);
    });
  
    // Next page
    document.getElementById('next').addEventListener('click', function () {
      if (pageNum >= pdfDoc.numPages) {
        return;
      }
      pageNum++;
      queueRenderPage(pageNum);
    });
  
    // Load the PDF
    pdfjsLib.getDocument({ data: uint8Array }).promise.then(function (pdfDoc_) {
      pdfDoc = pdfDoc_;
      document.getElementById('page_count').textContent = pdfDoc.numPages;
      renderPage(pageNum);
    });
  };
  

