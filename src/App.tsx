import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
  gender: string;
};

const App = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      example: "",
      exampleRequired: "exampleRequired",
    },
  });
  console.log(errors);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const exampleOutPut = watch("example");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("example", {
          required: "Must",
          minLength: {
            value: 4,
            message: "Min length is 5",
          },
        })}
      />
      <p>{errors.example?.message}</p>
      <p>{exampleOutPut}</p>
      <input
        {...register("exampleRequired", {
          required: "Must",
          maxLength: {
            value: 5,
            message: "Max length is 5",
          },
        })}
      />
      <p>{errors.exampleRequired?.message}</p>
      <input type="submit" />
    </form>
  );
};

export default App;
