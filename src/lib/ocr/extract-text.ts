import { createWorker } from "tesseract.js";

/**
 * Extracts raw text from an image Buffer using Tesseract.js.
 * Includes error handling, retry support, and strict worker termination.
 */
export async function extractTextFromBuffer(buffer: Buffer): Promise<string> {
  if (!buffer || buffer.length === 0) {
    throw new Error("Invalid image buffer provided for OCR extraction.");
  }

  const maxRetries = 2;
  let attempt = 0;
  let lastError: any = null;

  while (attempt < maxRetries) {
    attempt++;
    let worker: any = null;
    try {
      console.log(`[OCR] Starting extraction attempt ${attempt}/${maxRetries}...`);
      
      // Initialize Tesseract worker with English language config
      worker = await createWorker("eng");
      
      // Perform text recognition
      const { data: { text } } = await worker.recognize(buffer);
      
      // Clean up worker process immediately to free resources
      await worker.terminate();
      
      console.log("[OCR] Extraction completed successfully.");
      return text || "";
    } catch (err) {
      console.error(`[OCR] Error during attempt ${attempt}:`, err);
      lastError = err;
      if (worker) {
        try {
          await worker.terminate();
        } catch (_) {}
      }
    }
  }

  throw new Error(`OCR extraction failed after ${maxRetries} attempts. Last error: ${lastError?.message || lastError}`);
}
