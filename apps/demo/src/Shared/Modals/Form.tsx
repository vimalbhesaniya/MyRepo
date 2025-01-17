"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Textfield,
  usePostMethod,
  usePutMethod,
  CheckboxField,
  SelectField,
  SelectFieldOption,
  RadioField,
  RadioFieldOptions,
} from "@repo/sharedcomponentts";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeForm, FormSchema } from "./type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { randomId } from "@/Utils/RandomId";
import { v4 as uuidv4 } from "uuid";

import {
  UpdateContext,
  ScreenContext,
  DataContext,
  UpdateType,
  ScreenType,
  UserContext,
} from "@/app/layout";

const Form = () => {
  const { isUpdating, setIsUpdating } = useContext<UpdateType>(UpdateContext);
  const { setScreen } = useContext<ScreenType>(ScreenContext);
  const { globalObject, setGlobalObject } = useContext<any>(DataContext);
  const { user, setUser } = useContext<any>(UserContext);
  const [skills, setSkills] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<TypeForm>({
    defaultValues: {
      discription: "",
      skills: [],
      profession: "",
      gender: "Female",
    },
    resolver: zodResolver(FormSchema),
  });

  const uid = randomId();
  const queryClient = useQueryClient();

  const mutationFn = useCallback(
    async (data: any) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}data/${user?.id}`;

      return await usePutMethod(url, {
        ...user,
        ...data,
      });
    },
    [isUpdating, globalObject]
  );
  const { mutate, isPending } = useMutation({
    mutationFn: (data: TypeForm) => mutationFn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getLoginUser"],
      });
      reset();
      setSkills([]);
    },
  });

  const checkBoxValue = ["Javascript", "HTML", "CSS", "React JS", "Next jS"];
  const options: SelectFieldOption[] = [
    { value: "doctor", label: "Doctor" },
    { value: "nurse", label: "Nurse" },
    { value: "pharmacist", label: "Pharmacist" },
    { value: "surgeon", label: "Surgeon" },
    { value: "therapist", label: "Therapist" },
    { value: "softwareEngineer", label: "Software Engineer" },
    { value: "dataScientist", label: "Data Scientist" },
    { value: "webDeveloper", label: "Web Developer" },
    { value: "cybersecurityAnalyst", label: "Cybersecurity Analyst" },
    { value: "uxUiDesigner", label: "UX/UI Designer" },
    { value: "teacher", label: "Teacher" },
    { value: "principal", label: "Principal" },
    { value: "counselor", label: "Counselor" },
    { value: "tutor", label: "Tutor" },
    { value: "professor", label: "Professor" },
  ];

  const RadioOptions: RadioFieldOptions[] = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
    { value: "Other", label: "Other" },
  ];

  return (
    <>
      <Stack
        gap={4}
        width={"30%"}
        borderRadius={2}
        boxShadow={5}
        marginTop={2}
        bgcolor={"whitesmoke"}
        p={4}
      >
        <Stack gap={2} alignItems={"center"}>
          <form
            action=""
            onSubmit={handleSubmit((data) => {
              mutate(data);
            })}
          >
            <Grid2 container columns={2} size={12} spacing={2}>
              <Grid2 size={4}>
                <Textfield
                  control={control}
                  errorMessage={errors.discription}
                  labelText="Discription"
                  type="textarea"
                  name="discription"
                />
              </Grid2>
              <Grid2 size={4}></Grid2>
              <Grid2 size={4}>
                <FormLabel>Skills</FormLabel>
                <Stack direction={"row"}>
                  {checkBoxValue.map((value) => {
                    return (
                      <>
                        <CheckboxField
                          key={uuidv4()}
                          control={control}
                          val={value}
                          checked={watch("skills").includes(value)}
                          id={value}
                          name="skills"
                        />
                      </>
                    );
                  })}
                </Stack>
                <Typography variant="caption" color="red">
                  {errors.skills?.message}
                </Typography>
              </Grid2>

              <Grid2 size={4}>
                <SelectField
                  label="Select a Profession"
                  options={options}
                  control={control}
                  value={watch("profession")}
                  defaultValue={watch("profession")}
                  name="profession"
                  error={Boolean(errors.profession?.message)}
                  helperText={errors.profession?.message}
                />
              </Grid2>
              <Grid2>
                <RadioField
                  name="gender"
                  defaultValue={watch("gender")}
                  control={control}
                  RadioOptions={RadioOptions}
                />
              </Grid2>
              <Grid2 size={12}>
                <Button
                  disabled={isPending}
                  variant="contained"
                  type={"submit"}
                >
                  {isUpdating ? "Update" : "Submit"}
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Stack>
      </Stack>
    </>
  );
};
export default Form;
