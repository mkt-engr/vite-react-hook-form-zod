import { useForm, SubmitHandler } from "react-hook-form";
import {
  FormControl,
  TextField,
  Container,
  Stack,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

//Zodのスキーマ
const schema = z.object({
  firstName: z.string().min(1, { message: "なんか入れて from Zod" }),
  lastName: z.string().min(4, { message: "4文字以上入力して from Zod" }),
  email: z.string().email({ message: "メールの形式で入れてくれよ from Zod" }),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "数値で入れてちょ",
    })
    .min(20, { message: "20以上でよろ" }),
  // gender: z.string({ invalid_type_error: "なんか入力してーや" }),
  gender: z.enum(["female", "male"], {
    // required_error: "fじえ",
    invalid_type_error: "FemaleかMaleでよろ from Zod",
    // errorMap: (i, c) => {
    //   console.log(i, c);
    //   // return { message: "FemaleかMaleでよろ from Zod ErrorMap" };
    // },
  }),
  hobbies: z
    .enum(["sport", "trip", "reading books"])
    .array()
    .min(2, { message: "趣味は2個以上選んで" }),
});

type IFormInput = z.infer<typeof schema>;
const WithMUI01 = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
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
    //バリデーションを通過した時に実行される
    console.log(data);
  };
  const hobbies = watch("hobbies");
  console.log(hobbies);
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
          <FormControl error={!!errors.gender}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                {...register("gender")}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                {...register("gender")}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                {...register("gender")}
              />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="other"
                {...register("gender")}
              />
            </RadioGroup>
            <FormHelperText>{errors.gender?.message}</FormHelperText>
          </FormControl>
          <FormControl error={!!errors.hobbies}>
            <FormLabel>Hobbies</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox {...register("hobbies")} />}
                label="Sport"
                value="sport"
              />
              <FormControlLabel
                control={<Checkbox {...register("hobbies")} />}
                label="Trip"
                value="trip"
              />
              <FormControlLabel
                control={<Checkbox {...register("hobbies")} />}
                label="Reading Books"
                value="reading books"
              />
            </FormGroup>
            <FormHelperText>{errors.hobbies?.message}</FormHelperText>
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
