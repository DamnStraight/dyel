import { FC } from "react";
import { Button, Dialog, XStack, YStack } from "tamagui";

type ConfirmationDialogProps = {
  onConfirm: (...args: any) => void;
  onCancel: (...args: any) => void;
  title: string;
  description?: string;
  isOpen: boolean;
  okText?: string;
  cancelText?: string;
};

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  onConfirm,
  onCancel,
  title,
  description = "",
  isOpen,
  okText = "OK",
  cancelText = "Nevermind",
}) => {
  return (
    <Dialog modal open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          zIndex={1}
          onPress={onCancel}
          bg="black"
          key="overlay"
          animation="quick"
          o={0.8}
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
        />
        <Dialog.Content
          zIndex={2}
          borderRadius={20}
          elevate
          w="90%"
          justifyContent="center"
          alignItems="center"
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
          <YStack space="$3">
            <Dialog.Title textAlign="center">{title}</Dialog.Title>
            {description && (
              <Dialog.Description pb={10} textAlign="center">
                {description}
              </Dialog.Description>
            )}
            <XStack space="$2" w="100%">
              <Button flex={0.5} onPress={onCancel} theme="red_Button">
                {cancelText}
              </Button>
              <Button
                theme="green_Button"
                flex={0.5}
                onPress={() => {
                  onConfirm();
                }}
              >
                {okText}
              </Button>
            </XStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
