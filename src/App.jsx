import { useState, useEffect } from 'react';

function App() {
  const [isOtpSupported, setIsOtpSupported] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState("");
  
  const [text,setText] = useState("")

  const [bug,setBug] = useState("")
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchOtp() {
      try {
        setDeviceInfo(`${navigator.userAgentData.platform}`);
        if ("OTPCredential" in window) {
          setIsOtpSupported(true);
          const input = document.getElementById('otpfill');
          
          



          
          setText(`${input}`)
          if (!input) return;

          const otp = await navigator.credentials.get({
            otp: { transport: ["sms"] },
            signal: abortController.signal,
          });
          setText(`${input} otp: ${otp}`)
          
          input.value = otp;
          
        }
      } catch (e) {
        setBug(`${e}`);
      }
    }

    fetchOtp();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className='flex justify-center items-center h-screen bg-slate-400'>
      <div className="otppopup w-[35rem] h-[20rem] bg-white rounded-lg ">
        <div className="head w-[100%] h-[4rem] bg-black rounded-t-lg flex justify-center items-center">
          <span className="text-white font-bold text-[20px]">{isOtpSupported ? "Enter Your mobile otp" : "Enter Your otp"}</span>
        </div>
        <div className="flex justify-center items-center h-[60%]">
          <input 
            className="w-64 h20 border-2 border-indigo-600 rounded-sm px-5 placeholder:font-bold outline-indigo-600" 
            placeholder="Enter your otp here" 
            autoComplete="one-time-code" 
            inputMode="numeric"
            id = "otpfill"
          />
        </div>
        <div className="px-10">
          <button className="w-full h-10 bg-green-500 text-white font-semibold">Submit</button>
          {isOtpSupported && <span>Auto fill available</span>}
          <span>otp {text}</span>
          <span>err {bug}</span>
        </div>
      </div>
    </div>
  );
}

export default App;