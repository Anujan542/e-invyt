import { mailTrapClient, sender } from "../config/mailtrap.config.js";
import {
  CONTACT_MESSAGE_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
  } catch (error) {
    console.error(`Error sending verification email : ${error}`);
    throw new Error(`Error sending verification email : ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "9e6c1310-7078-4e77-ac39-9fefd2f523c2",
      template_variables: {
        name: name,
        company_info_name: "E-Invyt",
      },
    });
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error("Error sending welcome email");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error sending password reset email : ${error}`);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password ",
    });
  } catch (error) {
    console.error(`Error sending password reset success email : ${error}`);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};

export const sendContacts = async (name, email, message) => {
  // const sender = {
  //   email: "no-reply@yourdomain.com", // must be verified in Mailtrap
  //   name: "Einvyt App",
  // };

  const recipient = [{ email: "einvyt@gmail.com", name: "Admin" }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Customer Feedbacks",
      html: CONTACT_MESSAGE_TEMPLATE.replace("{name}", name)
        .replace("{email}", email)
        .replace("{messageHtml}", message),
      category: "Feedbacks",
    });

    console.log("Mail sent successfully:", response);
    return response;
  } catch (error) {
    console.error(
      "Error sending feedback email:",
      error.response?.data || error
    );
    throw new Error("Error sending feedback email");
  }
};


