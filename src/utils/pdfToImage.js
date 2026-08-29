import * as pdfjsLib from 'pdfjs-dist';

// Configure reliable worker with CDN and local fallback
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '4.10.38'}/build/pdf.worker.min.mjs`;
  } catch (e) {
    console.warn('PDF.js worker initialization:', e);
  }
}

/**
 * Converts the first page of a PDF into a high-resolution PNG data URL
 * @param {File | Blob | string} pdfSource - PDF File, Blob, or base64 Data URL
 * @returns {Promise<string>} - Promise resolving to base64 image data URL
 */
export async function renderPdfFirstPageToImage(pdfSource) {
  try {
    let loadingTask;

    if (typeof pdfSource === 'string') {
      if (pdfSource.startsWith('data:')) {
        const base64Data = pdfSource.split(',')[1];
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        loadingTask = pdfjsLib.getDocument({ data: bytes });
      } else {
        loadingTask = pdfjsLib.getDocument(pdfSource);
      }
    } else {
      const arrayBuffer = await pdfSource.arrayBuffer();
      loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    }

    const pdfDoc = await loadingTask.promise;
    const page = await pdfDoc.getPage(1);

    // Scale to crisp resolution (2.0 scale)
    const scale = 2.0;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Fill pure white background
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    return canvas.toDataURL('image/png', 0.95);
  } catch (error) {
    console.error('Error rendering PDF to image preview:', error);
    throw error;
  }
}
