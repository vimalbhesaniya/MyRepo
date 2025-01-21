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
import { TypeForm, FormSchema, EditForm, EditFormSchema } from "./type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { randomId } from "@/Utils/RandomId";
import { v4 as uuidv4 } from "uuid";

import { checkBoxValue, options, RadioOptions } from "./Form";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import { ScreenContext, ScreenType } from "../Context/ScreenContext";

const EditProfileModal = () => {
  const { setScreen } = useContext<ScreenType>(ScreenContext);
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
  } = useForm<EditForm>({
    defaultValues: {
      discription: user.discription,
      skills: user.skills,
      profession: user.profession,
      gender: user.gender,
      username: user.username,
    },
    resolver: zodResolver(EditFormSchema),
  });

  const uid = randomId();
  const queryClient = useQueryClient();

  const mutationFn = async (data: EditForm) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}data/${user?.id}`;
    return await usePutMethod(url, {
      ...user,
      ...data,
      isComplated: true,
    });
  };
  const { mutate, isPending } = useMutation({
    mutationFn: (data: EditForm) => mutationFn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getLoginUser"],
      });
      toast.success("Updated successfully");
      setScreen("");
      reset();
      setSkills([]);
    },
  });

  return (
    <>
      <Stack
        gap={4}
        width={"90%"}
        maxWidth={"600px"}
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
                  errorMessage={errors.username}
                  labelText="Username"
                  name="username"
                />
              </Grid2>
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
                <Stack direction={"row"} flexWrap={"wrap"}>
                  {checkBoxValue.map((value) => {
                    return (
                      <CheckboxField
                        key={uuidv4()}
                        control={control}
                        val={value}
                        checked={watch("skills").includes(value)}
                        id={value}
                        name="skills"
                      />
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
                  Submit
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Stack>
      </Stack>
    </>
  );
};
export default EditProfileModal;
