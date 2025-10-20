import { useState } from "react";

export default function Report() {
  const [severity, setSeverity] = useState<
    "Low" | "Moderate" | "High" | "Critical" | null
  >(null);

  return (
    <section className="bg-black text-white py-10 md:py-16">
      <div className="container max-w-2xl">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
          REPORT
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const data = new FormData(form);
            console.log(Object.fromEntries(data.entries()));
            alert("Report submitted");
          }}
          className="bg-white text-black rounded-xl border-2 border-black p-6 md:p-8 space-y-6"
        >
          <div className="space-y-2">
            <label className="flex items-center gap-3 text-lg font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black">
                1
              </span>
              What happened?
            </label>
            <textarea
              name="what"
              required
              rows={3}
              className="w-full rounded-lg border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3 text-lg font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black">
                2
              </span>
              Where did it occur?
            </label>
            <input
              name="where"
              placeholder="Address or landmark"
              required
              className="w-full rounded-lg border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 text-lg font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black">
                3
              </span>
              Severity
            </label>
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:gap-3">
              {["Low", "Moderate", "High", "Critical"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSeverity(level as any)}
                  className={`mb-2 sm:mb-0 rounded-lg border-2 px-4 py-2 font-semibold transition ${
                    severity === level
                      ? "border-black bg-black text-white"
                      : "border-black bg-white text-black hover:bg-black/5"
                  }`}
                  aria-pressed={severity === level}
                >
                  {level}
                </button>
              ))}
            </div>
            <input type="hidden" name="severity" value={severity ?? ""} />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3 text-lg font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black">
                4
              </span>
              When did it occur?
            </label>
            <input
              name="when"
              type="datetime-local"
              required
              className="w-full rounded-lg border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black px-6 py-3 text-white text-lg font-semibold hover:brightness-110 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
