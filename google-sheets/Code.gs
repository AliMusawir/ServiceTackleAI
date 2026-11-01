const SHEET_APPLICATIONS = "Applications";
const SHEET_CONSULTATIONS = "Consultations";
const DRIVE_FOLDER_NAME = "ServiceTackle AI — Job Applications";
const ADMIN_EMAIL = "contact@servicetackle.com";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return response(false, "No request data received.");
    }

    const data = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    // ----------------------------------------------------
    // 1. Handle Consultation Booking Requests
    // ----------------------------------------------------
    if (data.type === "consultation" || data.service) {
      if (!data.name || !data.email) {
        return response(false, "Name and Email are required for consultation.");
      }

      let sheet = spreadsheet.getSheetByName(SHEET_CONSULTATIONS);
      if (!sheet) {
        sheet = spreadsheet.insertSheet(SHEET_CONSULTATIONS);
        sheet.appendRow([
          "Timestamp",
          "Client Name",
          "Work Email",
          "Phone",
          "Company",
          "Target AI Service",
          "Estimated Budget",
          "Project Requirements"
        ]);
        const header = sheet.getRange(1, 1, 1, 8);
        header.setFontWeight("bold");
        header.setBackground("#0F172A");
        header.setFontColor("#FFFFFF");
      }

      sheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.phone || "",
        data.company || "Not specified",
        data.service || "General AI Consultation",
        data.budget || "Flexible",
        data.message || ""
      ]);

      // Dispatch direct email alert to contact@servicetackle.com via Google MailApp
      try {
        const subject = "🚀 New Lead: " + data.name + " (" + (data.company || "Company") + ") - " + (data.service || "AI Consultation");
        const body = 
          "New AI Consultation Request Received:\n\n" +
          "• Name: " + data.name + "\n" +
          "• Email: " + data.email + "\n" +
          "• Phone: " + (data.phone || "Not provided") + "\n" +
          "• Company: " + (data.company || "Not specified") + "\n" +
          "• Target Service: " + (data.service || "General AI Consultation") + "\n" +
          "• Budget: " + (data.budget || "Flexible") + "\n\n" +
          "Project Requirements / Message:\n" + (data.message || "No message provided") + "\n\n" +
          "—\nServiceTackle AI Web Engine";

        MailApp.sendEmail({
          to: ADMIN_EMAIL,
          subject: subject,
          body: body,
          replyTo: data.email
        });

        // Also send auto-confirmation email to the client
        const clientSubject = "Thank You for Contacting ServiceTackle AI — We Received Your Request";
        const clientBody = 
          "Hi " + data.name + ",\n\n" +
          "Thank you for reaching out to ServiceTackle AI regarding " + (data.service || "AI Solutions") + ".\n\n" +
          "Our solutions engineering team has received your request and will review your project details. We will reach out within 2–4 business hours to schedule your strategy session.\n\n" +
          "Best regards,\n" +
          "ServiceTackle AI Team\n" +
          "https://servicetackle.com\n" +
          ADMIN_EMAIL;

        MailApp.sendEmail({
          to: data.email,
          subject: clientSubject,
          body: clientBody,
          replyTo: ADMIN_EMAIL
        });
      } catch (mailErr) {
        console.error("MailApp notification error:", mailErr);
      }

      return response(true, "Consultation request recorded and emailed successfully.");
    }

    // ----------------------------------------------------
    // 2. Handle Careers / Job Applications
    // ----------------------------------------------------
    if (!data.name || !data.email || (!data.position && !data.role)) {
      return response(false, "Required applicant fields are missing.");
    }

    let sheet = spreadsheet.getSheetByName(SHEET_APPLICATIONS);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_APPLICATIONS);
      sheet.appendRow([
        "Timestamp",
        "Applicant Name",
        "Email",
        "Phone",
        "Position",
        "LinkedIn",
        "Portfolio",
        "Resume Link",
        "Cover Note"
      ]);
      const header = sheet.getRange(1, 1, 1, 9);
      header.setFontWeight("bold");
      header.setBackground("#0F172A");
      header.setFontColor("#FFFFFF");
    }

    // Find or create Drive folder for resume files
    const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
    const folder = folders.hasNext()
      ? folders.next()
      : DriveApp.createFolder(DRIVE_FOLDER_NAME);

    let resumeUrl = "";

    if (data.resume && data.resume.data) {
      const bytes = Utilities.base64Decode(data.resume.data);
      const blob = Utilities.newBlob(
        bytes,
        data.resume.type || "application/pdf",
        data.resume.name || "resume.pdf"
      );
      const file = folder.createFile(blob);
      resumeUrl = file.getUrl();
    } else if (data.resumeUrl) {
      resumeUrl = data.resumeUrl;
    }

    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone || "",
      data.position || data.role || "AI Engineer",
      data.linkedin || "",
      data.portfolio || "",
      resumeUrl,
      data.coverLetter || data.coverNote || ""
    ]);

    // Send Admin notification for new applicant
    try {
      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: "💼 New Job Application: " + data.name + " for " + (data.position || data.role),
        body: 
          "New Job Application Received:\n\n" +
          "• Candidate: " + data.name + "\n" +
          "• Position: " + (data.position || data.role) + "\n" +
          "• Email: " + data.email + "\n" +
          "• Phone: " + (data.phone || "Not provided") + "\n" +
          "• LinkedIn: " + (data.linkedin || "Not provided") + "\n" +
          "• Resume: " + (resumeUrl || "Attached") + "\n\n" +
          "Cover Note:\n" + (data.coverLetter || data.coverNote || "None provided"),
        replyTo: data.email
      });
    } catch (mailErr) {
      console.error("MailApp candidate alert error:", mailErr);
    }

    return response(true, "Application submitted successfully.");

  } catch (error) {
    console.error(error);
    return response(false, "Unable to process request: " + error.toString());
  }
}

// Health-check endpoint
function doGet() {
  return response(true, "ServiceTackle AI Engine API is running.");
}

// JSON response helper
function response(success, message) {
  return ContentService
    .createTextOutput(
      JSON.stringify({
        success: success,
        message: message
      })
    )
    .setMimeType(ContentService.MimeType.JSON);
}
