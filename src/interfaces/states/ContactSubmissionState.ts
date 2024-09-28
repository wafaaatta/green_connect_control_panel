import ApiInterface from "../ApiInterface";
import ContactSubmission from "../ContactSubmission";

interface ContactSubmissionState extends ApiInterface {
    contact_submissions: ContactSubmission[];
}

export default ContactSubmissionState