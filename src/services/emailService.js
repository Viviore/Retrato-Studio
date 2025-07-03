import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_shkcpc6",
  NOTIFICATION_TEMPLATE_ID: "template_ic3vdlk",
  AUTO_REPLY_TEMPLATE_ID: "template_31vsaf6",
  PUBLIC_KEY: "KegjEQw0CduQYxdUE",
  BUSINESS_EMAIL: "retrato.creativeteam@gmail.com"
};

// Email API functions
export const emailAPI = {
  // Send notification email to business using sendForm (sends to configured business email)
  sendNotificationToBusiness: async (formRef) => {
    console.log("Sending notification email to business...");
    return await emailjs.sendForm(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.NOTIFICATION_TEMPLATE_ID,
      formRef,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
  },

  // Send auto-reply to client using send (sends to client's email)
  sendAutoReplyToClient: async (formData) => {
    console.log("Sending auto-reply to client...");
    return await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        appointment: formData.appointment,
        service: formData.service,
        message: formData.message,
        to_email: formData.email, // Client's email for auto-reply
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );
  },

  // Send both emails (main function) - Fixed routing
  sendBookingEmails: async (formData, formRef) => {
    try {
      // Send notification to business (you) using sendForm
      const notificationResult = await emailAPI.sendNotificationToBusiness(formRef);
      
      // Send auto-reply to client (them) using send
      const autoReplyResult = await emailAPI.sendAutoReplyToClient(formData);

      console.log("SUCCESS! Notification sent to business, auto-reply sent to client");
      return { 
        success: true, 
        notificationResult,
        autoReplyResult
      };
    } catch (error) {
      console.error("Email sending failed:", error);
      throw error;
    }
  },

  // Send only notification email (for testing or specific use cases)
  sendNotificationOnly: async (formRef) => {
    try {
      const result = await emailAPI.sendNotificationToBusiness(formRef);
      console.log("SUCCESS! Notification email sent");
      return { success: true, result };
    } catch (error) {
      console.error("Notification email failed:", error);
      throw error;
    }
  },

  // Send only auto-reply email (for testing or specific use cases)
  sendAutoReplyOnly: async (formData) => {
    try {
      const result = await emailAPI.sendAutoReplyToClient(formData);
      console.log("SUCCESS! Auto-reply email sent");
      return { success: true, result };
    } catch (error) {
      console.error("Auto-reply email failed:", error);
      throw error;
    }
  },

  // Test function - send only one email to business
  sendSingleEmail: async (formRef) => {
    try {
      console.log("Sending single notification email to business...");
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.NOTIFICATION_TEMPLATE_ID,
        formRef,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      console.log("SUCCESS! Single email sent to business");
      return { success: true, result };
    } catch (error) {
      console.error("Single email failed:", error);
      throw error;
    }
  }
};

// Export configuration for external use
export { EMAILJS_CONFIG }; 