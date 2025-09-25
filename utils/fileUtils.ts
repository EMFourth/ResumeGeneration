
declare var html2pdf: any;
declare var htmlToDocx: {
  asBlob(html: string): Promise<Blob>;
};
declare var pdfjsLib: any;
declare var mammoth: any;

// Set up PDF.js worker
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;
}

export const downloadAsPdf = (element: HTMLElement, filename: string) => {
  const opt = {
    margin: 0.5,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
};

export const downloadAsDocx = async (fullHtmlContent: string, filename: string) => {
  try {
    const fileBuffer = await htmlToDocx.asBlob(fullHtmlContent);
    const url = URL.createObjectURL(fileBuffer);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error creating DOCX file:", error);
  }
};

const parseTxtFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    reader.onerror = (error) => {
      reject(new Error('Failed to read the .txt file.'));
    };
    reader.readAsText(file);
  });
};

const parsePdfFile = async (file: File): Promise<{ text: string; pageCount: number }> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
  const pageCount = pdf.numPages;
  let textContent = '';
  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const text = await page.getTextContent();
    textContent += text.items.map((item: any) => item.str).join(' ');
    textContent += '\n'; // Add newline between pages
  }
  return { text: textContent, pageCount };
};

const parseDocxFile = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

export const parseResumeFile = async (file: File): Promise<{ text: string; pageCount: number | null }> => {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'txt': {
      const text = await parseTxtFile(file);
      return { text, pageCount: null };
    }
    case 'pdf':
      return parsePdfFile(file);
    case 'docx': {
      const text = await parseDocxFile(file);
      return { text, pageCount: null };
    }
    default:
      throw new Error('Unsupported file type. Please upload a .txt, .pdf, or .docx file.');
  }
};
