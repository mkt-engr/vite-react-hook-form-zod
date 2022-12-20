import Select from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Input,
  InputLabel,
  FormControl,
  TextField,
  Box,
  Container,
  Stack,
  Button,
} from "@mui/material";

type IFormInput = {
  firstName: string;
  lastName: string;
};

const WithMUI01 = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  console.log({ errors });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Form</h1>
        <Stack spacing={3}>
          <FormControl variant="standard">
            <InputLabel htmlFor="firstName">FirstName</InputLabel>
            <Input
              id="firstName"
              {...register("firstName", {
                required: "Must First Name",
                minLength: {
                  value: 4,
                  message: "First Name Min length is 4",
                },
              })}
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="lastName">LastName</InputLabel>
            <Input
              id="lastName"
              {...register("lastName", {
                required: "Must Last Name",
                minLength: {
                  value: 4,
                  message: "Last Name Min length is 4",
                },
              })}
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </FormControl>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default WithMUI01;
