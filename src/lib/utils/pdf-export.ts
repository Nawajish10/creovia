import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Captures an HTML element using html2canvas and exports it as a multi-page A4 PDF.
 * Temporarily hides elements marked with the `.no-pdf` class during generation.
 */
export async function exportReportToPDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`PDF Export Error: Element with id "${elementId}" not found.`);
    return;
  }

  // Find and temporarily hide non-printable actions
  const noPrintElements = element.querySelectorAll(".no-pdf");
  const originalDisplays: string[] = [];
  
  noPrintElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    originalDisplays.push(htmlEl.style.display);
    htmlEl.style.display = "none";
  });

  try {
    // Render the report component with high resolution scale
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: false,
      backgroundColor: "#fbf8ff", // Match background color token
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    // Page 1
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pageHeight;

    // Remaining pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight; // Shift slice coordinates upwards
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (err) {
    console.error("PDF generation failed:", err);
    throw err;
  } finally {
    // Restore elements visibility
    noPrintElements.forEach((el, idx) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.display = originalDisplays[idx] || "";
    });
  }
}
