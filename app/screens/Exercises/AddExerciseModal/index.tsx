import { zodResolver } from "@hookform/resolvers/zod";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "@Root/Navigation";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  WarningOutlineIcon,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useDatabase } from "../../../hooks/useDatabase";

// ─── Form ──────────────────────────────────────────────────────────────── ✣ ─

const ExerciseSchema = z.object({
  name: z.string().min(1).max(30),
});

type FormData = z.infer<typeof ExerciseSchema>;

const defaultValues: Readonly<FormData> = {
  name: "",
};

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─

type AddExerciseModalProps = BottomTabScreenProps<
  RootTabParamList,
  "AddExerciseModal"
> & {};

export default function AddExercise({ navigation }: AddExerciseModalProps) {
  const { exerciseRepository } = useDatabase();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ExerciseSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    const result = await exerciseRepository.create(data.name);
    console.log(result);
  };

  return (
    <Box safeAreaTop>
      <Stack p="4" space="4">
        <Heading size="3xl">Add Exercise</Heading>
        <Box
          backgroundColor="gray.700"
          pt="4"
          pb="6"
          px="4"
          rounded="lg"
          shadow="2"
        >
          <FormControl isInvalid={!!errors.name}>
            <FormControl.Label _text={{ bold: true, fontSize: "lg" }}>
              Exercise Name
            </FormControl.Label>

            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  size="2xl"
                  h="12"
                  placeholder="Name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  borderColor="violet.500"
                />
              )}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.name?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <Button
          _text={{ fontSize: "lg", bold: true }}
          backgroundColor="violet.500"
          size="lg"
          onPress={handleSubmit(onSubmit)}
          shadow="2"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
}
