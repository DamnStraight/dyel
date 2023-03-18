import { zodResolver } from "@hookform/resolvers/zod";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Controller, useForm } from "react-hook-form";
import { Adapt, Button, Dialog, Input, Sheet, Unspaced, YStack } from "tamagui";
import { z } from "zod";
import FAB from "../../../components/FAB";
import { useDatabase } from "../../../hooks/useDatabase";
import { RootTabParamList } from "../../../navigation";
import { Ionicons } from "@expo/vector-icons";
import { ExerciseModel } from "../../../data/entities/Exercise";
import { useState } from "react";

type CreateExerciseModalProps = {
  onSuccess: (exercise: ExerciseModel) => void;
};

const ExerciseSchema = z.object({
  name: z.string().min(1).max(30),
});

type FormData = z.infer<typeof ExerciseSchema>;

const defaultValues: Readonly<FormData> = {
  name: "",
};

export function CreateExerciseModal({ onSuccess }: CreateExerciseModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  const { exerciseRepository } = useDatabase();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ExerciseSchema),
    defaultValues,
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: FormData) => {
    const result = await exerciseRepository.create(data.name);
    onSuccess(result);
    reset();
    setOpen(false);
  };

  return (
    <Dialog modal onOpenChange={setOpen} open={open}>
      <Dialog.Trigger asChild>
        <FAB color="$indigo700" iconColor="white" />
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet modal>
          <Sheet.Frame padding="$4" space>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay backgroundColor="$zinc900" />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          o={0.5}
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
        />

        <Dialog.Content
          bordered
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          space
        >
          <Dialog.Title>Add Exercise</Dialog.Title>
          <Dialog.Description>Add a new exercise</Dialog.Description>

          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                id="name"
                autoFocus
                size="$5"
                h={50}
                placeholder="Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                theme={error ? "red_Input" : "Input"}
              />
            )}
          />

          <YStack mt="$2" space="$2">
            <Dialog.Close displayWhenAdapted>
              <Button
                theme="green_Button"
                aria-label="Close"
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                Save Exercise
              </Button>
            </Dialog.Close>
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="red_Button" aria-label="Close">
                Nevermind
              </Button>
            </Dialog.Close>
          </YStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                pos="absolute"
                t="$2"
                r="$2"
                size="$10"
                circular
                icon={<Ionicons name="close" size={24} color="black" />}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
