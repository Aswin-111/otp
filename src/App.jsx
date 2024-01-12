import { useState, useEffect } from 'react';

function App() {
  const [isOTPSupported, setIsOTPSupported] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setDeviceInfo(`${navigator.userAgentData.platform}`);
    } catch (e) {
      setError(`${e}`);
    }

    const abortController = new AbortController();

    if ("OTPCredential" in window) {
      setIsOTPSupported(true);

      // Since we're in a React component, the DOM is already loaded
      const input = document.querySelector('input[autocomplete="one-time-code"]');
      if (!input) return;

      navigator.credentials.get({
        otp: { transport: ["sms"] },
        signal: abortController.signal,
      })
      .then(otp => {
        input.value = otp.code;
        // Optionally submit the form or trigger a change event
      })
      .catch(err => {
        console.error(err);
      });
    }

    // Cleanup function to abort the request if the component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className='flex justify-center items-center h-screen bg-slate-400'>
      <div className="otppopup w-[35rem] h-[20rem] bg-white rounded-lg ">
        {/* ... rest of the component */}
        {isOTPSupported && <span>Auto fill available</span>}
        {error && <span>{error}</span>}
      </div>
    </div>
  );
}

export default App;
