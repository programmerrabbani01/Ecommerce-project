import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";
import { AiFillHome, AiTwotoneMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaInfo } from "react-icons/fa";

const Contact = () => {
  const title = "Contact - Digitic";
  return (
    <>
      <MetaData title={title} />
      <BreadCum title="Contact" />

      {/* Contact Start */}

      <div className="contact_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116638.91712812592!2d90.31681155260715!3d23.996972034051613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755dafdd8aa72a1%3A0xe3a23793cb030fdb!2sGazipur!5e0!3m2!1sen!2sbd!4v1699674420225!5m2!1sen!2sbd"
                width="600"
                height="450"
                style={{ border: "0", width: "100%" }}
                allowfullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="contact_wrapper2  mt-5 ">
              <div className="row">
                <div className="col-lg-6 mb-5">
                  <h3 className="contact_title mb-4">Contact</h3>
                  <form action="" className="d-flex flex-column gap-15">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name=""
                        className="form-control w-100"
                        id=""
                        cols="30"
                        rows="10"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="button border-0">
                        Send
                      </button>
                    </div>
                  </form>
                </div>

                <div className="col-lg-6">
                  <h3 className="contact_title mb-4">Get In Touch With Us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiFillHome className="fs-5" />
                        <address className="mb-0 getIn_para">
                          33 New Montgomery St. Ste 750 San Francisco, CA, USA
                          94105
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BsFillTelephoneFill className="fs-5" />
                        <a className="getIn_para" href="tel:+91 7-723-4608">
                          (+91)7-723-4608
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiTwotoneMail className="fs-5" />
                        <a
                          className="getIn_para"
                          href="mailto:demo@company.com"
                        >
                          demo@company.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FaInfo className="fs-5" />
                        <p className="mb-0 getIn_para">
                          Monday – Friday 10 AM – 8 PM
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
