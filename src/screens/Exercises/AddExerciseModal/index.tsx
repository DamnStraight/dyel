import { useDatabase } from "@App/hooks/useDatabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "@App/Navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { SafeAreaView } from "react-native";
import { Button, H1, H2, Input, Label, Stack } from "tamagui";

// ─── Form ──────────────────────────────────────────────────────────────── ✣ ─

const ExerciseSchema = z.object({
  name: z.string().min(1).max(30),
});

type FormData = z.infer<typeof ExerciseSchema>;

const defaultValues: Readonly<FormData> = {
  name: "",
};

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
// prettier-ignore
type AddExerciseModalProps = BottomTabScreenProps<RootTabParamList, "AddExerciseModal"> & {};

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
    await exerciseRepository.create(data.name);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack m={15} space="$4">
        <H1 color="$zinc50">Add Exercise</H1>
        <Stack
          backgroundColor="$zinc100"
          p={15}
          borderRadius={15}
        >
          <H2 color="$zinc800">Exercise name:</H2>
            {/* <Label htmlFor="name">
              Exercise Name
            </Label> */}
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="name"
                  autoFocus
                  size="$5"
                  h={50}
                  placeholder="Name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  borderColor="red"
                />
              )}
            />
        </Stack>
        <Button
          backgroundColor="violet"
          size="$5"
          onPress={handleSubmit(onSubmit)}
        >
          Add
        </Button>
      </Stack>
    </SafeAreaView>
  );
}
