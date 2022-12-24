import { useForm, SubmitHandler } from "react-hook-form";
import {
  FormControl,
  TextField,
  Container,
  Stack,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

//Zodのスキーマ
const schema = z.object({
  firstName: z.string().min(1, { message: "なんか入れて from Zod" }),
  lastName: z.string().min(4, { message: "4文字以上入力して from Zod" }),
  email: z.string().email({ message: "メールの形式で入れてくれよ" }),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "数値で入れてちょ",
    })
    .min(20, { message: "20以上でよろ" }),
});

type IFormInput = z.infer<typeof schema>;
const WithMUI01 = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "デフォの値",
      lastName: "",
      email: "",
    },
    resolver: zodResolver(schema),
    // mode: "onBlur",//バリデーションをいつ行うか。modeを指定しない場合はonSubmit
    // reValidateMode: "onBlur",//handleSubmit関数が実行された後再バリデーションをするタイミング。デフォはonChange
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
            <TextField
              variant="standard"
              label="FirstName"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              {...register("firstName")}
            />
          </FormControl>
          <FormControl variant="standard">
            <TextField
              variant="standard"
              label="LastName"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register("lastName")}
            />
          </FormControl>
          <FormControl variant="standard">
            <TextField
              variant="standard"
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
              type="email"
            />
          </FormControl>
          <FormControl>
            <TextField
              id="demo-simple-select"
              label="Age"
              defaultValue=""
              error={!!errors.age}
              helperText={errors.age?.message}
              {...register("age")}
              select
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
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
