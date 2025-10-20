import { } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { reportSchema, ReportForm, severityEnum } from "@/lib/validators";
import { submitReport } from "@/hooks/api-hooks";

function SeveritySelector({
  value,
  onChange,
}: {
  value?: string | null;
  onChange: (v: string) => void;
}) {
  const levels = severityEnum.options;
  return (
    <div className="grid grid-cols-2 sm:flex sm:items-center sm:gap-3">
      {levels.map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => onChange(level)}
          className={`mb-2 sm:mb-0 rounded-lg border-2 px-4 py-2 font-semibold transition ${
            value === level
              ? "border-black bg-black text-white"
              : "border-black bg-white text-black hover:bg-black/5"
          }`}
          aria-pressed={value === level}
        >
          {level}
        </button>
      ))}
    </div>
  );
}

export default function Report() {
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportForm>({
    resolver: zodResolver(reportSchema),
    defaultValues: { what: "", where: "", severity: "Low", when: "" },
  });

  const mutation = useMutation({
    mutationFn: (data: ReportForm) => submitReport(data),
    onSuccess() {
      toast({ title: "Report submitted", description: "Thank you for the report." });
    },
    onError(err) {
      console.error(err);
      toast({ title: "Submission failed", description: "Please try again." });
    },
  });

  return (
    <section className="bg-black text-white py-10 md:py-16">
      <div className="container max-w-2xl">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">REPORT</h2>

        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values), (errs) => console.error(errs))}
          className="bg-white text-black rounded-xl border-2 border-black p-6 md:p-8 space-y-6"
        >
          <div className="space-y-2">
            <label className="flex items-center gap-3 text-lg font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black">1</span>
              What happened?
            </label>
            <Controller
              control={control}
              name="what"
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  className="w-full rounded-lg border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              )}
            />
            {errors.what && <p className="text-sm text-red-600">{errors.what.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3 text-lg font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black">2</span>
              Where did it occur?
            </label>
            <Controller
              control={control}
              name="where"
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Address or landmark"
                  className="w-full rounded-lg border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              )}
            />
            {errors.where && <p className="text-sm text-red-600">{errors.where.message}</p>}
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 text-lg font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black">3</span>
              Severity
            </label>
            <Controller
              control={control}
              name="severity"
              render={({ field }) => (
                <SeveritySelector value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.severity && <p className="text-sm text-red-600">{errors.severity.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3 text-lg font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black">4</span>
              When did it occur?
            </label>
            <Controller
              control={control}
              name="when"
              render={({ field }) => (
                <input
                  {...field}
                  type="datetime-local"
                  className="w-full rounded-lg border-2 border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              )}
            />
            {errors.when && <p className="text-sm text-red-600">{errors.when.message}</p>}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-lg bg-black px-6 py-3 text-white text-lg font-semibold hover:brightness-110 transition disabled:opacity-60"
          >
            {mutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}
