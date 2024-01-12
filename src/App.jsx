import { useState, useEffect } from 'react';

function App() {
  // const [isOtpSupported, setIsOtpSupported] = useState(false);
  // const [deviceInfo, setDeviceInfo] = useState("");
  // const [error, setError] = useState("");
  const [otp,setOtp] = useState("")
  const [err,setErr] = useState("")
  const [text,setText] = useState("")
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchOtp() {
     try{
      if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', e => {
          const input = document.querySelector('input[autoComplete="one-time-code"]');
          if (!input) return;
          const ac = new AbortController();
          const form = input.closest('form');
          if (form) {
            form.addEventListener('submit', e => {
              ac.abort();
            });
          }
          navigator.credentials.get({
            otp: { transport:['sms'] },
            signal: ac.signal
          }).then(otp => {
            setText(otp)
            setOtp(otp.code)
            // input.value = otp.code;
            if (form) form.submit();
          }).catch(err => {
            setErr(`${err}`)
            console.log(err);
          });
        });
      }
    }
    catch (err) {
      setErr(`${err}`)
    }
  }

    fetchOtp();

    // return () => {
    //   abortController.abort();
    // };
  }, []);

  return (
    <div className='flex justify-center items-center h-screen bg-slate-400'>
      <div className="otppopup w-[35rem] h-[20rem] bg-white rounded-lg ">
        <div className="head w-[100%] h-[4rem] bg-black rounded-t-lg flex justify-center items-center">

        </div>
        <div className="flex justify-center items-center h-[60%]">
        <form>
  <input autoComplete="one-time-code" value = {otp} />
  <span>err {err}</span>

  <span>text {text}</span>
  <input type="submit"  className='w-full h-10 bg-green-500 text-white font-semibold'/>
</form>
        </div>
       
      </div>
    </div>
  );
}

export default App;
