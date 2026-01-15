import emailjs from "@emailjs/browser";

interface EmailData {
  toEmail: string;
  toName: string;
  subject: string;
  message: string;
}

/**
 * Call this ONCE in your app (e.g. layout.tsx or App entry)
 */
export const initEmailJS = () => {
  emailjs.init("YOUR_PUBLIC_KEY"); // <-- EmailJS Public Key
};

/**
 * Send email (no attachment, quiz result email)
 */
export const sendEmailWithFile = async ({
  toEmail,
  toName,
  subject,
  message,
}: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    const templateParams = {
      to_email: toEmail,
      to_name: toName,
      subject,
      message,
      from_name: "FCS Food Preparation Course",
    };

    const response = await emailjs.send(
      "Yservice_lt63gzq",   // <-- EmailJS Service ID
      "YOUR_TEMPLATE_ID",  // <-- EmailJS Template ID
      templateParams
    );

    if (response.status === 200) {
      return { success: true, message: "Email sent successfully" };
    }

    return { success: false, message: "Email failed to send" };
  } catch (error) {
    console.error("EmailJS error:", error);
    return {
      success: false,
      message: "Error sending email",
    };
  }
};
