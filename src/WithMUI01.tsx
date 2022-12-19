import Select from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input, InputLabel, FormControl, TextField } from "@mui/material";

type IFormInput = {
  firstName: string;
  lastName: string;
  iceCreamType: { label: string; value: string };
};

const WithMUI01 = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      iceCreamType: {},
    },
  });
  console.log({ errors });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>フォーム</h1>
    </form>
  );
};

export default WithMUI01;
