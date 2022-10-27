import jsPDF from "jspdf";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const toggleLoading = () => setLoading((prevLoading) => !prevLoading);

  const handleGeneratePdfs = () => {
    setLoading(true);

    const pdf = new jsPDF();
    const bruh = document.querySelector(".bruh") as HTMLElement;

    let finishIndex = 0;
    for (let i = 0; i < 20; i++) {
      const blob = new Promise((resolve, reject) => {
        pdf.html(bruh, {
          worker: true,
          callback: (doc: any) => {
            doc.setLanguage("pl");
            finishIndex++;
            if (finishIndex === 20) setLoading(false);
            console.log("resolving!", i, finishIndex);
            resolve(
              new Blob([doc.output("blob")], { type: "application/pdf" })
            );
          },
        } as any);
      });
    }
    console.log(bruh, loading, "blobbed");
  };

  return (
    <div className="App">
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <button onClick={handleGeneratePdfs}>
          click here to generate some pdfs or some shit
        </button>
      )}

      <div className="bruh">this is the element we will be pdf-ing</div>

      <div>
        <button onClick={() => setCounter((prevCount) => prevCount + 1)}>
          buitton to counter to test whether main thread is not fucked
        </button>
        <p>{counter}</p>
      </div>
    </div>
  );
}

export default App;
