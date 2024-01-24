import CustomInput from "../components/CustomInput/CustomInput.jsx";


const ForGotPassword = () => {
  return (
    <>
      <div
        className="py-5"
        style={{ backgroundColor: "#d50101", minHeight: "100vh" }}
      >
        <br />
        <br />
        <br />
        <div className="my-5 w-50 bg-white rounded-3 mx-auto p-4">
          <h4 className="text-center title">Forgot Password</h4>
          <p className="text-center ">Please Enter Your Email For Reset Password.</p>
          <form action="">
            <CustomInput
              type="email"
              id="email"
              label="Email Address"
            />

            <button
              className="border-0 px-3 py-2 w-100 fw-bold text-white"
              style={{ backgroundColor: "#d50101" }}
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForGotPassword;
