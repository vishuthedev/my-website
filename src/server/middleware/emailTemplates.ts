
// send email template
import { environmentConfig } from "../../server/config/environmentConfig";
export const createEmailTemplate = (fullName: string, email: string, phoneNumber: string, subject: string, message: string, isUserSubmission: boolean = false) => {
    const websiteLink = `Click Here to : <a href="${environmentConfig.TG_WEBSITE}">Visit our website</a>`;
    if (isUserSubmission) {
        return `<p><strong>Thank you for submitting your details. Our Team will contact you soon...</strong></p>
        <p>${websiteLink}</p>`;
    } else {
        return `<p><strong>New message from ${fullName}</strong></p>
            <p><strong>User Information</strong></p>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phoneNumber}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>`;
    }
};
