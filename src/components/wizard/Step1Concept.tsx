import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/investigatorStore";
import { PulpInput } from "../ui/PulpInput";
import { PulpSelect } from "../ui/PulpSelect";
import { OCCUPATIONS } from "../../domain/occupations";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  player: z.string().optional(),
  occupation: z.string().min(1, "Occupation is required"),
  sex: z.string().optional(),
  residence: z.string().optional(),
  birthplace: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function Step1Concept() {
  const { t } = useTranslation();
  const { data, updateData, setIsValid } = useWizardStore();

  const {
    register,
    watch,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name || "",
      player: data.player || "",
      occupation: data.occupation || "",
      sex: data.sex || "",
      residence: data.residence || "",
      birthplace: data.birthplace || "",
    },
    mode: "onChange",
  });

  const values = watch();
  const valuesString = JSON.stringify(values);

  useEffect(() => {
    setIsValid(isValid);
    if (isValid) {
      updateData(JSON.parse(valuesString));
    }
  }, [isValid, valuesString, setIsValid, updateData]);

  return (
    <div className="space-y-6">
      <h3 className="font-['IM_Fell_English'] text-3xl text-[var(--color-weird-red)] italic border-b-[3px] border-[var(--color-weird-black)] pb-2 font-bold">
        {t("step_concept")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("name")} *
          </label>
          <PulpInput {...register("name")} placeholder={t("placeholder_name")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("player")}
          </label>
          <PulpInput {...register("player")} placeholder={t("placeholder_player")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("occupation")} *
          </label>
          <PulpSelect {...register("occupation")}>
            <option value="">{t("select_occupation")}</option>
            {OCCUPATIONS.map((occ) => (
              <option key={occ.key} value={occ.key}>
                {t(`occ_${occ.key}`)}
              </option>
            ))}
          </PulpSelect>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("sex")}
          </label>
          <PulpInput {...register("sex")} placeholder={t("placeholder_sex")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("residence")}
          </label>
          <PulpInput {...register("residence")} placeholder={t("placeholder_residence")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("birthplace")}
          </label>
          <PulpInput {...register("birthplace")} placeholder={t("placeholder_birthplace")} />
        </div>
      </div>
    </div>
  );
}
